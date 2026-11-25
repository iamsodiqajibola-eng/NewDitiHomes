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
  FiX,
  FiMail,
  FiPhone,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiFilter,
  FiSend,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

type Ticket = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  description: string;
  date: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
};

const initialTickets: Ticket[] = [
  {
    id: "DH-1001",
    name: "Daniel Williams",
    email: "daniel@example.com",
    phone: "+234 801 234 5678",
    subject: "Unable to access my account",
    category: "Account Access",
    description:
      "I have been trying to log into my account, but the platform keeps rejecting my password even after resetting it. I need assistance accessing my account.",
    date: "25 Nov 2026",
    priority: "High",
    status: "Open",
    assignedTo: "Unassigned",
  },
  {
    id: "DH-1002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 802 345 6789",
    subject: "Agent has not responded",
    category: "Agent Complaint",
    description:
      "I contacted an agent regarding a property inspection but have not received any response. I would like the support team to help me follow up.",
    date: "24 Nov 2026",
    priority: "Urgent",
    status: "In Progress",
    assignedTo: "Admin Team",
  },
  {
    id: "DH-1003",
    name: "Michael Okafor",
    email: "michael@example.com",
    phone: "+234 803 456 7890",
    subject: "Problem uploading property images",
    category: "Technical Issue",
    description:
      "I am trying to upload images for a property listing, but the upload process stops before completion. I have tried different image files.",
    date: "23 Nov 2026",
    priority: "Medium",
    status: "Open",
    assignedTo: "Unassigned",
  },
  {
    id: "DH-1004",
    name: "Blessing Adeyemi",
    email: "blessing@example.com",
    phone: "+234 804 567 8901",
    subject: "Request to update profile details",
    category: "Profile Update",
    description:
      "I recently changed my phone number and would like to update the contact details associated with my DitiHomes account.",
    date: "22 Nov 2026",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Admin Team",
  },
  {
    id: "DH-1005",
    name: "David Ibrahim",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    subject: "Suspicious property listing",
    category: "Report a Listing",
    description:
      "I believe a property listing may contain misleading information. Please review the listing and confirm whether the agent is authorised to advertise it.",
    date: "21 Nov 2026",
    priority: "Urgent",
    status: "In Progress",
    assignedTo: "Admin Team",
  },
  {
    id: "DH-1006",
    name: "Grace Okoro",
    email: "grace@example.com",
    phone: "+234 806 789 0123",
    subject: "General platform question",
    category: "General Support",
    description:
      "I would like to understand how to report a problem with a property or an agent after contacting them through the platform.",
    date: "20 Nov 2026",
    priority: "Low",
    status: "Closed",
    assignedTo: "Admin Team",
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

function AdminSupport() {
  const location = useLocation();

  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [notice, setNotice] = useState("");

  const openCount = tickets.filter((ticket) => ticket.status === "Open").length;
  const progressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;
  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;
  const urgentCount = tickets.filter(
    (ticket) =>
      ticket.priority === "Urgent" &&
      ticket.status !== "Resolved" &&
      ticket.status !== "Closed",
  ).length;

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      activeFilter === "All" || ticket.status === activeFilter;

    const query = search.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(query) ||
      ticket.name.toLowerCase().includes(query) ||
      ticket.email.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const statusStyle = (status: TicketStatus) => {
    switch (status) {
      case "Open":
        return "bg-blue-500/10 text-blue-400";
      case "In Progress":
        return "bg-(--dh-gold)/10 text-(--dh-gold)";
      case "Resolved":
        return "bg-(--dh-success)/10 text-(--dh-success)";
      case "Closed":
        return "bg-(--dh-bg-secondary) text-(--dh-muted)";
    }
  };

  const priorityStyle = (priority: TicketPriority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500/10 text-red-400";
      case "High":
        return "bg-orange-500/10 text-orange-400";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400";
      case "Low":
        return "bg-(--dh-bg-secondary) text-(--dh-muted)";
    }
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updates } : ticket,
      ),
    );

    setSelectedTicket((current) =>
      current && current.id === id ? { ...current, ...updates } : current,
    );

    setNotice("Ticket updated successfully.");
  };

  const saveNote = () => {
    if (!adminNote.trim() || !selectedTicket) return;

    setNotice("Internal note saved in this demo session.");
    setAdminNote("");
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
              <p className="text-sm font-semibold">Support Centre</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Track reported issues and make sure users receive the assistance
                they need.
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

        {/* Main content */}
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
                  <FiLifeBuoy size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Support
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Support Tickets
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Manage complaints, technical issues and user requests.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiLifeBuoy className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">Help & Support</span>
              </div>
            </div>

            {/* Notification */}
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
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Open Tickets",
                  value: openCount,
                  icon: FiLifeBuoy,
                  color: "text-blue-400",
                },
                {
                  title: "In Progress",
                  value: progressCount,
                  icon: FiClock,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Resolved",
                  value: resolvedCount,
                  icon: FiCheckCircle,
                  color: "text-(--dh-success)",
                },
                {
                  title: "Urgent Tickets",
                  value: urgentCount,
                  icon: FiAlertCircle,
                  color: "text-red-400",
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

            {/* Tickets table */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">All Support Tickets</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Review, prioritise and manage user support requests.
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
                      placeholder="Search tickets..."
                      className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) py-3 pl-10 pr-4 text-sm outline-none transition focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <FiFilter className="mr-1 text-(--dh-muted)" size={16} />

                  {["All", "Open", "In Progress", "Resolved", "Closed"].map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setActiveFilter(status)}
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                          activeFilter === status
                            ? "bg-(--dh-gold) text-black"
                            : "border border-(--dh-border) text-(--dh-muted) hover:text-(--dh-white)"
                        }`}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-240 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">Ticket ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Issue</th>
                      <th className="px-6 py-4 font-medium">Priority</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5 font-semibold text-(--dh-gold)">
                          {ticket.id}
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold">{ticket.name}</p>
                          <p className="mt-1 text-xs text-(--dh-muted)">
                            {ticket.email}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="mt-1 text-xs text-(--dh-muted)">
                            {ticket.category}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(ticket.priority)}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setAdminNote("");
                            }}
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

                {filteredTickets.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiLifeBuoy
                      size={28}
                      className="mx-auto text-(--dh-muted)"
                    />
                    <p className="mt-4 font-semibold">No tickets found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Support policy */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">
                    Support handling policy
                  </p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Urgent complaints involving suspected fraudulent listings,
                    unauthorised agents or customer safety should receive
                    priority review. Account and technical issues should be
                    assigned to the appropriate support personnel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>

      {/* Ticket review modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Support request
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {selectedTicket.subject}
                </h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  {selectedTicket.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                aria-label="Close ticket"
                className="rounded-lg border border-(--dh-border) p-2"
              >
                <FiX size={19} />
              </button>
            </div>

            {/* Customer details */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Customer</p>
                <p className="mt-2 font-semibold">{selectedTicket.name}</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Category</p>
                <p className="mt-2 font-semibold">{selectedTicket.category}</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <div className="flex items-center gap-2 text-(--dh-muted)">
                  <FiMail size={14} />
                  <span className="text-xs">Email</span>
                </div>
                <p className="mt-2 break-all text-sm font-medium">
                  {selectedTicket.email}
                </p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <div className="flex items-center gap-2 text-(--dh-muted)">
                  <FiPhone size={14} />
                  <span className="text-xs">Phone</span>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {selectedTicket.phone}
                </p>
              </div>
            </div>

            {/* Ticket description */}
            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Issue description</h3>
                <span className="text-xs text-(--dh-muted)">
                  {selectedTicket.date}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-(--dh-muted)">
                {selectedTicket.description}
              </p>
            </div>

            {/* Assignment and priority */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Assigned to</p>
                <p className="mt-2 text-sm font-semibold">
                  {selectedTicket.assignedTo}
                </p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Priority</p>
                <p className="mt-2 text-sm font-semibold">
                  {selectedTicket.priority}
                </p>
              </div>
            </div>

            {/* Priority update */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold">
                Update priority
              </label>
              <select
                value={selectedTicket.priority}
                onChange={(event) =>
                  updateTicket(selectedTicket.id, {
                    priority: event.target.value as TicketPriority,
                  })
                }
                className="w-full rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3 text-sm outline-none focus:border-(--dh-gold)"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Assignment update */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Assign ticket
              </label>
              <select
                value={selectedTicket.assignedTo}
                onChange={(event) =>
                  updateTicket(selectedTicket.id, {
                    assignedTo: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3 text-sm outline-none focus:border-(--dh-gold)"
              >
                <option value="Unassigned">Unassigned</option>
                <option value="Admin Team">Admin Team</option>
                <option value="Support Team">Support Team</option>
                <option value="Technical Team">Technical Team</option>
              </select>
            </div>

            {/* Internal note */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Internal admin note
              </label>
              <textarea
                value={adminNote}
                onChange={(event) => setAdminNote(event.target.value)}
                rows={3}
                placeholder="Add an internal note about this ticket..."
                className="w-full resize-none rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4 text-sm outline-none transition focus:border-(--dh-gold)"
              />

              <button
                type="button"
                onClick={saveNote}
                disabled={!adminNote.trim()}
                className="mt-3 flex items-center gap-2 rounded-lg border border-(--dh-border) px-4 py-2 text-xs font-semibold transition hover:border-(--dh-gold) disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiSend size={14} />
                Save Internal Note
              </button>
            </div>

            {/* Status management */}
            <div className="mt-7 border-t border-(--dh-border) pt-6">
              <p className="mb-3 text-sm font-semibold">Update ticket status</p>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "Open",
                    "In Progress",
                    "Resolved",
                    "Closed",
                  ] as TicketStatus[]
                ).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateTicket(selectedTicket.id, { status })}
                    disabled={selectedTicket.status === status}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      selectedTicket.status === status
                        ? "bg-(--dh-gold) text-black"
                        : "border border-(--dh-border) text-(--dh-muted) hover:border-(--dh-gold) hover:text-(--dh-white)"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-(--dh-muted)">
              This page currently uses demonstration data. Ticket updates,
              assignments and notes are not saved to a database or sent to
              customers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSupport;
