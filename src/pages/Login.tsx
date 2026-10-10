import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail, FiAlertCircle } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Environment from "../components/Environment";
import EveningVideo from "../assets/evening-city.mp4";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      if (!data.session || !data.user) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      navigate("/admin", { replace: true });
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
    <>
      <Navbar />

      <Environment
        video={EveningVideo}
        overlay="bg-[#041126]/70"
        className="min-h-screen pt-28"
      >
        <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-5 py-12">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Welcome back
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[#071A3D]">
                Login to DitiHomes
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                Sign in to access your authorized account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#071A3D]"
                >
                  Email Address
                </label>

                <div className="relative mt-2">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#071A3D]"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#123D78] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Login"}
                {!isLoading && <FiArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#071A3D] hover:text-[#D4AF37]"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </Environment>
    </>
  );
}

export default Login;
