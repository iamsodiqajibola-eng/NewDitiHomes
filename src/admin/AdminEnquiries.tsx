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
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiFilter,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type EnquiryStatus = "New" | "In Progress" | "Resolved" | "Closed";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  property: string;
  propertyType: string;
  message: string;
  date: string;
  status: EnquiryStatus;
  assignedTo: string;
};

const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    name: "Daniel Williams",
    email: "daniel@example.com",
    phone: "+234 801 234 5678",
    subject: "Property inspection request",
    property: "Luxury 4 Bedroom Duplex",
    propertyType: "For Rent",
    message:
      "Hello, I am interested in this property. I would like to schedule an inspection this weekend. Please let me know the available dates and requirements.",
    date: "25 Nov 2026",
    status: "New",
    assignedTo: "Emmanuel Adewale",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 802 345 6789",
    subject: "Price clarification",
    property: "Modern 3 Bedroom Apartment",
    propertyType: "For Sale",
    message:
      "I would like to confirm if the advertised price is negotiable. Also, are there additional agency or legal fees?",
    date: "24 Nov 2026",
    status: "In Progress",
    assignedTo: "Grace Adeyemi",
  },
  {
    id: 3,
    name: "Michael Okafor",
    email: "michael@example.com",
    phone: "+234 803 456 7890",
    subject: "Shortlet availability",
    property: "Premium 2 Bedroom Shortlet",
    propertyType: "Shortlet",
    message:
      "I need a shortlet apartment for five nights next month. Is this property available, and does the price include cleaning?",
    date: "23 Nov 2026",
    status: "New",
    assignedTo: "Not assigned",
  },
  {
    id: 4,
    name: "Blessing Adeyemi",
    email: "blessing@example.com",
    phone: "+234 804 567 8901",
    subject: "Complaint about agent",
    property: "5 Bedroom Detached House",
    propertyType: "For Rent",
    message:
      "I contacted the agent about this property but have not received a response after several days. I would appreciate some assistance.",
    date: "22 Nov 2026",
    status: "In Progress",
    assignedTo: "Admin Team",
  },
  {
    id: 5,
    name: "David Ibrahim",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    subject: "Property ownership enquiry",
    property: "Commercial Property",
    propertyType: "For Sale",
    message:
      "I would like to know more about the ownership documentation and verification status of this property.",
    date: "21 Nov 2026",
    status: "Resolved",
    assignedTo: "Emmanuel Adewale",
  },
  {
    id: 6,
    name: "Grace Okoro",
    email: "grace@example.com",
    phone: "+234 806 789 0123",
    subject: "General platform enquiry",
    property: "Not property-specific",
    propertyType: "General",
    message:
      "I want to understand how DitiHomes works and how I can find verified agents on the platform.",
    date: "20 Nov 2026",
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

function AdminEnquiries() {
  const location = useLocation();

  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [notice, setNotice] = useState("");

  const newCount = enquiries.filter((item) => item.status === "New").length;
  const progressCount = enquiries.filter(
    (item) => item.status === "In Progress",
  ).length;
  const resolvedCount = enquiries.filter(
    (item) => item.status === "Resolved",
  ).length;
  const closedCount = enquiries.filter(
    (item) => item.status === "Closed",
  ).length;

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus =
      activeFilter === "All" || item.status === activeFilter;

    const query = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.property.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const statusStyle = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-400";
      case "In Progress":
        return "bg-(--dh-gold)/10 text-(--dh-gold)";
      case "Resolved":
        return "bg-(--dh-success)/10 text-(--dh-success)";
      case "Closed":
        return "bg-(--dh-bg-secondary) text-(--dh-muted)";
    }
  };

  const updateStatus = (id: number, status: EnquiryStatus) => {
    setEnquiries((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    setSelectedEnquiry((current) =>
      current && current.id === id ? { ...current, status } : current,
    );

    setNotice(`Enquiry marked as ${status}.`);
  };

  const saveNote = () => {
    if (!adminNote.trim() || !selectedEnquiry) return;

    setNotice("Admin note saved in this demo session.");
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
              <p className="text-sm font-semibold">Enquiry Management</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Monitor customer communication and follow up on unresolved
                enquiries.
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
                  <FiMessageSquare size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Enquiries
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Enquiry Management
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Review customer enquiries and monitor communication.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiMessageSquare className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">
                  Communication Centre
                </span>
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
                  title: "New Enquiries",
                  value: newCount,
                  icon: FiMail,
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
                  title: "Closed",
                  value: closedCount,
                  icon: FiAlertCircle,
                  color: "text-(--dh-muted)",
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

            {/* Enquiry table */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">All Enquiries</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Review and manage incoming messages.
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
                      placeholder="Search enquiries..."
                      className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) py-3 pl-10 pr-4 text-sm outline-none transition focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <FiFilter className="mr-1 text-(--dh-muted)" size={16} />

                  {["All", "New", "In Progress", "Resolved", "Closed"].map(
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
                <table className="w-full min-w-225 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Subject</th>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEnquiries.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold">{item.name}</p>
                          <p className="mt-1 text-xs text-(--dh-muted)">
                            {item.email}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-medium">{item.subject}</p>
                          <p className="mt-1 text-xs text-(--dh-muted)">
                            {item.propertyType}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="max-w-48 truncate text-sm">
                            {item.property}
                          </p>
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                          {item.date}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEnquiry(item);
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

                {filteredEnquiries.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiMessageSquare
                      size={28}
                      className="mx-auto text-(--dh-muted)"
                    />
                    <p className="mt-4 font-semibold">No enquiries found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Management note */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">
                    Enquiry handling policy
                  </p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Customer enquiries should be handled promptly. Property
                    questions should be directed to the responsible verified
                    agent where appropriate. Complaints about agents or property
                    listings should be reviewed by the administration team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>

      {/* Enquiry review modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Enquiry details
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {selectedEnquiry.subject}
                </h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  Enquiry #{selectedEnquiry.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry"
                className="rounded-lg border border-(--dh-border) p-2"
              >
                <FiX size={19} />
              </button>
            </div>

            {/* Customer details */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Customer</p>
                <p className="mt-2 font-semibold">{selectedEnquiry.name}</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <p className="text-xs text-(--dh-muted)">Property</p>
                <p className="mt-2 font-semibold">{selectedEnquiry.property}</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <div className="flex items-center gap-2 text-(--dh-muted)">
                  <FiMail size={14} />
                  <span className="text-xs">Email address</span>
                </div>
                <p className="mt-2 break-all text-sm font-medium">
                  {selectedEnquiry.email}
                </p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
                <div className="flex items-center gap-2 text-(--dh-muted)">
                  <FiPhone size={14} />
                  <span className="text-xs">Phone number</span>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {selectedEnquiry.phone}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Customer message</h3>
                <span className="text-xs text-(--dh-muted)">
                  {selectedEnquiry.date}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-(--dh-muted)">
                {selectedEnquiry.message}
              </p>
            </div>

            {/* Assignment */}
            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <p className="text-xs text-(--dh-muted)">Assigned to</p>
              <p className="mt-2 text-sm font-semibold">
                {selectedEnquiry.assignedTo}
              </p>
            </div>

            {/* Admin note */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Internal admin note
              </label>
              <textarea
                value={adminNote}
                onChange={(event) => setAdminNote(event.target.value)}
                rows={3}
                placeholder="Add an internal note about this enquiry..."
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
              <p className="mb-3 text-sm font-semibold">
                Update enquiry status
              </p>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "New",
                    "In Progress",
                    "Resolved",
                    "Closed",
                  ] as EnquiryStatus[]
                ).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(selectedEnquiry.id, status)}
                    disabled={selectedEnquiry.status === status}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      selectedEnquiry.status === status
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
              This page currently uses demonstration data. Internal notes and
              status changes are not saved to a database or sent to customers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEnquiries;
