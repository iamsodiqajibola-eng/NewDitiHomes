import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiMapPin,
  FiDroplet,
  FiMaximize2,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiHome,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiGrid,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type PropertyStatus = "Approved" | "Pending" | "Rejected";

type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  status: PropertyStatus;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Luxury 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦180,000,000",
    type: "For Sale",
    category: "Duplex",
    bedrooms: 4,
    bathrooms: 5,
    size: "450 sqm",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
  },
  {
    id: 2,
    title: "Modern 3 Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    price: "₦8,500,000 / year",
    type: "For Rent",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    size: "180 sqm",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
  },
  {
    id: 3,
    title: "Contemporary 5 Bedroom Mansion",
    location: "Banana Island, Lagos",
    price: "₦450,000,000",
    type: "For Sale",
    category: "Detached House",
    bedrooms: 5,
    bathrooms: 6,
    size: "650 sqm",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
  },
  {
    id: 4,
    title: "Serviced 2 Bedroom Shortlet",
    location: "Victoria Island, Lagos",
    price: "₦180,000 / night",
    type: "Shortlet",
    category: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: "120 sqm",
    status: "Rejected",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
  },
];

const statusStyles: Record<PropertyStatus, string> = {
  Approved: "bg-(--dh-success)/10 text-(--dh-success) border-(--dh-success)/20",
  Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Rejected: "bg-(--dh-danger)/10 text-(--dh-danger) border-(--dh-danger)/20",
};

function AgentProperties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || property.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const approvedCount = properties.filter(
    (property) => property.status === "Approved",
  ).length;

  const pendingCount = properties.filter(
    (property) => property.status === "Pending",
  ).length;

  const rejectedCount = properties.filter(
    (property) => property.status === "Rejected",
  ).length;

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
                className="flex items-center gap-3 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 px-4 py-3 text-sm font-semibold text-(--dh-gold)"
              >
                <FiHome size={18} />
                My Properties
              </Link>

              <Link
                to="/agent/inspections"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-(--dh-muted) transition hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
              >
                <FiClock size={18} />
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
                <FiHome size={18} />
                Customers
              </Link>
            </nav>

            <div className="mt-auto rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                <FiCheckCircle size={20} />
              </div>

              <h3 className="text-sm font-semibold">Need assistance?</h3>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Contact our support team if you need help managing your
                listings.
              </p>

              <Link
                to="/agent/support"
                className="mt-4 inline-flex text-xs font-semibold text-(--dh-gold) hover:underline"
              >
                Contact support
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-(--dh-muted)">
                  <Link to="/agent" className="hover:text-(--dh-gold)">
                    Dashboard
                  </Link>
                  <span>/</span>
                  <span className="text-(--dh-gold)">My Properties</span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  My Properties
                </h1>

                <p className="mt-2 text-sm text-(--dh-muted)">
                  Manage your property listings and monitor their review status.
                </p>
              </div>

              <Link
                to="/agent/properties/add"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <FiPlus size={18} />
                Add New Property
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">
                    Total listings
                  </span>
                  <FiHome className="text-(--dh-gold)" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{properties.length}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  All submitted properties
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">Approved</span>
                  <FiCheckCircle className="text-(--dh-success)" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{approvedCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Live property listings
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">
                    Under review
                  </span>
                  <FiClock className="text-amber-500" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{pendingCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Awaiting admin approval
                </p>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">Rejected</span>
                  <FiXCircle className="text-(--dh-danger)" size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold">{rejectedCount}</p>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Require your attention
                </p>
              </div>
            </div>

            {/* Search and filters */}
            <div className="mt-9 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4 sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                  <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by property or location..."
                    className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-sm text-(--dh-white) outline-none transition placeholder:text-(--dh-muted) focus:border-(--dh-gold)"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 flex items-center gap-2 text-xs text-(--dh-muted)">
                    <FiFilter size={15} />
                    Status:
                  </span>

                  {["All", "Approved", "Pending", "Rejected"].map((filter) => (
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
                  ))}
                </div>
              </div>
            </div>

            {/* Property cards */}
            <div className="mt-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Your listings
                  <span className="ml-2 text-sm font-normal text-(--dh-muted)">
                    ({filteredProperties.length})
                  </span>
                </h2>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {filteredProperties.map((property) => (
                    <article
                      key={property.id}
                      className="group overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface) transition hover:border-(--dh-gold)/40"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                          {property.type}
                        </span>

                        <span
                          className={`absolute right-4 top-4 rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusStyles[property.status]}`}
                        >
                          {property.status}
                        </span>

                        <div className="absolute bottom-4 right-4">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === property.id ? null : property.id,
                              )
                            }
                            aria-label={`Actions for ${property.title}`}
                            className="rounded-lg bg-black/70 p-2 text-white backdrop-blur transition hover:bg-black"
                          >
                            <FiMoreVertical size={18} />
                          </button>

                          {openMenu === property.id && (
                            <div className="absolute right-0 top-11 z-20 w-40 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-2 shadow-xl">
                              <button
                                type="button"
                                onClick={() => setOpenMenu(null)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-(--dh-white) hover:bg-(--dh-surface-hover)"
                              >
                                <FiEye size={14} />
                                View details
                              </button>
                              <button
                                type="button"
                                onClick={() => setOpenMenu(null)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-(--dh-white) hover:bg-(--dh-surface-hover)"
                              >
                                <FiEdit2 size={14} />
                                Edit listing
                              </button>
                              <button
                                type="button"
                                onClick={() => setOpenMenu(null)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-(--dh-danger) hover:bg-(--dh-surface-hover)"
                              >
                                <FiTrash2 size={14} />
                                Remove listing
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-xl font-bold text-(--dh-gold)">
                          {property.price}
                        </p>

                        <h3 className="mt-2 text-base font-semibold">
                          {property.title}
                        </h3>

                        <p className="mt-2 flex items-center gap-2 text-xs text-(--dh-muted)">
                          <FiMapPin size={14} className="shrink-0" />
                          {property.location}
                        </p>

                        <div className="my-5 flex flex-wrap items-center gap-4 border-y border-(--dh-border) py-4 text-xs text-(--dh-muted)">
                          <span className="flex items-center gap-2">
                            <FiHome size={15} />
                            {property.bedrooms} Beds
                          </span>

                          <span className="flex items-center gap-2">
                            <FiDroplet size={15} />
                            {property.bathrooms} Baths
                          </span>

                          <span className="flex items-center gap-2">
                            <FiMaximize2 size={15} />
                            {property.size}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-(--dh-muted)">
                            {property.category}
                          </span>

                          <span
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusStyles[property.status]}`}
                          >
                            {property.status}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-(--dh-border) bg-(--dh-surface) px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiHome size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    No properties found
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm text-(--dh-muted)">
                    Try another search term or change the status filter to find
                    your listings.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("All");
                    }}
                    className="mt-5 text-sm font-semibold text-(--dh-gold) hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AgentProperties;
