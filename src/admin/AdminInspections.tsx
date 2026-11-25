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
  FiMapPin,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiUser,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type InspectionStatus =
  | "Scheduled"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No-show"
  | "Disputed";

type Inspection = {
  id: number;
  property: string;
  location: string;
  customer: string;
  agent: string;
  date: string;
  time: string;
  fee: string;
  status: InspectionStatus;
  notes: string;
};

const initialInspections: Inspection[] = [
  {
    id: 1,
    property: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    customer: "Michael Johnson",
    agent: "Emmanuel Adewale",
    date: "28 Nov 2026",
    time: "10:00 AM",
    fee: "₦15,000",
    status: "Confirmed",
    notes: "Customer has confirmed attendance. Agent has accepted the booking.",
  },
  {
    id: 2,
    property: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    customer: "Sarah Williams",
    agent: "Blessing Okoro",
    date: "29 Nov 2026",
    time: "12:30 PM",
    fee: "₦10,000",
    status: "Scheduled",
    notes: "Awaiting confirmation from the assigned agent.",
  },
  {
    id: 3,
    property: "5 Bedroom Detached House",
    location: "Banana Island, Lagos",
    customer: "David Smith",
    agent: "Samuel Ibrahim",
    date: "23 Nov 2026",
    time: "11:00 AM",
    fee: "₦20,000",
    status: "Completed",
    notes:
      "Inspection completed. Both customer and agent confirmed attendance.",
  },
  {
    id: 4,
    property: "Serviced 2 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    customer: "Grace Johnson",
    agent: "Grace Adeyemi",
    date: "22 Nov 2026",
    time: "02:00 PM",
    fee: "₦10,000",
    status: "Disputed",
    notes:
      "Customer reported that the property shown did not match the listing.",
  },
  {
    id: 5,
    property: "Commercial Office Space",
    location: "Yaba, Lagos",
    customer: "Daniel Okafor",
    agent: "David Okafor",
    date: "21 Nov 2026",
    time: "09:30 AM",
    fee: "₦12,000",
    status: "No-show",
    notes:
      "Customer reported that the agent did not arrive at the agreed time.",
  },
  {
    id: 6,
    property: "2 Bedroom Terrace",
    location: "Surulere, Lagos",
    customer: "Amina Bello",
    agent: "Emmanuel Adewale",
    date: "20 Nov 2026",
    time: "01:00 PM",
    fee: "₦8,000",
    status: "Cancelled",
    notes: "Customer cancelled the inspection before the scheduled date.",
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

function AdminInspections() {
  const location = useLocation();

  const [inspections, setInspections] =
    useState<Inspection[]>(initialInspections);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const scheduledCount = inspections.filter(
    (item) => item.status === "Scheduled",
  ).length;

  const confirmedCount = inspections.filter(
    (item) => item.status === "Confirmed",
  ).length;

  const completedCount = inspections.filter(
    (item) => item.status === "Completed",
  ).length;

  const attentionCount = inspections.filter(
    (item) => item.status === "No-show" || item.status === "Disputed",
  ).length;

  const filteredInspections = inspections.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.property.toLowerCase().includes(searchText) ||
      item.customer.toLowerCase().includes(searchText) ||
      item.agent.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const updateInspectionStatus = (id: number, status: InspectionStatus) => {
    setInspections((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    setSelectedInspection(null);

    setNotice(`Inspection status updated to ${status}.`);
  };

  const statusStyle = (status: InspectionStatus) => {
    switch (status) {
      case "Completed":
        return "bg-(--dh-success)/10 text-(--dh-success)";
      case "Cancelled":
      case "No-show":
        return "bg-(--dh-danger)/10 text-(--dh-danger)";
      case "Disputed":
        return "bg-orange-500/10 text-orange-400";
      case "Confirmed":
        return "bg-blue-500/10 text-blue-400";
      default:
        return "bg-(--dh-gold)/10 text-(--dh-gold)";
    }
  };

  const filters = [
    "All",
    "Scheduled",
    "Confirmed",
    "Completed",
    "Cancelled",
    "No-show",
    "Disputed",
  ];

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
              <p className="text-sm font-semibold">Inspection Management</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Monitor bookings, attendance, cancellations and customer
                complaints.
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
                  <FiClipboard size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Inspections
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Inspection Management
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Monitor property visits, attendance and inspection disputes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiCalendar className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">Inspection Centre</span>
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
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Scheduled",
                  value: scheduledCount,
                  icon: FiCalendar,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Confirmed",
                  value: confirmedCount,
                  icon: FiCheck,
                  color: "text-blue-400",
                },
                {
                  title: "Completed",
                  value: completedCount,
                  icon: FiClipboard,
                  color: "text-(--dh-success)",
                },
                {
                  title: "Needs Attention",
                  value: attentionCount,
                  icon: FiAlertCircle,
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

            {/* Attention notice */}
            {attentionCount > 0 && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-(--dh-danger)/20 bg-(--dh-danger)/5 p-4">
                <FiAlertCircle
                  className="mt-0.5 shrink-0 text-(--dh-danger)"
                  size={19}
                />
                <div>
                  <p className="text-sm font-semibold">
                    Inspections requiring attention
                  </p>
                  <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                    There are {attentionCount} inspection records involving
                    no-shows or disputes. Review these cases and document the
                    outcome.
                  </p>
                </div>
              </div>
            )}

            {/* Inspection records */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">Inspection Bookings</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      View and manage customer property inspections.
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
                      placeholder="Search inspections..."
                      className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) py-3 pl-10 pr-4 text-sm outline-none transition focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {filters.map((filter) => (
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-225 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Agent</th>
                      <th className="px-6 py-4 font-medium">Date & Time</th>
                      <th className="px-6 py-4 font-medium">Fee</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInspections.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold">{item.property}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-(--dh-muted)">
                            <FiMapPin size={12} />
                            {item.location}
                          </p>
                        </td>

                        <td className="px-6 py-5">{item.customer}</td>

                        <td className="px-6 py-5">{item.agent}</td>

                        <td className="px-6 py-5">
                          <p className="whitespace-nowrap">{item.date}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-(--dh-muted)">
                            <FiClock size={12} />
                            {item.time}
                          </p>
                        </td>

                        <td className="px-6 py-5 font-medium">{item.fee}</td>

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
                            onClick={() => setSelectedInspection(item)}
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

                {filteredInspections.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiClipboard
                      size={28}
                      className="mx-auto text-(--dh-muted)"
                    />
                    <p className="mt-4 font-semibold">No inspections found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Inspection policy */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiShieldIcon />
                <div>
                  <p className="text-sm font-semibold">
                    Inspection management policy
                  </p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Customers and agents should confirm attendance for every
                    completed inspection. Record no-shows and cancellations
                    accurately. Escalate disputes for administrative review
                    before making any decision about inspection fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer stays within the main content area */}
          <Footer />
        </main>
      </div>

      {/* Inspection review modal */}
      {selectedInspection && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedInspection(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Inspection details
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {selectedInspection.property}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-(--dh-muted)">
                  <FiMapPin size={14} />
                  {selectedInspection.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInspection(null)}
                className="rounded-lg border border-(--dh-border) p-2"
                aria-label="Close review"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Customer", selectedInspection.customer],
                ["Assigned agent", selectedInspection.agent],
                ["Inspection date", selectedInspection.date],
                ["Inspection time", selectedInspection.time],
                ["Inspection fee", selectedInspection.fee],
                ["Booking reference", `INS-${selectedInspection.id}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4"
                >
                  <p className="text-xs text-(--dh-muted)">{label}</p>
                  <p className="mt-2 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <div className="flex items-center gap-2">
                <FiUser className="text-(--dh-gold)" />
                <h3 className="text-sm font-semibold">Inspection notes</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                {selectedInspection.notes}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedInspection.status)}`}
              >
                {selectedInspection.status}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              {selectedInspection.status !== "Completed" &&
                selectedInspection.status !== "Cancelled" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateInspectionStatus(selectedInspection.id, "Cancelled")
                    }
                    className="rounded-xl border border-(--dh-danger)/40 px-4 py-3 text-sm font-semibold text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
                  >
                    Cancel Booking
                  </button>
                )}

              {selectedInspection.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() =>
                    updateInspectionStatus(selectedInspection.id, "No-show")
                  }
                  className="rounded-xl border border-(--dh-border) px-4 py-3 text-sm font-semibold transition hover:border-(--dh-gold)"
                >
                  Mark No-show
                </button>
              )}

              {selectedInspection.status === "Disputed" && (
                <button
                  type="button"
                  onClick={() =>
                    updateInspectionStatus(selectedInspection.id, "Completed")
                  }
                  className="rounded-xl bg-(--dh-success) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <FiCheck className="mr-2 inline" />
                  Resolve Dispute
                </button>
              )}

              {(selectedInspection.status === "Scheduled" ||
                selectedInspection.status === "Confirmed") && (
                <button
                  type="button"
                  onClick={() =>
                    updateInspectionStatus(selectedInspection.id, "Completed")
                  }
                  className="rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  <FiCheck className="mr-2 inline" />
                  Mark Completed
                </button>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-(--dh-muted)">
              Status changes on this page are currently demo-only. Actual
              attendance confirmation, dispute resolution and fee handling will
              be connected to the backend later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function FiShieldIcon() {
  return <FiAlertCircle className="mt-1 shrink-0 text-(--dh-gold)" />;
}

export default AdminInspections;
