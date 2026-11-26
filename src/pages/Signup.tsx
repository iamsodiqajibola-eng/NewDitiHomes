import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiLock,
  FiMail,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            full_name: fullName.trim(),
            account_type: "customer",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        setSuccessMessage("Your account has been created successfully.");

        navigate("/login", { replace: true });
        return;
      }

      setSuccessMessage(
        "Your account has been created! We've sent a verification email to your inbox. Please verify your email address before logging in.",
      );
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="dh-page flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-(--dh-bg) px-5 pb-16 pt-32 transition-colors duration-300">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-(--dh-gold)/10 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-(--dh-gold)/5 blur-[120px]" />

        <div className="relative w-full max-w-md">
          <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-6 shadow-2xl shadow-black/10 transition-colors duration-300 sm:p-9">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-(--dh-gold)/20 bg-(--dh-gold)/10">
                <FiUser size={27} className="text-(--dh-gold)" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
                Join DitiHomes
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-(--dh-white)">
                Create an account
              </h1>

              <p className="mt-3 text-sm leading-6 text-(--dh-muted)">
                Save your favourite properties and manage your enquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-(--dh-white)"
                >
                  Full Name
                </label>

                <div className="relative mt-2">
                  <FiUser
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="dh-input dh-input-with-icon"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
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
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (8+ characters)"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-(--dh-muted) transition hover:text-(--dh-gold) focus:outline-none focus-visible:text-(--dh-gold)"
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-(--dh-muted)">
                  Use at least 8 characters.
                </p>
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

              {successMessage && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{successMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="dh-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating account..." : "Create Account"}

                {!isLoading && <FiArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-(--dh-muted)">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-(--dh-gold) transition hover:opacity-75"
              >
                Login
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-(--dh-muted)">
            DitiHomes · Your property journey starts here.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
