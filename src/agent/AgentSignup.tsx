import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiBriefcase,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AgentSignup = () => {
  const [fullName, setFullName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!fullName.trim() || !agencyName.trim() || !phone.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: "https://new-diti-homes.vercel.app/agent/login",
          data: {
            full_name: fullName.trim(),
            agency_name: agencyName.trim(),
            phone: phone.trim(),
            account_type: "agent",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        setSuccessMessage(
          "Your account has been created. However, email verification is not currently being enforced. Please contact DitiHomes support.",
        );
        return;
      }

      setVerificationSent(true);

      setSuccessMessage(
        `Your registration was successful! We have sent an email verification link to ${email.trim()}. Please open your inbox and verify your email address before logging in.`,
      );

      setFullName("");
      setAgencyName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch {
      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-(--dh-bg)">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 pb-12 pt-32">
        <div className="w-full max-w-lg">
          <Link
            to="/agent"
            className="mb-8 inline-flex items-center gap-2 text-sm text-(--dh-muted) transition hover:text-(--dh-gold)"
          >
            <FiArrowLeft />
            Back to Agent Portal
          </Link>

          <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6 shadow-sm sm:p-8">
            <div className="mb-8 text-center">
              {verificationSent ? (
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiMail size={26} />
                </div>
              ) : null}

              <h1 className="text-2xl font-bold text-(--dh-white)">
                {verificationSent
                  ? "Verify Your Email"
                  : "Create Your Agent Account"}
              </h1>

              <p className="mt-2 text-sm text-(--dh-muted)">
                {verificationSent
                  ? "One more step before you can log in to your DitiHomes agent account."
                  : "Join DitiHomes and start managing your property listings."}
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
              >
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
              >
                {verificationSent && (
                  <FiCheckCircle className="mb-2" size={22} />
                )}
                {successMessage}
              </div>
            )}

            {verificationSent ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-(--dh-border) bg-(--dh-bg) p-4">
                  <p className="text-sm font-semibold text-(--dh-white)">
                    What happens next?
                  </p>

                  <ol className="mt-3 space-y-2 text-sm text-(--dh-muted)">
                    <li>1. Open the email sent by DitiHomes.</li>
                    <li>2. Click the verification link.</li>
                    <li>3. Return to DitiHomes and log in.</li>
                    <li>
                      4. Your agent application can then proceed to admin
                      approval.
                    </li>
                  </ol>
                </div>

                <Link
                  to="/agent/login"
                  className="block w-full rounded-lg bg-(--dh-gold) py-3 text-center font-semibold text-white transition hover:opacity-90"
                >
                  Go to Agent Login
                </Link>

                <p className="text-center text-xs text-(--dh-muted)">
                  Can't find the email? Check your spam or junk folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-(--dh-white)">
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      className="w-full rounded-lg border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-(--dh-white) outline-none focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-(--dh-white)">
                    Agency / Business Name
                  </label>

                  <div className="relative">
                    <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />

                    <input
                      type="text"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      placeholder="Enter your agency or business name"
                      required
                      autoComplete="organization"
                      className="w-full rounded-lg border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-(--dh-white) outline-none focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-(--dh-white)">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      autoComplete="email"
                      className="w-full rounded-lg border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-(--dh-white) outline-none focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-(--dh-white)">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      autoComplete="tel"
                      className="w-full rounded-lg border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-(--dh-white) outline-none focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-(--dh-white)">
                    Password
                  </label>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password (minimum 8 characters)"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-12 text-(--dh-white) outline-none focus:border-(--dh-gold)"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-(--dh-gold) py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Creating Account..." : "Create Agent Account"}
                </button>
              </form>
            )}

            {!verificationSent && (
              <p className="mt-6 text-center text-sm text-(--dh-muted)">
                Already have an account?{" "}
                <Link
                  to="/agent/login"
                  className="font-semibold text-(--dh-gold) hover:underline"
                >
                  Log In
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentSignup;
