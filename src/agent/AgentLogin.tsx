import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiLock,
  FiMail,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AgentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.session || !data.user) {
        setErrorMessage("Login could not be completed. Please try again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        await supabase.auth.signOut();

        setErrorMessage("Unable to verify your account. Please try again.");
        return;
      }

      if (!profile) {
        await supabase.auth.signOut();

        setErrorMessage(
          "Your account profile could not be found. Please contact DitiHomes support.",
        );
        return;
      }

      if (profile.role === "user") {
        const { data: application, error: applicationError } = await supabase
          .from("agent_applications")
          .select("status")
          .eq("user_id", data.user.id)
          .maybeSingle();

        await supabase.auth.signOut();

        if (applicationError) {
          setErrorMessage(
            "We couldn't check your agent application. Please contact DitiHomes support.",
          );
          return;
        }

        if (application?.status === "pending") {
          setErrorMessage(
            "Your agent application is awaiting approval from DitiHomes. We'll notify you once your application has been reviewed.",
          );
          return;
        }

        if (application?.status === "rejected") {
          setErrorMessage(
            "Your agent application was not approved. Please contact DitiHomes for further information.",
          );
          return;
        }

        setErrorMessage(
          "This account is registered as a customer, not an approved agent. Please use the customer login or submit an agent application.",
        );
        return;
      }

      if (profile.role !== "agent") {
        await supabase.auth.signOut();

        setErrorMessage(
          "This account does not have permission to access the agent portal.",
        );
        return;
      }

      navigate("/agent/dashboard", { replace: true });
    } catch (error) {
      console.error("Agent login error:", error);

      setErrorMessage(
        "Something went wrong while logging in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-(--dh-bg) transition-colors duration-300">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-5 pt-32 pb-12">
        <div className="relative w-full max-w-lg">
          <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-6 shadow-2xl sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-(--dh-gold)/20 bg-(--dh-gold)/10">
                <FiLock size={27} className="text-(--dh-gold)" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
                Agent Portal
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-(--dh-white)">
                Welcome Back
              </h1>

              <p className="mt-3 text-sm leading-6 text-(--dh-muted)">
                Log in to manage your properties, customers and enquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="agent-email"
                  className="text-sm font-semibold text-(--dh-white)"
                >
                  Email Address
                </label>

                <div className="relative mt-2">
                  <FiMail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                  />

                  <input
                    id="agent-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="dh-input dh-input-with-icon"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="agent-password"
                  className="text-sm font-semibold text-(--dh-white)"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <FiLock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                  />

                  <input
                    id="agent-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="dh-input dh-input-with-icon"
                    style={{ paddingRight: "3rem" }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-(--dh-muted) transition hover:text-(--dh-gold)"
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500"
                >
                  <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="dh-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Login to Agent Dashboard"}
                {!isLoading && <FiArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-(--dh-muted)">
              Don't have an agent account?{" "}
              <Link
                to="/agent/signup"
                className="font-semibold text-(--dh-gold) transition hover:opacity-75"
              >
                Sign up
              </Link>
            </p>

            <p className="mt-5 text-center text-sm">
              <Link
                to="/agent"
                className="font-medium text-(--dh-muted) transition hover:text-(--dh-gold)"
              >
                Back to Agent Portal
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AgentLogin;
