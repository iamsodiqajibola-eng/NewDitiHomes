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

import AgentWelcome from "./agent/AgentWelcome";
import AgentLogin from "./agent/AgentLogin";
import AgentSignup from "./agent/AgentSignup";
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
  requireAgent?: boolean;
  redirectTo?: string;
};

/* Protect pages that require authentication and the correct account role */
function AccessRoute({
  children,
  requireAdmin = false,
  requireAgent = false,
  redirectTo = "/login",
}: AccessRouteProps) {
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("checking");

  useEffect(() => {
    let isMounted = true;

    async function verifyAccess(userId: string) {
      if (!requireAdmin && !requireAgent) {
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
          console.error("Unable to verify account role:", error);

          if (isMounted) {
            setAccessStatus("forbidden");
          }

          return;
        }

        if (requireAdmin) {
          if (isMounted) {
            setAccessStatus(data?.role === "admin" ? "admin" : "forbidden");
          }

          return;
        }

        if (requireAgent) {
          if (isMounted) {
            setAccessStatus(
              data?.role === "agent" ? "authenticated" : "forbidden",
            );
          }

          return;
        }
      } catch (error) {
        console.error("Account role verification failed:", error);

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
  }, [requireAdmin, requireAgent]);

  if (accessStatus === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111315]">
        <p className="text-sm font-medium text-[#D6AD55]">
          {requireAdmin
            ? "Verifying administrator access..."
            : requireAgent
              ? "Verifying agent access..."
              : "Checking your account..."}
        </p>
      </div>
    );
  }

  if (accessStatus === "unauthenticated") {
    return <Navigate to={redirectTo} replace />;
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

          {/* Signed-in customer pages */}
          <Route
            path="/profile"
            element={
              <AccessRoute>
                <Profile />
              </AccessRoute>
            }
          />

          {/* Public Agent Portal */}
          <Route path="/agent" element={<AgentWelcome />} />
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/signup" element={<AgentSignup />} />

          {/* Protected Agent Dashboard */}
          <Route
            path="/agent/dashboard"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentDashboard />
              </AccessRoute>
            }
          />

          {/* Agent Properties */}
          <Route
            path="/agent/properties"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentProperties />
              </AccessRoute>
            }
          />

          <Route
            path="/agent/properties/add"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentAddProperty />
              </AccessRoute>
            }
          />

          {/* Agent Inspections */}
          <Route
            path="/agent/inspections"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentInspections />
              </AccessRoute>
            }
          />

          {/* Agent Enquiries */}
          <Route
            path="/agent/enquiries"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentEnquiries />
              </AccessRoute>
            }
          />

          {/* Agent Customers */}
          <Route
            path="/agent/customers"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentCustomers />
              </AccessRoute>
            }
          />

          {/* Agent Settings */}
          <Route
            path="/agent/settings"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentSettings />
              </AccessRoute>
            }
          />

          {/* Agent Support */}
          <Route
            path="/agent/support"
            element={
              <AccessRoute requireAgent redirectTo="/agent/login">
                <AgentSupport />
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
            path="/admin/agents"
            element={
              <AccessRoute requireAdmin>
                <AdminAgents />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/properties"
            element={
              <AccessRoute requireAdmin>
                <AdminProperties />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/inspections"
            element={
              <AccessRoute requireAdmin>
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
              <AccessRoute requireAdmin>
                <AdminUsers />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/enquiries"
            element={
              <AccessRoute requireAdmin>
                <AdminEnquiries />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/support"
            element={
              <AccessRoute requireAdmin>
                <AdminSupport />
              </AccessRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AccessRoute requireAdmin>
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
