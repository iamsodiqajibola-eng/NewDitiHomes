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
  FiMaximize2,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type PropertyStatus = "Pending" | "Approved" | "Rejected";

type Property = {
  id: number;
  title: string;
  location: string;
  agent: string;
  price: string;
  category: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  date: string;
  status: PropertyStatus;
  description: string;
  address: string;
  images: number;
};

const initialProperties: Property[] = [
  {
    id: 1,
    title: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    agent: "Emmanuel Adewale",
    price: "₦185,000,000",
    category: "Sale",
    type: "Detached Duplex",
    bedrooms: 4,
    bathrooms: 5,
    size: "450 sqm",
    date: "25 Nov 2026",
    status: "Pending",
    description:
      "A modern luxury duplex with spacious rooms, fitted kitchen, private parking and contemporary finishing.",
    address: "Lekki Phase 1, Lagos",
    images: 8,
  },
  {
    id: 2,
    title: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    agent: "Blessing Okoro",
    price: "₦8,500,000 / year",
    category: "Rent",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: "180 sqm",
    date: "24 Nov 2026",
    status: "Pending",
    description:
      "A well-finished apartment in a secure residential environment with good access to major roads.",
    address: "Ikeja GRA, Lagos",
    images: 6,
  },
  {
    id: 3,
    title: "5 Bedroom Detached House",
    location: "Banana Island, Lagos",
    agent: "Samuel Ibrahim",
    price: "₦450,000,000",
    category: "Sale",
    type: "Detached House",
    bedrooms: 5,
    bathrooms: 6,
    size: "650 sqm",
    date: "22 Nov 2026",
    status: "Approved",
    description:
      "A premium detached residence with spacious living areas and modern architectural finishing.",
    address: "Banana Island, Lagos",
    images: 10,
  },
  {
    id: 4,
    title: "Serviced 2 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    agent: "Grace Adeyemi",
    price: "₦250,000 / night",
    category: "Shortlet",
    type: "Serviced Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "120 sqm",
    date: "20 Nov 2026",
    status: "Rejected",
    description:
      "A serviced shortlet apartment with modern furniture and essential guest amenities.",
    address: "Victoria Island, Lagos",
    images: 5,
  },
  {
    id: 5,
    title: "Commercial Office Space",
    location: "Yaba, Lagos",
    agent: "David Okafor",
    price: "₦12,000,000 / year",
    category: "Lease",
    type: "Commercial Property",
    bedrooms: 0,
    bathrooms: 2,
    size: "300 sqm",
    date: "19 Nov 2026",
    status: "Pending",
    description:
      "A commercial office space suitable for business operations in a central business district.",
    address: "Yaba, Lagos",
    images: 4,
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

function AdminProperties() {
  const location = useLocation();

  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const pendingCount = properties.filter(
    (property) => property.status === "Pending",
  ).length;

  const approvedCount = properties.filter(
    (property) => property.status === "Approved",
  ).length;

  const rejectedCount = properties.filter(
    (property) => property.status === "Rejected",
  ).length;

  const filteredProperties = properties.filter((property) => {
    const matchesFilter =
      activeFilter === "All" || property.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      property.title.toLowerCase().includes(searchText) ||
      property.location.toLowerCase().includes(searchText) ||
      property.agent.toLowerCase().includes(searchText) ||
      property.category.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const updatePropertyStatus = (id: number, status: PropertyStatus) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === id ? { ...property, status } : property,
      ),
    );

    setSelectedProperty(null);

    setNotice(
      status === "Approved"
        ? "Property listing approved."
        : "Property listing rejected.",
    );
  };

  const statusStyle = (status: PropertyStatus) => {
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
              <p className="text-sm font-semibold">Property Moderation</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Review every listing before it becomes publicly visible.
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
                  <FiHome size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Properties
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Property Management
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Review, verify and manage property listings.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiShield className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">
                  Listing Review Centre
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
                  title: "Pending Reviews",
                  value: pendingCount,
                  icon: FiAlertCircle,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Approved Listings",
                  value: approvedCount,
                  icon: FiCheck,
                  color: "text-(--dh-success)",
                },
                {
                  title: "Rejected Listings",
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

            {/* Listing filters */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">Property Listings</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Review property information before publication.
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
                      placeholder="Search properties..."
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

              {/* Property table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-212.5 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Agent</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProperties.map((property) => (
                      <tr
                        key={property.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold">{property.title}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-(--dh-muted)">
                            <FiMapPin size={12} />
                            {property.location}
                          </p>
                        </td>

                        <td className="px-6 py-5">{property.agent}</td>

                        <td className="px-6 py-5">
                          <span className="rounded-lg bg-(--dh-bg-secondary) px-3 py-1 text-xs">
                            {property.category}
                          </span>
                        </td>

                        <td className="px-6 py-5 font-medium">
                          {property.price}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(property.status)}`}
                          >
                            {property.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedProperty(property)}
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

                {filteredProperties.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiHome size={28} className="mx-auto text-(--dh-muted)" />
                    <p className="mt-4 font-semibold">No properties found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Review policy */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">
                    Property verification policy
                  </p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Each property must be reviewed independently. Check
                    ownership or listing authority, property details, images and
                    location information. Do not publish a listing until its
                    review is complete. Keep exact property addresses private on
                    public listings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer now stays within the main content area */}
          <Footer />
        </main>
      </div>

      {/* Property review modal */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Property listing review
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {selectedProperty.title}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-(--dh-muted)">
                  <FiMapPin size={14} />
                  {selectedProperty.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="rounded-lg border border-(--dh-border) p-2"
                aria-label="Close review"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Listing agent", selectedProperty.agent],
                ["Category", selectedProperty.category],
                ["Property type", selectedProperty.type],
                ["Price", selectedProperty.price],
                ["Public location", selectedProperty.location],
                ["Submitted", selectedProperty.date],
                ["Property size", selectedProperty.size],
                ["Submitted images", `${selectedProperty.images} images`],
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

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-3">
                <FiHome className="text-(--dh-gold)" size={18} />
                <p className="mt-2 text-lg font-bold">
                  {selectedProperty.bedrooms}
                </p>
                <p className="text-xs text-(--dh-muted)">Bedrooms</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-3">
                <FiHome className="text-(--dh-gold)" size={18} />
                <p className="mt-2 text-lg font-bold">
                  {selectedProperty.bathrooms}
                </p>
                <p className="text-xs text-(--dh-muted)">Bathrooms</p>
              </div>

              <div className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-3">
                <FiMaximize2 className="text-(--dh-gold)" size={18} />
                <p className="mt-2 text-lg font-bold">
                  {selectedProperty.size}
                </p>
                <p className="text-xs text-(--dh-muted)">Property size</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <h3 className="text-sm font-semibold">Property description</h3>
              <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                {selectedProperty.description}
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">Verification reminder</p>
                  <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                    Confirm the agent's authority to list this property and
                    verify the property information before approval. Exact
                    street addresses should not be exposed publicly.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  updatePropertyStatus(selectedProperty.id, "Rejected")
                }
                className="flex items-center gap-2 rounded-xl border border-(--dh-danger)/40 px-5 py-3 text-sm font-semibold text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
              >
                <FiX size={17} />
                Reject Listing
              </button>

              <button
                type="button"
                onClick={() =>
                  updatePropertyStatus(selectedProperty.id, "Approved")
                }
                className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <FiCheck size={17} />
                Approve Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProperties;
