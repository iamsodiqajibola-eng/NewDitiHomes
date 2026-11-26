import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiHome,
  FiShield,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AgentWelcome() {
  return (
    <div className="flex min-h-screen flex-col bg-(--dh-bg)">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-12">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-7 shadow-xl sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--dh-gold)/15 text-(--dh-gold)">
              <FiBriefcase size={28} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-(--dh-gold)">
              DitiHomes Agent Portal
            </p>

            <h1 className="text-3xl font-bold text-(--dh-white) sm:text-4xl">
              Grow your real estate business with us.
            </h1>

            <p className="mt-4 leading-7 text-(--dh-muted)">
              Join DitiHomes and connect with people looking for properties.
              Manage your listings, enquiries and customers from one place.
            </p>

            <div className="my-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-(--dh-white)">
                <FiCheckCircle className="shrink-0 text-(--dh-gold)" />
                List and manage your properties
              </div>

              <div className="flex items-center gap-3 text-sm text-(--dh-white)">
                <FiCheckCircle className="shrink-0 text-(--dh-gold)" />
                Receive property enquiries
              </div>

              <div className="flex items-center gap-3 text-sm text-(--dh-white)">
                <FiCheckCircle className="shrink-0 text-(--dh-gold)" />
                Manage customers and inspections
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/agent/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-6 py-4 font-bold text-black transition hover:opacity-90"
              >
                Create Agent Account
                <FiArrowRight />
              </Link>

              <Link
                to="/agent/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-6 py-4 font-semibold text-(--dh-white) transition hover:bg-(--dh-bg)"
              >
                <FiShield />
                Log In to Your Account
              </Link>
            </div>

            <div className="mt-8 border-t border-(--dh-border) pt-6 text-center">
              <p className="text-sm text-(--dh-muted)">
                Looking for a property instead?
              </p>

              <Link
                to="/properties"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-(--dh-gold)"
              >
                Explore Properties
                <FiHome />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AgentWelcome;
