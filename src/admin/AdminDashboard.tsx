import {
  FiGrid,
  FiUsers,
  FiHome,
  FiClipboard,
  FiMessageSquare,
  FiLifeBuoy,
  FiSettings,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowRight,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const navigation = [
  { name: "Overview", path: "/admin", icon: FiGrid },
  { name: "Agent Applications", path: "/admin/agents", icon: FiUsers },
  { name: "Properties", path: "/admin/properties", icon: FiHome },
  { name: "Inspections", path: "/admin/inspections", icon: FiClipboard },
  { name: "Users", path: "/admin/users", icon: FiUsers },
  { name: "Enquiries", path: "/admin/enquiries", icon: FiMessageSquare },
  { name: "Support Tickets", path: "/admin/support", icon: FiLifeBuoy },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

const stats = [
  {
    title: "Total Properties",
    value: "1,284",
    change: "+12.8%",
    description: "Compared to last month",
    icon: FiHome,
  },
  {
    title: "Registered Agents",
    value: "246",
    change: "+8.4%",
    description: "Compared to last month",
    icon: FiUsers,
  },
  {
    title: "Pending Approvals",
    value: "18",
    change: "Needs attention",
    description: "Agent and property reviews",
    icon: FiClock,
  },
  {
    title: "Total Customers",
    value: "3,642",
    change: "+15.2%",
    description: "Compared to last month",
    icon: FiTrendingUp,
  },
];

const recentProperties = [
  {
    name: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    agent: "Michael Johnson",
    price: "₦185,000,000",
    status: "Pending Review",
    category: "For Sale",
  },
  {
    name: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    agent: "Sarah Williams",
    price: "₦8,500,000 / year",
    status: "Approved",
    category: "For Rent",
  },
  {
    name: "5 Bedroom Detached House",
    location: "Banana Island, Lagos",
    agent: "David Okafor",
    price: "₦450,000,000",
    status: "Pending Review",
    category: "For Sale",
  },
  {
    name: "Serviced 2 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    agent: "Grace Adeyemi",
    price: "₦250,000 / night",
    status: "Approved",
    category: "Shortlet",
  },
];

const pendingAgents = [
  {
    name: "Emmanuel Adewale",
    email: "emmanuel@example.com",
    date: "Today",
    initials: "EA",
  },
  {
    name: "Blessing Okoro",
    email: "blessing@example.com",
    date: "Yesterday",
    initials: "BO",
  },
  {
    name: "Samuel Ibrahim",
    email: "samuel@example.com",
    date: "2 days ago",
    initials: "SI",
  },
];

const activities = [
  {
    title: "New agent application received",
    detail: "Emmanuel Adewale submitted an application",
    time: "15 minutes ago",
    icon: FiUsers,
  },
  {
    title: "New property submitted",
    detail: "4 Bedroom Duplex in Lekki Phase 1",
    time: "42 minutes ago",
    icon: FiHome,
  },
  {
    title: "Inspection confirmed",
    detail: "Customer inspection scheduled in Ikeja",
    time: "1 hour ago",
    icon: FiCheckCircle,
  },
  {
    title: "New support enquiry",
    detail: "A customer submitted a support request",
    time: "3 hours ago",
    icon: FiMessageSquare,
  },
];

function AdminDashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <div className="flex min-h-screen pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-20 z-40 w-72 border-r border-(--dh-border) bg-(--dh-bg-secondary) transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-5 py-7">
            <div className="mb-8 px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--dh-muted)">
                Administration
              </p>
              <h2 className="mt-2 text-xl font-bold">Control Centre</h2>
            </div>

            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-(--dh-gold) text-black"
                        : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <p className="text-sm font-semibold">Admin Access</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                You are viewing the DitiHomes administration dashboard.
              </p>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-(--dh-success)">
                <span className="h-2 w-2 rounded-full bg-(--dh-success)" />
                Dashboard active
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-20 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:ml-72">
          <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg border border-(--dh-border) p-2 lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Overview
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Dashboard Overview
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Welcome back. Here's what's happening on DitiHomes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative rounded-xl border border-(--dh-border) bg-(--dh-surface) p-3 text-(--dh-white) transition hover:bg-(--dh-surface-hover)"
                >
                  <FiBell size={19} />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-(--dh-gold)" />
                </button>

                <div className="flex items-center gap-3 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--dh-gold) font-bold text-black">
                    A
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold">Administrator</p>
                    <p className="text-xs text-(--dh-muted)">Super Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary cards */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-(--dh-muted)">{stat.title}</p>
                      <div className="rounded-xl bg-(--dh-bg-secondary) p-3 text-(--dh-gold)">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="mt-5 text-3xl font-bold">{stat.value}</h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-(--dh-success)">
                        {stat.change}
                      </span>
                      <span className="text-xs text-(--dh-muted)">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attention section */}
            <div className="mb-8">
              <div className="mb-5">
                <h2 className="text-lg font-bold">Needs your attention</h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  Items waiting for administrative action.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Link
                  to="/admin/agents"
                  className="group rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition hover:border-(--dh-gold)"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-(--dh-bg-secondary) p-3 text-(--dh-gold)">
                      <FiUsers size={21} />
                    </div>
                    <FiArrowUpRight
                      className="text-(--dh-muted) transition group-hover:text-(--dh-gold)"
                      size={20}
                    />
                  </div>
                  <h3 className="mt-5 text-3xl font-bold">12</h3>
                  <p className="mt-1 text-sm font-semibold">
                    Agent Applications
                  </p>
                  <p className="mt-2 text-xs text-(--dh-muted)">
                    Awaiting verification and approval
                  </p>
                </Link>

                <Link
                  to="/admin/properties"
                  className="group rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition hover:border-(--dh-gold)"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-(--dh-bg-secondary) p-3 text-(--dh-gold)">
                      <FiHome size={21} />
                    </div>
                    <FiArrowUpRight
                      className="text-(--dh-muted) transition group-hover:text-(--dh-gold)"
                      size={20}
                    />
                  </div>
                  <h3 className="mt-5 text-3xl font-bold">6</h3>
                  <p className="mt-1 text-sm font-semibold">Property Reviews</p>
                  <p className="mt-2 text-xs text-(--dh-muted)">
                    Listings waiting for approval
                  </p>
                </Link>

                <Link
                  to="/admin/support"
                  className="group rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition hover:border-(--dh-gold)"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-(--dh-bg-secondary) p-3 text-(--dh-gold)">
                      <FiLifeBuoy size={21} />
                    </div>
                    <FiArrowUpRight
                      className="text-(--dh-muted) transition group-hover:text-(--dh-gold)"
                      size={20}
                    />
                  </div>
                  <h3 className="mt-5 text-3xl font-bold">4</h3>
                  <p className="mt-1 text-sm font-semibold">
                    Open Support Tickets
                  </p>
                  <p className="mt-2 text-xs text-(--dh-muted)">
                    Customer and agent requests
                  </p>
                </Link>
              </div>
            </div>

            {/* Properties and agents */}
            <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
              <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface) xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--dh-border) p-5">
                  <div>
                    <h2 className="font-bold">Recent Properties</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Latest property submissions
                    </p>
                  </div>
                  <Link
                    to="/admin/properties"
                    className="flex items-center gap-2 text-xs font-semibold text-(--dh-gold)"
                  >
                    View all <FiArrowRight size={15} />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-162.5 text-left text-sm">
                    <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                      <tr>
                        <th className="px-5 py-4 font-medium">Property</th>
                        <th className="px-5 py-4 font-medium">Agent</th>
                        <th className="px-5 py-4 font-medium">Price</th>
                        <th className="px-5 py-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProperties.map((property) => (
                        <tr
                          key={property.name}
                          className="border-t border-(--dh-border)"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold">{property.name}</p>
                            <p className="mt-1 text-xs text-(--dh-muted)">
                              {property.location}
                            </p>
                            <p className="mt-1 text-xs text-(--dh-gold)">
                              {property.category}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-(--dh-muted)">
                            {property.agent}
                          </td>
                          <td className="px-5 py-4 font-medium">
                            {property.price}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                                property.status === "Approved"
                                  ? "bg-(--dh-success)/10 text-(--dh-success)"
                                  : "bg-(--dh-gold)/10 text-(--dh-gold)"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Pending agents */}
              <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="font-bold">New Agent Applications</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Recently registered agents
                    </p>
                  </div>
                  <Link
                    to="/admin/agents"
                    className="text-(--dh-gold)"
                    aria-label="View all agent applications"
                  >
                    <FiArrowUpRight size={19} />
                  </Link>
                </div>

                <div className="mt-6 space-y-5">
                  {pendingAgents.map((agent) => (
                    <div key={agent.email} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--dh-bg-secondary) text-sm font-bold text-(--dh-gold)">
                        {agent.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {agent.name}
                        </p>
                        <p className="truncate text-xs text-(--dh-muted)">
                          {agent.email}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-xs text-(--dh-muted)">
                        {agent.date}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/admin/agents"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-(--dh-border) py-3 text-sm font-semibold transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                >
                  Review Applications <FiArrowRight size={16} />
                </Link>
              </section>
            </div>

            {/* Recent activity */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-bold">Recent Activity</h2>
                  <p className="mt-1 text-xs text-(--dh-muted)">
                    Latest activity across the platform
                  </p>
                </div>
                <span className="text-xs text-(--dh-muted)">Today</span>
              </div>

              <div className="space-y-6">
                {activities.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <div key={activity.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--dh-bg-secondary) text-(--dh-gold)">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs text-(--dh-muted)">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-xs text-(--dh-muted)">
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-(--dh-border) pt-5 text-xs text-(--dh-muted)">
              <p>DitiHomes Administration</p>
              <p>Platform overview</p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
