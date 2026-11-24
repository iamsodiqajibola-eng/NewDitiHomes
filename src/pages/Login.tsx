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

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

function Login() {
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
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.session) {
        setErrorMessage("Login could not be completed. Please try again.");
        return;
      }

      // Every successfully authenticated user returns to the homepage.
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "Something went wrong while logging in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="dh-page">
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111315] px-5 pb-16 pt-32">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#D6AD55]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D6AD55]/5 blur-[120px]" />

        <div className="relative w-full max-w-lg">
          <div className="rounded-3xl border border-[#303238] bg-[#1B1D20] p-6 shadow-2xl shadow-black/30 sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D6AD55]/20 bg-[#D6AD55]/10">
                <FiLock size={27} className="text-[#D6AD55]" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AD55]">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F5F3]">
                Login to DitiHomes
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#A6A8AD]">
                Sign in to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#F5F5F3]"
                >
                  Email Address
                </label>

                <div className="relative mt-2">
                  <FiMail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A6A8AD]"
                  />

                  <input
                    id="email"
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
                  htmlFor="password"
                  className="text-sm font-semibold text-[#F5F5F3]"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <FiLock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A6A8AD]"
                  />

                  <input
                    id="password"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A6A8AD] transition hover:text-[#D6AD55] focus:outline-none focus-visible:text-[#D6AD55]"
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
                  className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
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
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && <FiArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#A6A8AD]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#D6AD55] transition hover:text-[#E5C477]"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
