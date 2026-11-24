import { useState } from "react";
import {
  FiHome,
  FiPlus,
  FiDollarSign,
  FiKey,
  FiCalendar,
  FiEdit2,
  FiImage,
  FiTrash2,
  FiRotateCcw,
  FiX,
  FiAlertTriangle,
  FiArrowUpRight,
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useProperties } from "../context/PropertyContext";
import { supabase } from "../lib/supabase";
import type { Property } from "../data/properties";

function AdminDashboard() {
  const { properties, deletedProperties, deleteProperty, restoreProperty } =
    useProperties();

  const navigate = useNavigate();

  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null,
  );
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLogoutError(error.message);
      setLoggingOut(false);
      return;
    }

    navigate("/login", { replace: true });
  }

  const propertiesForSale = properties.filter(
    (property) => property.purpose === "For Sale",
  ).length;

  const propertiesForRent = properties.filter(
    (property) => property.purpose === "For Rent",
  ).length;

  const shortlets = properties.filter(
    (property) => property.purpose === "Shortlet",
  ).length;

  const stats = [
    {
      title: "Active Properties",
      value: properties.length,
      icon: <FiHome size={21} />,
      description: "Currently listed",
    },
    {
      title: "For Sale",
      value: propertiesForSale,
      icon: <FiDollarSign size={21} />,
      description: "Properties for sale",
    },
    {
      title: "For Rent",
      value: propertiesForRent,
      icon: <FiKey size={21} />,
      description: "Available rentals",
    },
    {
      title: "Shortlets",
      value: shortlets,
      icon: <FiCalendar size={21} />,
      description: "Short-stay listings",
    },
  ];

  function confirmDelete() {
    if (!propertyToDelete) return;

    deleteProperty(propertyToDelete.id);
    setPropertyToDelete(null);
  }

  return (
    <div className="min-h-screen bg-[#111315] text-[#F5F5F3]">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-30 border-b border-[#303238] bg-[#111315]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-[#60A5FA]">Diti</span>
              <span className="text-[#D6AD55]">Homes</span>
            </h1>
            <p className="mt-1 text-xs font-medium tracking-wide text-[#A6A8AD]">
              ADMINISTRATION PANEL
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link
              to="/properties"
              className="hidden items-center gap-2 rounded-xl border border-[#303238] px-4 py-3 text-sm font-semibold text-[#D0D1D2] transition hover:border-[#D6AD55] hover:text-[#E5C477] sm:flex"
            >
              <FiExternalLink size={16} />
              View Website
            </Link>

            <Link
              to="/admin/add-property"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#D6AD55] px-4 py-3 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477]"
            >
              <FiPlus size={18} />
              Add Property
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiLogOut size={17} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        {logoutError && (
          <div className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
            <p role="alert" className="text-sm text-red-400">
              Logout failed: {logoutError}
            </p>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD55]">
              Overview
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F5F3] sm:text-4xl">
              Welcome to DitiHomes
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#A6A8AD]">
              Manage your property portfolio, monitor your listings and keep
              your real estate business organised.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#A6A8AD]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Dashboard Overview
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article
              key={stat.title}
              className="group rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D6AD55]/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                  {stat.icon}
                </div>

                <span className="text-xs font-medium text-[#666970]">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-6 text-sm font-medium text-[#A6A8AD]">
                {stat.title}
              </p>

              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-3xl font-bold tabular-nums text-[#F5F5F3]">
                  {stat.value}
                </p>

                <FiArrowUpRight
                  size={18}
                  className="mb-1 text-[#D6AD55] opacity-0 transition group-hover:opacity-100"
                />
              </div>

              <p className="mt-2 text-xs text-[#777A80]">{stat.description}</p>
            </article>
          ))}
        </section>

        {/* Active Properties */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-[#303238] bg-[#1B1D20]">
          <div className="flex flex-col gap-4 border-b border-[#303238] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-[#F5F5F3]">
                  Manage Properties
                </h3>

                <span className="rounded-full border border-[#D6AD55]/20 bg-[#D6AD55]/10 px-3 py-1 text-xs font-bold text-[#D6AD55]">
                  {properties.length} Active
                </span>
              </div>

              <p className="mt-2 text-sm text-[#A6A8AD]">
                Edit, update or move properties to Deleted Properties.
              </p>
            </div>

            <Link
              to="/properties"
              className="flex w-fit items-center gap-2 text-sm font-semibold text-[#D6AD55] transition hover:text-[#E5C477]"
            >
              View public listings
              <FiArrowUpRight size={16} />
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="space-y-0">
              {properties
                .slice()
                .reverse()
                .map((property) => {
                  const imageCount = property.images?.length
                    ? property.images.length
                    : property.image
                      ? 1
                      : 0;

                  return (
                    <article
                      key={property.id}
                      className="flex flex-col gap-4 border-b border-[#303238] p-5 transition last:border-b-0 hover:bg-[#242629]/60 sm:flex-row sm:items-center sm:p-6"
                    >
                      <img
                        src={property.images?.[0] || property.image}
                        alt={property.title}
                        className="h-48 w-full shrink-0 rounded-xl border border-[#303238] object-cover sm:h-24 sm:w-32"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="wrap-break-words text-base font-bold text-[#F5F5F3]">
                          {property.title}
                        </h4>

                        <p className="mt-1 text-sm text-[#A6A8AD]">
                          {property.location}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#D6AD55]/20 bg-[#D6AD55]/10 px-3 py-1 text-xs font-semibold text-[#D6AD55]">
                            {property.purpose}
                          </span>

                          <span className="rounded-full border border-[#303238] bg-[#242629] px-3 py-1 text-xs font-medium text-[#B7B9BD]">
                            {property.type}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs text-[#858890]">
                            <FiImage size={14} />
                            {imageCount} {imageCount === 1 ? "photo" : "photos"}
                          </span>
                        </div>

                        <p className="mt-3 wrap-break-words text-base font-bold text-[#E5C477]">
                          {property.price}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:w-40">
                        <Link
                          to={`/admin/edit-property/${property.id}`}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-4 py-3 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477]"
                        >
                          <FiEdit2 size={16} />
                          Edit Property
                        </Link>

                        <button
                          type="button"
                          onClick={() => setPropertyToDelete(property)}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/60 hover:bg-red-500/10"
                        >
                          <FiTrash2 size={16} />
                          Delete Property
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#303238] bg-[#242629] text-[#D6AD55]">
                <FiHome size={30} />
              </div>

              <h4 className="mt-5 text-lg font-bold text-[#F5F5F3]">
                No active properties
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#A6A8AD]">
                Your property listings will appear here. Add your first property
                to start building your portfolio.
              </p>

              <Link
                to="/admin/add-property"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477]"
              >
                <FiPlus size={18} />
                Add Property
              </Link>
            </div>
          )}
        </section>

        {/* Deleted Properties */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-red-500/20 bg-[#1B1D20]">
          <div className="flex flex-col gap-4 border-b border-[#303238] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-[#F5F5F3]">
                  Deleted Properties
                </h3>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                  {deletedProperties.length}{" "}
                  {deletedProperties.length === 1 ? "property" : "properties"}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A6A8AD]">
                These properties are removed from public listings. You can
                restore them whenever you need to.
              </p>
            </div>
          </div>

          {deletedProperties.length > 0 ? (
            <div className="space-y-0">
              {deletedProperties.map((property) => {
                const imageCount = property.images?.length
                  ? property.images.length
                  : property.image
                    ? 1
                    : 0;

                return (
                  <article
                    key={property.id}
                    className="flex flex-col gap-4 border-b border-[#303238] bg-red-500/2 p-5 last:border-b-0 sm:flex-row sm:items-center sm:p-6"
                  >
                    <img
                      src={property.images?.[0] || property.image}
                      alt={property.title}
                      className="h-48 w-full shrink-0 rounded-xl border border-[#303238] object-cover opacity-70 sm:h-24 sm:w-32"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="wrap-break-words font-bold text-[#F5F5F3]">
                        {property.title}
                      </h4>

                      <p className="mt-1 text-sm text-[#A6A8AD]">
                        {property.location}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                          Deleted
                        </span>

                        <span className="rounded-full border border-[#303238] bg-[#242629] px-3 py-1 text-xs text-[#A6A8AD]">
                          {property.purpose}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs text-[#858890]">
                          <FiImage size={14} />
                          {imageCount} {imageCount === 1 ? "photo" : "photos"}
                        </span>
                      </div>

                      <p className="mt-3 wrap-break-words font-bold text-[#E5C477]">
                        {property.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => restoreProperty(property.id)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                    >
                      <FiRotateCcw size={17} />
                      Restore Property
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#303238] bg-[#242629] text-[#777A80]">
                <FiTrash2 size={26} />
              </div>

              <h4 className="mt-4 font-bold text-[#F5F5F3]">
                No deleted properties
              </h4>

              <p className="mt-2 text-sm text-[#A6A8AD]">
                Properties you delete will appear here, ready to restore.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {propertyToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          onClick={() => setPropertyToDelete(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-property-title"
            aria-describedby="delete-property-description"
            className="w-full max-w-md rounded-3xl border border-[#3A3C41] bg-[#1B1D20] p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
              <FiAlertTriangle size={27} />
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3
                  id="delete-property-title"
                  className="text-xl font-bold text-[#F5F5F3]"
                >
                  Delete this property?
                </h3>

                <p
                  id="delete-property-description"
                  className="mt-3 text-sm leading-7 text-[#A6A8AD]"
                >
                  You are about to remove{" "}
                  <span className="font-semibold text-[#E5C477]">
                    {propertyToDelete.title}
                  </span>{" "}
                  from your active listings. It will be saved in Deleted
                  Properties, where you can restore it later.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close confirmation"
                onClick={() => setPropertyToDelete(null)}
                className="rounded-lg p-2 text-[#858890] transition hover:bg-[#303238] hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPropertyToDelete(null)}
                className="rounded-xl border border-[#3A3C41] px-5 py-3 text-sm font-semibold text-[#D0D1D2] transition hover:bg-[#303238]"
              >
                No, Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <FiTrash2 size={17} />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
