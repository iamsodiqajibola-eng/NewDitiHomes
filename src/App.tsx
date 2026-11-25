import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { supabase } from "./lib/supabase";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AgentDashboard from "./agent/AgentDashboard";
import AgentProperties from "./agent/AgentProperties";
import AgentAddProperty from "./agent/AgentAddProperty";
import AgentInspections from "./agent/AgentInspections";
import AgentEnquiries from "./agent/AgentEnquiries";
import AgentCustomers from "./agent/AgentCustomers";
import AgentSettings from "./agent/AgentSettings";
import AgentSupport from "./agent/AgentSupport";

import AdminDashboard from "./admin/AdminDashboard";
import AdminAgents from "./admin/AdminAgents";
import AdminProperties from "./admin/AdminProperties";
import AddProperty from "./admin/AddPropert";
import EditProperty from "./admin/EditProperty";
import AdminInspections from "./admin/AdminInspections";
import AdminUsers from "./admin/AdminUsers";
import AdminEnquiries from "./admin/AdminEnquiries";
import AdminSupport from "./admin/AdminSupport";
import AdminSettings from "./admin/AdminSettings";

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
    <ThemeProvider>
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

          {/* Agent Dashboard */}
          <Route
            path="/agent"
            element={
              <AccessRoute>
                <AgentDashboard />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/properties"
            element={
              <AccessRoute>
                <AgentProperties />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/properties/add"
            element={
              <AccessRoute>
                <AgentAddProperty />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/inspections"
            element={
              <AccessRoute>
                <AgentInspections />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/enquiries"
            element={
              <AccessRoute>
                <AgentEnquiries />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/customers"
            element={
              <AccessRoute>
                <AgentCustomers />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/settings"
            element={
              <AccessRoute>
                <AgentSettings />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/support"
            element={
              <AccessRoute>
                <AgentSupport />
              </AccessRoute>
            }
          />

          {/* Administrator-only pages */}
          <Route
            path="/admin"
            element={
              <AccessRoute>
                <AdminDashboard />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/agents"
            element={
              <AccessRoute>
                <AdminAgents />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/properties"
            element={
              <AccessRoute>
                <AdminProperties />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/inspections"
            element={
              <AccessRoute>
                <AdminInspections />
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

          <Route
            path="/admin/users"
            element={
              <AccessRoute>
                <AdminUsers />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/enquiries"
            element={
              <AccessRoute>
                <AdminEnquiries />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/support"
            element={
              <AccessRoute>
                <AdminSupport />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AccessRoute>
                <AdminSettings />
              </AccessRoute>
            }
          />

          {/* Unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
