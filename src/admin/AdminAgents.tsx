import { useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiClipboard,
  FiMessageSquare,
  FiLifeBuoy,
  FiSettings,
  FiSearch,
  FiEye,
  FiCheck,
  FiX,
  FiClock,
  FiFileText,
  FiShield,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type AgentStatus = "Pending" | "Approved" | "Rejected";

type Agent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  business: string;
  location: string;
  date: string;
  initials: string;
  status: AgentStatus;
  license: string;
  identity: string;
};

const initialAgents: Agent[] = [
  {
    id: 1,
    name: "Emmanuel Adewale",
    email: "emmanuel@example.com",
    phone: "+234 801 234 5678",
    business: "Adewale Properties",
    location: "Lekki, Lagos",
    date: "25 Nov 2026",
    initials: "EA",
    status: "Pending",
    license: "Uploaded",
    identity: "Uploaded",
  },
  {
    id: 2,
    name: "Blessing Okoro",
    email: "blessing@example.com",
    phone: "+234 802 345 6789",
    business: "BO Realty",
    location: "Ikeja, Lagos",
    date: "24 Nov 2026",
    initials: "BO",
    status: "Pending",
    license: "Uploaded",
    identity: "Uploaded",
  },
  {
    id: 3,
    name: "Samuel Ibrahim",
    email: "samuel@example.com",
    phone: "+234 803 456 7890",
    business: "Prime Homes",
    location: "Victoria Island, Lagos",
    date: "22 Nov 2026",
    initials: "SI",
    status: "Approved",
    license: "Uploaded",
    identity: "Uploaded",
  },
  {
    id: 4,
    name: "Grace Adeyemi",
    email: "grace@example.com",
    phone: "+234 804 567 8901",
    business: "Grace Realty",
    location: "Surulere, Lagos",
    date: "20 Nov 2026",
    initials: "GA",
    status: "Rejected",
    license: "Uploaded",
    identity: "Uploaded",
  },
  {
    id: 5,
    name: "David Okafor",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    business: "Oak Estates",
    location: "Ikoyi, Lagos",
    date: "19 Nov 2026",
    initials: "DO",
    status: "Pending",
    license: "Uploaded",
    identity: "Uploaded",
  },
];

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

function AdminAgents() {
  const location = useLocation();

  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const pendingCount = agents.filter(
    (agent) => agent.status === "Pending",
  ).length;

  const approvedCount = agents.filter(
    (agent) => agent.status === "Approved",
  ).length;

  const rejectedCount = agents.filter(
    (agent) => agent.status === "Rejected",
  ).length;

  const filteredAgents = agents.filter((agent) => {
    const matchesFilter =
      activeFilter === "All" || agent.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      agent.name.toLowerCase().includes(searchText) ||
      agent.email.toLowerCase().includes(searchText) ||
      agent.business.toLowerCase().includes(searchText) ||
      agent.location.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const updateAgentStatus = (id: number, status: AgentStatus) => {
    setAgents((current) =>
      current.map((agent) => (agent.id === id ? { ...agent, status } : agent)),
    );

    setSelectedAgent(null);
    setNotice(
      status === "Approved"
        ? "Agent application approved."
        : "Agent application rejected.",
    );
  };

  const statusStyle = (status: AgentStatus) => {
    if (status === "Approved") {
      return "bg-(--dh-success)/10 text-(--dh-success)";
    }

    if (status === "Rejected") {
      return "bg-(--dh-danger)/10 text-(--dh-danger)";
    }

    return "bg-(--dh-gold)/10 text-(--dh-gold)";
  };

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
                Review and manage agent applications.
              </p>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-20 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 lg:ml-72">
          <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg border border-(--dh-border) p-2 lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <FiUsers size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Agent Applications
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Agent Management
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Review applications and verify agents before they operate.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiShield className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">
                  Verification Centre
                </span>
              </div>
            </div>

            {/* Notice */}
            {notice && (
              <div className="mb-6 flex items-center justify-between rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 px-4 py-3 text-sm text-(--dh-success)">
                {notice}
                <button
                  type="button"
                  onClick={() => setNotice("")}
                  aria-label="Dismiss notification"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                {
                  title: "Pending Applications",
                  value: pendingCount,
                  icon: FiClock,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Approved Agents",
                  value: approvedCount,
                  icon: FiCheck,
                  color: "text-(--dh-success)",
                },
                {
                  title: "Rejected Applications",
                  value: rejectedCount,
                  icon: FiX,
                  color: "text-(--dh-danger)",
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-(--dh-muted)">{stat.title}</p>
                      <Icon size={20} className={stat.color} />
                    </div>
                    <h2 className="mt-5 text-3xl font-bold">{stat.value}</h2>
                  </div>
                );
              })}
            </div>

            {/* Applications table */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">Agent Applications</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Review agent details and submitted verification documents.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <FiSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                      size={17}
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search agents..."
                      className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) py-3 pl-10 pr-4 text-sm outline-none transition focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["All", "Pending", "Approved", "Rejected"].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                        activeFilter === filter
                          ? "bg-(--dh-gold) text-black"
                          : "border border-(--dh-border) text-(--dh-muted) hover:text-(--dh-white)"
                      }`}
                    >
                      {filter}
                      {filter === "Pending" && ` (${pendingCount})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-212.5 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">Agent</th>
                      <th className="px-6 py-4 font-medium">Business</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Applied</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr
                        key={agent.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--dh-bg-secondary) text-xs font-bold text-(--dh-gold)">
                              {agent.initials}
                            </div>
                            <div>
                              <p className="font-semibold">{agent.name}</p>
                              <p className="mt-1 text-xs text-(--dh-muted)">
                                {agent.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">{agent.business}</td>
                        <td className="px-6 py-5 text-(--dh-muted)">
                          {agent.location}
                        </td>
                        <td className="px-6 py-5 text-(--dh-muted)">
                          {agent.date}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(agent.status)}`}
                          >
                            {agent.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedAgent(agent)}
                            className="flex items-center gap-2 rounded-lg border border-(--dh-border) px-3 py-2 text-xs font-semibold transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                          >
                            <FiEye size={15} />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAgents.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiUsers size={28} className="mx-auto text-(--dh-muted)" />
                    <p className="mt-4 font-semibold">No applications found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Approval policy */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">Agent approval policy</p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Agents must pass administrative verification before they can
                    operate on DitiHomes. Approval of an agent does not
                    automatically approve their property listings. Each
                    submitted property requires a separate review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer now belongs to the main content area */}
          <Footer />
        </main>
      </div>

      {/* Agent review modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Application review
                </p>
                <h2 className="mt-2 text-xl font-bold">{selectedAgent.name}</h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  {selectedAgent.business}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                className="rounded-lg border border-(--dh-border) p-2"
                aria-label="Close review"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Email address", selectedAgent.email],
                ["Phone number", selectedAgent.phone],
                ["Business name", selectedAgent.business],
                ["Operating location", selectedAgent.location],
                ["Application date", selectedAgent.date],
                ["Current status", selectedAgent.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4"
                >
                  <p className="text-xs text-(--dh-muted)">{label}</p>
                  <p className="mt-2 wrap-break-words text-sm font-semibold">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <h3 className="mb-4 font-semibold">Submitted Documents</h3>

              <div className="space-y-3">
                {[
                  ["Identity document", selectedAgent.identity],
                  ["Professional licence / credentials", selectedAgent.license],
                ].map(([label, status]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4"
                  >
                    <div className="flex items-center gap-3">
                      <FiFileText className="text-(--dh-gold)" size={20} />
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="mt-1 text-xs text-(--dh-muted)">
                          {status}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-(--dh-muted)">
                      Demo record
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs leading-5 text-(--dh-muted)">
                Document previews and authenticity checks will be connected when
                we integrate the backend.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => updateAgentStatus(selectedAgent.id, "Rejected")}
                className="flex items-center gap-2 rounded-xl border border-(--dh-danger)/40 px-5 py-3 text-sm font-semibold text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
              >
                <FiX size={17} />
                Reject
              </button>

              <button
                type="button"
                onClick={() => updateAgentStatus(selectedAgent.id, "Approved")}
                className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <FiCheck size={17} />
                Approve Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAgents;
