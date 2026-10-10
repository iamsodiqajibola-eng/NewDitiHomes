import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiLock,
  FiMail,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Environment from "../components/Environment";
import EveningVideo from "../assets/evening-city.mp4";
import { supabase } from "../lib/supabase";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
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
        "Account created. Check your email for a confirmation link before logging in.",
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
                Join DitiHomes
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[#071A3D]">
                Create an account
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                Save your favourite properties and manage your enquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-[#071A3D]"
                >
                  Full Name
                </label>

                <div className="relative mt-2">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (8+ characters)"
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

              {successMessage && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{successMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#123D78] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating account..." : "Create Account"}
                {!isLoading && <FiArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#071A3D] hover:text-[#D4AF37]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Environment>
    </>
  );
}

export default Signup;
