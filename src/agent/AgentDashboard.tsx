import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FiGrid,
  FiHome,
  FiClipboard,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiBell,
  FiSearch,
  FiPlus,
  FiArrowUpRight,
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiMenu,
  FiX,
  FiTrendingUp,
  FiEye,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";

const stats = [
  {
    label: "Total Properties",
    value: "24",
    change: "+12%",
    icon: FiHome,
    description: "Compared to last month",
  },
  {
    label: "Active Listings",
    value: "18",
    change: "+8%",
    icon: FiCheckCircle,
    description: "Currently published",
  },
  {
    label: "Pending Approval",
    value: "4",
    change: "Needs attention",
    icon: FiClock,
    description: "Awaiting admin review",
  },
  {
    label: "Total Enquiries",
    value: "36",
    change: "+18%",
    icon: FiMessageSquare,
    description: "Customer enquiries",
  },
];

const properties = [
  {
    id: 1,
    name: "Luxury 4 Bedroom Detached Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦250,000,000",
    type: "For Sale",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85",
  },
  {
    id: 2,
    name: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    price: "₦8,500,000 / year",
    type: "For Rent",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=85",
  },
  {
    id: 3,
    name: "Contemporary 5 Bedroom Mansion",
    location: "Banana Island, Lagos",
    price: "₦450,000,000",
    type: "For Sale",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=85",
  },
];

const inspections = [
  {
    id: 1,
    customer: "Adebayo Johnson",
    property: "4 Bedroom Detached Duplex",
    location: "Lekki Phase 1",
    date: "Today",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sarah Williams",
    property: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA",
    date: "Tomorrow",
    time: "12:00 PM",
    status: "Awaiting confirmation",
  },
  {
    id: 3,
    customer: "Daniel Okafor",
    property: "5 Bedroom Mansion",
    location: "Banana Island",
    date: "28 Nov 2026",
    time: "02:00 PM",
    status: "Confirmed",
  },
];

const navigation = [
  { label: "Overview", icon: FiGrid, path: "/agent" },
  { label: "My Properties", icon: FiHome, path: "/agent/properties" },
  { label: "Inspections", icon: FiCalendar, path: "/agent/inspections" },
  { label: "Enquiries", icon: FiMessageSquare, path: "/agent/enquiries" },
  { label: "Customers", icon: FiUsers, path: "/agent/customers" },
];

const secondaryNavigation = [
  { label: "Settings", icon: FiSettings, path: "/agent/settings" },
  { label: "Help & Support", icon: FiHelpCircle, path: "/agent/support" },
];

const AgentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white) transition-colors duration-300">
      {/* Main Website Navbar */}
      <Navbar />

      {/* Agent Dashboard Layout */}
      <div className="flex min-h-screen pt-20">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeSidebar}
            className="fixed inset-0 top-20 z-40 bg-black/60 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-20 z-50 flex w-72 flex-col border-r border-(--dh-border) bg-(--dh-bg-secondary) transition-transform duration-300 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex h-20 items-center justify-between border-b border-(--dh-border) px-7">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="text-blue-500">Diti</span>
              <span className="text-(--dh-gold)">Homes</span>
            </Link>

            <button
              type="button"
              onClick={closeSidebar}
              aria-label="Close sidebar"
              className="rounded-lg p-2 text-(--dh-muted) hover:bg-(--dh-surface-hover) lg:hidden"
            >
              <FiX size={21} />
            </button>
          </div>

          {/* Agent Identity */}
          <div className="mx-5 mt-6 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--dh-gold)/15 font-semibold text-(--dh-gold)">
                AA
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Agent Account</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-(--dh-success)" />
                  <span className="text-xs text-(--dh-muted)">
                    Demo account
                  </span>
                </div>
              </div>

              <FiChevronDown className="text-(--dh-muted)" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto px-5 py-7">
            <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--dh-muted)">
              Workspace
            </p>

            <nav className="space-y-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.label;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      setActiveNav(item.label);
                      closeSidebar();
                    }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-(--dh-gold)/10 text-(--dh-gold)"
                        : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}

                    {item.label === "Inspections" && (
                      <span className="ml-auto rounded-full bg-(--dh-gold)/15 px-2 py-0.5 text-[10px] text-(--dh-gold)">
                        3
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="my-7 border-t border-(--dh-border)" />

            <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--dh-muted)">
              Preferences
            </p>

            <nav className="space-y-1.5">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      setActiveNav(item.label);
                      closeSidebar();
                    }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      activeNav === item.label
                        ? "bg-(--dh-gold)/10 text-(--dh-gold)"
                        : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="border-t border-(--dh-border) p-5">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
            >
              <FiLogOut size={18} />
              Back to Website
            </Link>
          </div>
        </aside>

        {/* Main Dashboard */}
        <div className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-(--dh-border) bg-(--dh-bg-secondary) px-4 sm:px-7 lg:px-9">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
                className="rounded-lg p-2 text-(--dh-white) hover:bg-(--dh-surface-hover) lg:hidden"
              >
                <FiMenu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-semibold sm:text-xl">
                  Agent Dashboard
                </h1>
                <p className="hidden text-xs text-(--dh-muted) sm:block">
                  Manage your properties and business activities.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                aria-label="Search"
                className="hidden rounded-xl border border-(--dh-border) p-3 text-(--dh-muted) transition hover:bg-(--dh-surface-hover) sm:flex"
              >
                <FiSearch size={18} />
              </button>

              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-xl border border-(--dh-border) p-3 text-(--dh-muted) transition hover:bg-(--dh-surface-hover)"
              >
                <FiBell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-(--dh-gold)" />
              </button>

              <div className="hidden h-9 w-px bg-(--dh-border) sm:block" />

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--dh-gold)/15 text-xs font-semibold text-(--dh-gold)">
                  AA
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Agent Account</p>
                  <p className="text-[11px] text-(--dh-muted)">
                    Real Estate Agent
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="mx-auto max-w-[1600px] space-y-8 px-4 py-7 sm:px-7 lg:px-9 lg:py-9">
            {/* Welcome Section */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-sm font-medium text-(--dh-gold)">
                  WELCOME BACK
                </p>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  Good to see you, Agent.
                </h2>
                <p className="mt-2 text-sm text-(--dh-muted)">
                  Here's what's happening with your properties today.
                </p>
              </div>

              <Link
                to="/agent/properties/add"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-(--dh-bg) transition hover:bg-(--dh-gold-light)"
              >
                <FiPlus size={17} />
                Add New Property
              </Link>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                        <Icon size={21} />
                      </div>

                      <span className="text-xs font-medium text-(--dh-success)">
                        {stat.change}
                      </span>
                    </div>

                    <p className="mt-5 text-3xl font-semibold tabular-nums">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-sm font-medium">{stat.label}</p>

                    <p className="mt-2 text-xs text-(--dh-muted)">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </section>

            {/* Performance and Verification */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Property Performance
                    </h3>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Your listing activity this month.
                    </p>
                  </div>

                  <span className="rounded-lg border border-(--dh-border) px-3 py-2 text-xs text-(--dh-muted)">
                    Last 7 days
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-2xl font-semibold">1,284</p>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Property views
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold">36</p>
                    <p className="mt-1 text-xs text-(--dh-muted)">Enquiries</p>
                  </div>

                  <div>
                    <p className="text-2xl font-semibold">12</p>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Inspections
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex h-32 items-end gap-2 sm:gap-4">
                  {[38, 58, 44, 78, 55, 88, 68].map((height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div className="flex h-28 w-full items-end overflow-hidden rounded-t-lg bg-(--dh-bg-secondary)">
                        <div
                          className="w-full rounded-t-lg bg-(--dh-gold)"
                          style={{ height: `${height}%` }}
                        />
                      </div>

                      <span className="text-[10px] text-(--dh-muted)">
                        {
                          ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                            index
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Account Verification
                    </h3>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Your agent account status.
                    </p>
                  </div>

                  <FiAlertCircle className="text-(--dh-gold)" size={21} />
                </div>

                <div className="mt-7 rounded-xl border border-(--dh-gold)/25 bg-(--dh-gold)/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--dh-gold)/15 text-(--dh-gold)">
                      <FiClock size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Demo status</p>
                      <p className="mt-1 text-xs text-(--dh-muted)">
                        Verification workflow not connected yet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    "Personal information",
                    "Identity verification",
                    "Professional credentials",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-(--dh-muted)">{item}</span>
                      <span className="text-xs text-(--dh-gold)">
                        Not submitted
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-4 py-3 text-sm font-medium transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                >
                  Complete Agent Verification
                  <FiArrowRight size={16} />
                </button>
              </div>
            </section>

            {/* Properties */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Recent Properties</h3>
                  <p className="mt-1 text-sm text-(--dh-muted)">
                    A quick look at your submitted listings.
                  </p>
                </div>

                <Link
                  to="/agent/properties"
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--dh-gold) hover:underline"
                >
                  View all
                  <FiArrowUpRight size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="flex flex-col gap-4 rounded-xl border border-(--dh-border) p-3 transition hover:border-(--dh-gold)/50 sm:flex-row sm:items-center"
                  >
                    <img
                      src={property.image}
                      alt={property.name}
                      className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-32"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-(--dh-gold)/10 px-2 py-1 text-[10px] font-semibold text-(--dh-gold)">
                          {property.type}
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                            property.status === "Approved"
                              ? "bg-(--dh-success)/10 text-(--dh-success)"
                              : "bg-(--dh-gold)/10 text-(--dh-gold)"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      <h4 className="truncate text-sm font-semibold">
                        {property.name}
                      </h4>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-(--dh-muted)">
                        <FiMapPin size={13} />
                        {property.location}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-(--dh-gold)">
                        {property.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`View ${property.name}`}
                      className="flex items-center justify-center gap-2 rounded-lg border border-(--dh-border) px-4 py-2.5 text-xs font-medium text-(--dh-muted) transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                    >
                      <FiEye size={15} />
                      View
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Inspections */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    Upcoming Inspections
                  </h3>
                  <p className="mt-1 text-sm text-(--dh-muted)">
                    Your scheduled property visits.
                  </p>
                </div>

                <Link
                  to="/agent/inspections"
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--dh-gold) hover:underline"
                >
                  Manage inspections
                  <FiArrowUpRight size={16} />
                </Link>
              </div>

              <div className="space-y-3">
                {inspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-(--dh-border) p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                        <FiCalendar size={18} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">
                          {inspection.property}
                        </h4>

                        <p className="mt-1 text-xs text-(--dh-muted)">
                          {inspection.customer}
                        </p>

                        <p className="mt-2 flex items-center gap-1 text-xs text-(--dh-muted)">
                          <FiMapPin size={12} />
                          {inspection.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium">{inspection.date}</p>
                        <p className="mt-1 text-xs text-(--dh-muted)">
                          {inspection.time}
                        </p>
                      </div>

                      <span
                        className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                          inspection.status === "Confirmed"
                            ? "bg-(--dh-success)/10 text-(--dh-success)"
                            : "bg-(--dh-gold)/10 text-(--dh-gold)"
                        }`}
                      >
                        {inspection.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Activity */}
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiTrendingUp size={19} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Grow your business</h3>
                    <p className="text-xs text-(--dh-muted)">
                      Make your listings work harder.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-(--dh-muted)">
                  Complete your agent profile and keep your property information
                  accurate to build customer confidence.
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiClipboard size={19} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Agent guidelines</h3>
                    <p className="text-xs text-(--dh-muted)">
                      Maintain trust on DitiHomes.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-(--dh-muted)">
                  Submit genuine properties, provide accurate information and
                  respect customer inspection appointments.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Main Website Footer */}
      <Footer />
    </div>
  );
};

export default AgentDashboard;
