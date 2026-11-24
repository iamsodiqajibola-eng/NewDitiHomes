import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { supabase } from "./lib/supabase";

import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import AdminDashboard from "./admin/AdminDashboard";
import AddProperty from "./admin/AddPropert";
import EditProperty from "./admin/EditProperty";

/* Scroll to the top whenever navigation occurs */
function ScrollToTop() {
  const { pathname, search, key } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, search, key]);

  return null;
}

type AccessStatus =
  | "checking"
  | "authenticated"
  | "admin"
  | "unauthenticated"
  | "forbidden";

type AccessRouteProps = {
  children: ReactNode;
  requireAdmin?: boolean;
};

/* Protect pages that require a signed-in user or administrator */
function AccessRoute({ children, requireAdmin = false }: AccessRouteProps) {
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("checking");

  useEffect(() => {
    let isMounted = true;

    async function verifyAccess(userId: string) {
      if (!requireAdmin) {
        if (isMounted) {
          setAccessStatus("authenticated");
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("Unable to verify administrator role:", error);

          if (isMounted) {
            setAccessStatus("forbidden");
          }

          return;
        }

        if (isMounted) {
          setAccessStatus(data?.role === "admin" ? "admin" : "forbidden");
        }
      } catch (error) {
        console.error("Administrator verification failed:", error);

        if (isMounted) {
          setAccessStatus("forbidden");
        }
      }
    }

    async function checkSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          console.error("Unable to verify authentication:", error);
          setAccessStatus("unauthenticated");
          return;
        }

        if (!session) {
          setAccessStatus("unauthenticated");
          return;
        }

        await verifyAccess(session.user.id);
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (isMounted) {
          setAccessStatus("unauthenticated");
        }
      }
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      if (!session) {
        setAccessStatus("unauthenticated");
        return;
      }

      setAccessStatus("checking");

      // Verify access after the authentication callback completes.
      void Promise.resolve().then(() => {
        if (isMounted) {
          return verifyAccess(session.user.id);
        }
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [requireAdmin]);

  if (accessStatus === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111315]">
        <p className="text-sm font-medium text-[#D6AD55]">
          {requireAdmin
            ? "Verifying administrator access..."
            : "Checking your account..."}
        </p>
      </div>
    );
  }

  if (accessStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (accessStatus === "forbidden") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Signed-in user pages */}
        <Route
          path="/profile"
          element={
            <AccessRoute>
              <Profile />
            </AccessRoute>
          }
        />

        {/* Administrator-only pages */}
        <Route
          path="/admin"
          element={
            <AccessRoute requireAdmin>
              <AdminDashboard />
            </AccessRoute>
          }
        />

        <Route
          path="/admin/add-property"
          element={
            <AccessRoute requireAdmin>
              <AddProperty />
            </AccessRoute>
          }
        />

        <Route
          path="/admin/edit-property/:id"
          element={
            <AccessRoute requireAdmin>
              <EditProperty />
            </AccessRoute>
          }
        />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
