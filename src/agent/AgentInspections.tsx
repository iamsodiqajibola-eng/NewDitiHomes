import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiSearch,
  FiHome,
  FiGrid,
  FiEye,
  FiPhone,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type InspectionStatus = "Pending" | "Confirmed" | "Completed" | "Declined";

type Inspection = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  property: string;
  location: string;
  date: string;
  time: string;
  status: InspectionStatus;
  note: string;
};

const initialInspections: Inspection[] = [
  {
    id: 1,
    customer: "Daniel Adewale",
    email: "daniel@example.com",
    phone: "+234 801 234 5678",
    property: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    date: "2026-11-27",
    time: "10:00 AM",
    status: "Pending",
    note: "I would like to inspect the property with my family.",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+234 803 456 7890",
    property: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    date: "2026-11-28",
    time: "12:30 PM",
    status: "Confirmed",
    note: "Please confirm parking availability.",
  },
  {
    id: 3,
    customer: "Michael Okafor",
    email: "michael@example.com",
    phone: "+234 805 678 9012",
    property: "Contemporary 5 Bedroom Mansion",
    location: "Banana Island, Lagos",
    date: "2026-11-25",
    time: "02:00 PM",
    status: "Completed",
    note: "Interested in purchasing the property.",
  },
  {
    id: 4,
    customer: "Esther Williams",
    email: "esther@example.com",
    phone: "+234 807 123 4567",
    property: "Serviced 2 Bedroom Shortlet",
    location: "Victoria Island, Lagos",
    date: "2026-11-29",
    time: "11:00 AM",
    status: "Pending",
    note: "I need to see the apartment before booking.",
  },
];

const statusStyles: Record<InspectionStatus, string> = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  Confirmed:
    "border-(--dh-success)/20 bg-(--dh-success)/10 text-(--dh-success)",
  Completed: "border-sky-500/20 bg-sky-500/10 text-sky-500",
  Declined: "border-(--dh-danger)/20 bg-(--dh-danger)/10 text-(--dh-danger)",
};

function AgentInspections() {
  const [inspections, setInspections] =
    useState<Inspection[]>(initialInspections);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null);

  const updateStatus = (id: number, status: InspectionStatus) => {
    setInspections((previous) =>
      previous.map((inspection) =>
        inspection.id === id ? { ...inspection, status } : inspection,
      ),
    );

    setSelectedInspection((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );
  };

  const pendingCount = inspections.filter(
    (item) => item.status === "Pending",
  ).length;

  const confirmedCount = inspections.filter(
    (item) => item.status === "Confirmed",
  ).length;

  const completedCount = inspections.filter(
    (item) => item.status === "Completed",
  ).length;

  const filteredInspections = inspections.filter((inspection) => {
    const matchesFilter =
      activeFilter === "All" || inspection.status === activeFilter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      inspection.customer.toLowerCase().includes(search) ||
      inspection.property.toLowerCase().includes(search) ||
      inspection.location.toLowerCase().includes(search);

    return matchesFilter && matchesSearch;
  });

  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <div className="flex min-h-screen pt-20">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-(--dh-border) bg-(--dh-bg-secondary) lg:block">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col px-5 py-7">
            <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-widest text-(--dh-muted)">
              Agent workspace
            </p>

            <nav className="space-y-2">
              <Link
                to="/agent"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-muted) transition hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiGrid size={18} />
                Dashboard
              </Link>

              <Link
                to="/agent/properties"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-muted) transition hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiHome size={18} />
                My Properties
              </Link>

              <Link
                to="/agent/inspections"
                className="flex items-center gap-3 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 px-4 py-3 text-sm font-semibold text-(--dh-gold)"
              >
                <FiCalendar size={18} />
                Inspections
              </Link>

              <Link
                to="/agent/enquiries"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-muted) transition hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiEye size={18} />
                Enquiries
              </Link>

              <Link
                to="/agent/customers"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-muted) transition hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiUser size={18} />
                Customers
              </Link>
            </nav>

            <div className="mt-auto rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                <FiAlertCircle size={20} />
              </div>

              <h3 className="text-sm font-semibold">Inspection support</h3>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Contact support if you experience an issue during an inspection.
              </p>

              <Link
                to="/agent/support"
                className="mt-4 inline-flex text-xs font-semibold text-(--dh-gold) hover:underline"
              >
                Get assistance
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2 text-xs text-(--dh-muted)">
                <Link to="/agent" className="hover:text-(--dh-gold)">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="text-(--dh-gold)">Inspections</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Property Inspections
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-(--dh-muted)">
                Manage customer inspection requests, confirm appointments and
                keep track of completed visits.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">
                    Total requests
                  </span>
                  <FiCalendar className="text-(--dh-gold)" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{inspections.length}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  All inspection requests
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">Pending</span>
                  <FiClock className="text-amber-500" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{pendingCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Awaiting your response
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">Confirmed</span>
                  <FiCheckCircle className="text-(--dh-success)" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{confirmedCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Scheduled appointments
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">Completed</span>
                  <FiCheckCircle className="text-sky-500" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{completedCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Finished inspections
                </p>
              </div>
            </div>

            {/* Search and filters */}
            <div className="mt-8 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4 sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative w-full xl:max-w-md">
                  <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                    size={18}
                  />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search customer, property or location..."
                    className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-(--dh-muted) focus:border-(--dh-gold)"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {["All", "Pending", "Confirmed", "Completed", "Declined"].map(
                    (filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                          activeFilter === filter
                            ? "bg-(--dh-gold) text-black"
                            : "border border-(--dh-border) text-(--dh-muted) hover:border-(--dh-gold)/50 hover:text-(--dh-white)"
                        }`}
                      >
                        {filter}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Inspection list */}
            <div className="mt-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Inspection requests
                  <span className="ml-2 text-sm font-normal text-(--dh-muted)">
                    ({filteredInspections.length})
                  </span>
                </h2>
              </div>

              {filteredInspections.length > 0 ? (
                <div className="space-y-4">
                  {filteredInspections.map((inspection) => (
                    <article
                      key={inspection.id}
                      className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition hover:border-(--dh-gold)/30 sm:p-6"
                    >
                      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <span className="text-xs font-medium text-(--dh-muted)">
                              Request #
                              {inspection.id.toString().padStart(4, "0")}
                            </span>

                            <span
                              className={`rounded-lg border px-3 py-1 text-xs font-semibold ${statusStyles[inspection.status]}`}
                            >
                              {inspection.status}
                            </span>
                          </div>

                          <h3 className="text-base font-semibold">
                            {inspection.property}
                          </h3>

                          <p className="mt-2 flex items-center gap-2 text-xs text-(--dh-muted)">
                            <FiMapPin size={14} />
                            {inspection.location}
                          </p>

                          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--dh-bg) text-(--dh-gold)">
                                <FiUser size={17} />
                              </div>
                              <div>
                                <p className="text-xs text-(--dh-muted)">
                                  Customer
                                </p>
                                <p className="mt-1 text-sm font-medium">
                                  {inspection.customer}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--dh-bg) text-(--dh-gold)">
                                <FiCalendar size={17} />
                              </div>
                              <div>
                                <p className="text-xs text-(--dh-muted)">
                                  Requested date
                                </p>
                                <p className="mt-1 text-sm font-medium">
                                  {formatDate(inspection.date)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--dh-bg) text-(--dh-gold)">
                                <FiClock size={17} />
                              </div>
                              <div>
                                <p className="text-xs text-(--dh-muted)">
                                  Requested time
                                </p>
                                <p className="mt-1 text-sm font-medium">
                                  {inspection.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 border-t border-(--dh-border) pt-4 xl:w-52 xl:flex-col xl:items-stretch xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
                          <button
                            type="button"
                            onClick={() => setSelectedInspection(inspection)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-4 py-2.5 text-xs font-semibold transition hover:bg-(--dh-surface-hover) xl:flex-none"
                          >
                            <FiEye size={15} />
                            View details
                          </button>

                          {inspection.status === "Pending" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(inspection.id, "Confirmed")
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-4 py-2.5 text-xs font-semibold text-black transition hover:opacity-90 xl:flex-none"
                              >
                                <FiCheckCircle size={15} />
                                Accept request
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateStatus(inspection.id, "Declined")
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--dh-danger)/30 px-4 py-2.5 text-xs font-semibold text-(--dh-danger) transition hover:bg-(--dh-danger)/10 xl:flex-none"
                              >
                                <FiXCircle size={15} />
                                Decline
                              </button>
                            </>
                          )}

                          {inspection.status === "Confirmed" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(inspection.id, "Completed")
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-(--dh-success) px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 xl:flex-none"
                            >
                              <FiCheckCircle size={15} />
                              Mark completed
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-(--dh-border) bg-(--dh-surface) px-5 py-16 text-center">
                  <FiCalendar className="mx-auto text-(--dh-muted)" size={30} />
                  <h3 className="mt-4 text-lg font-semibold">
                    No inspection requests found
                  </h3>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Try changing your search or selecting another status.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Inspection details modal */}
      {selectedInspection && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedInspection(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inspection-modal-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-(--dh-muted)">
                  Request #{selectedInspection.id.toString().padStart(4, "0")}
                </p>
                <h2
                  id="inspection-modal-title"
                  className="mt-2 text-xl font-bold"
                >
                  Inspection details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInspection(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiXCircle size={20} />
              </button>
            </div>

            <div className="mt-5">
              <span
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedInspection.status]}`}
              >
                {selectedInspection.status}
              </span>

              <h3 className="mt-5 text-base font-semibold">
                {selectedInspection.property}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-(--dh-muted)">
                <FiMapPin size={15} />
                {selectedInspection.location}
              </p>
            </div>

            <div className="mt-6 space-y-4 border-t border-(--dh-border) pt-5">
              <div>
                <p className="text-xs text-(--dh-muted)">Customer name</p>
                <p className="mt-1 text-sm font-medium">
                  {selectedInspection.customer}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--dh-muted)">Email address</p>
                <p className="mt-1 break-all text-sm font-medium">
                  {selectedInspection.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-(--dh-muted)">Phone number</p>
                <a
                  href={`tel:${selectedInspection.phone.replace(/\s/g, "")}`}
                  className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-(--dh-gold)"
                >
                  <FiPhone size={14} />
                  {selectedInspection.phone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-(--dh-muted)">Inspection date</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatDate(selectedInspection.date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-(--dh-muted)">Inspection time</p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedInspection.time}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-(--dh-muted)">Customer's note</p>
                <p className="mt-2 rounded-xl bg-(--dh-bg) p-4 text-sm leading-6 text-(--dh-muted)">
                  {selectedInspection.note || "No additional note provided."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-(--dh-border) pt-5">
              {selectedInspection.status === "Pending" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedInspection.id, "Declined")
                    }
                    className="rounded-xl border border-(--dh-danger)/30 px-4 py-2.5 text-xs font-semibold text-(--dh-danger)"
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedInspection.id, "Confirmed")
                    }
                    className="rounded-xl bg-(--dh-gold) px-4 py-2.5 text-xs font-semibold text-black"
                  >
                    Accept request
                  </button>
                </>
              )}

              {selectedInspection.status === "Confirmed" && (
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedInspection.id, "Completed")
                  }
                  className="rounded-xl bg-(--dh-success) px-4 py-2.5 text-xs font-semibold text-white"
                >
                  Mark completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AgentInspections;
