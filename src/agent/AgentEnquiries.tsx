import { useMemo, useState } from "react";
import {
  FiSearch,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiHome,
  FiUser,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiX,
  FiSend,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

type EnquiryStatus = "New" | "Replied" | "Archived";

type Enquiry = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  property: string;
  propertyType: string;
  date: string;
  message: string;
  status: EnquiryStatus;
};

const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    customer: "Adebayo Johnson",
    email: "adebayo@example.com",
    phone: "+234 803 123 4567",
    property: "Luxury 4 Bedroom Duplex",
    propertyType: "For Sale",
    date: "Today, 10:30 AM",
    message:
      "Hello, I'm interested in this property. Is it still available? I would also like to know if the price is negotiable.",
    status: "New",
  },
  {
    id: 2,
    customer: "Maryam Ibrahim",
    email: "maryam@example.com",
    phone: "+234 806 234 5678",
    property: "Modern 3 Bedroom Apartment",
    propertyType: "For Rent",
    date: "Today, 8:15 AM",
    message:
      "Good morning. I saw this apartment and would like to schedule an inspection. Please let me know the available dates.",
    status: "New",
  },
  {
    id: 3,
    customer: "Tunde Bakare",
    email: "tunde@example.com",
    phone: "+234 809 345 6789",
    property: "Serviced 2 Bedroom Flat",
    propertyType: "Shortlet",
    date: "Yesterday",
    message:
      "I need this apartment for a five-day stay next month. Please confirm the availability and total cost.",
    status: "Replied",
  },
  {
    id: 4,
    customer: "Chioma Okafor",
    email: "chioma@example.com",
    phone: "+234 812 456 7890",
    property: "5 Bedroom Detached House",
    propertyType: "For Sale",
    date: "Nov 22, 2026",
    message:
      "Please share more details about the property, especially the location and documentation.",
    status: "Archived",
  },
];

const statusStyles: Record<EnquiryStatus, string> = {
  New: "bg-blue-500/10 text-blue-500",
  Replied: "bg-green-500/10 text-green-500",
  Archived: "bg-gray-500/10 text-gray-500",
};

export default function AgentEnquiries() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [reply, setReply] = useState("");

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const matchesSearch =
        enquiry.customer.toLowerCase().includes(search.toLowerCase()) ||
        enquiry.property.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || enquiry.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [enquiries, search, activeFilter]);

  const updateStatus = (id: number, status: EnquiryStatus) => {
    setEnquiries((previous) =>
      previous.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    setSelectedEnquiry((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );
  };

  const sendReply = () => {
    if (!selectedEnquiry || !reply.trim()) return;

    updateStatus(selectedEnquiry.id, "Replied");
    setReply("");
    setSelectedEnquiry(null);
  };

  const newCount = enquiries.filter((item) => item.status === "New").length;
  const repliedCount = enquiries.filter(
    (item) => item.status === "Replied",
  ).length;
  const archivedCount = enquiries.filter(
    (item) => item.status === "Archived",
  ).length;

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <div className="mx-auto flex max-w-[1600px] pt-24">
        <aside className="hidden w-64 shrink-0 border-r border-(--dh-border) px-5 py-8 lg:block">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-(--dh-muted)">
            Agent workspace
          </p>

          <nav className="space-y-2">
            {[
              { label: "Overview", path: "/agent" },
              { label: "My Properties", path: "/agent/properties" },
              { label: "Add Property", path: "/agent/properties/add" },
              { label: "Inspections", path: "/agent/inspections" },
              { label: "Enquiries", path: "/agent/enquiries" },
              { label: "Customers", path: "/agent/customers" },
              { label: "Settings", path: "/agent/settings" },
              { label: "Support", path: "/agent/support" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  item.label === "Enquiries"
                    ? "bg-(--dh-gold)/10 font-semibold text-(--dh-gold)"
                    : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm text-(--dh-muted)">
                Agent workspace / Enquiries
              </p>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Customer Enquiries
              </h1>
              <p className="mt-2 text-sm text-(--dh-muted)">
                Manage questions and messages about your property listings.
              </p>
            </div>

            <Link
              to="/agent/properties"
              className="inline-flex items-center gap-2 rounded-xl bg-(--dh-gold) px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              View Properties <FiArrowRight />
            </Link>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Enquiries",
                value: enquiries.length,
                icon: <FiMessageSquare />,
              },
              {
                label: "New Enquiries",
                value: newCount,
                icon: <FiClock />,
              },
              {
                label: "Replied",
                value: repliedCount,
                icon: <FiCheckCircle />,
              },
              {
                label: "Archived",
                value: archivedCount,
                icon: <FiArchive />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">
                    {stat.label}
                  </span>
                  <span className="text-lg text-(--dh-gold)">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
            <div className="flex flex-col gap-4 border-b border-(--dh-border) p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold">All Enquiries</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Review and respond to customer messages.
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer or property..."
                  className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-sm outline-none focus:border-(--dh-gold)"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-(--dh-border) px-5 py-4">
              {["All", "New", "Replied", "Archived"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? "bg-(--dh-gold) font-semibold text-black"
                      : "bg-(--dh-bg) text-(--dh-muted) hover:text-(--dh-white)"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="divide-y divide-(--dh-border)">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-(--dh-surface-hover)/50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                        <FiUser size={20} />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{enquiry.customer}</h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[enquiry.status]}`}
                          >
                            {enquiry.status}
                          </span>
                        </div>

                        <p className="truncate text-sm text-(--dh-muted)">
                          {enquiry.property}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-(--dh-muted)">
                          <span>{enquiry.propertyType}</span>
                          <span>{enquiry.date}</span>
                        </div>

                        <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-(--dh-muted)">
                          {enquiry.message}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-4 py-3 text-sm font-medium transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                    >
                      View Enquiry <FiArrowRight />
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-5 py-16 text-center">
                  <FiMessageSquare className="mx-auto mb-4 text-3xl text-(--dh-muted)" />
                  <h3 className="font-semibold">No enquiries found</h3>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Try changing your search or selected filter.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-surface) shadow-2xl">
            <div className="flex items-center justify-between border-b border-(--dh-border) p-5">
              <div>
                <h2 className="text-lg font-bold">Enquiry Details</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Customer message and contact information
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg p-2 text-(--dh-muted) hover:bg-(--dh-surface-hover)"
                aria-label="Close enquiry"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{selectedEnquiry.customer}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${statusStyles[selectedEnquiry.status]}`}
                  >
                    {selectedEnquiry.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-(--dh-muted)">
                  <p className="flex items-center gap-2">
                    <FiMail /> {selectedEnquiry.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiPhone /> {selectedEnquiry.phone}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-bg) p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <FiHome className="text-(--dh-gold)" />
                  {selectedEnquiry.property}
                </div>
                <p className="text-xs text-(--dh-muted)">
                  {selectedEnquiry.propertyType} · {selectedEnquiry.date}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Customer's Message
                </h3>
                <p className="rounded-xl bg-(--dh-bg) p-4 text-sm leading-7 text-(--dh-muted)">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Reply to Customer
                </label>
                <textarea
                  rows={4}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write your response here..."
                  className="w-full resize-none rounded-xl border border-(--dh-border) bg-(--dh-bg) p-4 text-sm outline-none focus:border-(--dh-gold)"
                />
                <p className="mt-2 text-xs text-(--dh-muted)">
                  This is a frontend demonstration. Replies are not sent to
                  customers yet.
                </p>
              </div>

              <div className="flex flex-wrap justify-between gap-3 border-t border-(--dh-border) pt-5">
                <button
                  onClick={() => {
                    updateStatus(selectedEnquiry.id, "Archived");
                    setSelectedEnquiry(null);
                  }}
                  className="rounded-xl border border-(--dh-border) px-4 py-3 text-sm text-(--dh-muted) hover:text-(--dh-white)"
                >
                  Archive
                </button>

                <div className="flex flex-wrap gap-2">
                  {selectedEnquiry.status === "New" && (
                    <button
                      onClick={() =>
                        updateStatus(selectedEnquiry.id, "Replied")
                      }
                      className="rounded-xl border border-(--dh-border) px-4 py-3 text-sm hover:border-(--dh-gold)"
                    >
                      Mark as Replied
                    </button>
                  )}

                  <button
                    onClick={sendReply}
                    disabled={!reply.trim()}
                    className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiSend /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
