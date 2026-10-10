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
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProperties } from "../context/PropertyContext";
import type { Property } from "../data/properties";
function AdminDashboard() {
  const { properties, deletedProperties, deleteProperty, restoreProperty } =
    useProperties();
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null,
  );
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
      icon: <FiHome size={22} />,
    },
    {
      title: "For Sale",
      value: propertiesForSale,
      icon: <FiDollarSign size={22} />,
    },
    {
      title: "For Rent",
      value: propertiesForRent,
      icon: <FiKey size={22} />,
    },
    {
      title: "Shortlets",
      value: shortlets,
      icon: <FiCalendar size={22} />,
    },
  ];
  function confirmDelete() {
    if (!propertyToDelete) return;
    deleteProperty(propertyToDelete.id);
    setPropertyToDelete(null);
  }
  return (
    <div className="min-h-screen bg-sky-50">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-[#60A5FA]">Diti</span>
              <span className="text-[#F5C542]">Homes</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
          </div>
          <Link
            to="/admin/add-property"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#071A3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#123D78]"
          >
            <FiPlus size={18} />
            Add Property
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#071A3D]">
            Welcome to DitiHomes
          </h2>
          <p className="mt-2 text-gray-600">
            Manage your properties and keep your listings up to date.
          </p>
        </div>
        {/* Dashboard statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D]">
                {stat.icon}
              </div>
              <p className="mt-5 text-sm text-gray-500">{stat.title}</p>
              <p className="mt-1 text-3xl font-bold text-[#071A3D]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        {/* Active properties */}
        <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#071A3D]">
                Manage Properties
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Edit, update or move properties to Deleted Properties.
              </p>
            </div>
            <Link
              to="/properties"
              className="w-fit text-sm font-semibold text-[#071A3D] transition hover:text-[#D4AF37]"
            >
              View public listings
            </Link>
          </div>
          {properties.length > 0 ? (
            <div className="mt-6 space-y-4">
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
                      className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-sky-200 sm:flex-row sm:items-center"
                    >
                      <img
                        src={property.images?.[0] || property.image}
                        alt={property.title}
                        className="h-44 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-28"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="wrap-break-words font-bold text-[#071A3D]">
                          {property.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {property.location}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-[#071A3D]">
                            {property.purpose}
                          </span>
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {property.type}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <FiImage size={14} />
                            {imageCount} {imageCount === 1 ? "photo" : "photos"}
                          </span>
                        </div>
                        <p className="mt-3 wrap-break-words font-bold text-[#071A3D]">
                          {property.price}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:w-40">
                        <Link
                          to={`/admin/edit-property/${property.id}`}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#123D78]"
                        >
                          <FiEdit2 size={17} />
                          Edit Property
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPropertyToDelete(property)}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <FiTrash2 size={17} />
                          Delete Property
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-sky-50 px-5 py-12 text-center">
              <FiHome className="mx-auto text-[#071A3D]" size={32} />
              <h4 className="mt-4 font-bold text-[#071A3D]">
                No active properties
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                Add a property to start building your listings.
              </p>
              <Link
                to="/admin/add-property"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3 font-semibold text-white hover:bg-[#123D78]"
              >
                <FiPlus size={18} />
                Add Property
              </Link>
            </div>
          )}
        </section>
        {/* Deleted properties */}
        <section className="mt-8 rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-[#071A3D]">
                  Deleted Properties
                </h3>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  {deletedProperties.length}{" "}
                  {deletedProperties.length === 1 ? "property" : "properties"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                These properties are removed from public listings. You can
                restore them whenever you need to.
              </p>
            </div>
          </div>
          {deletedProperties.length > 0 ? (
            <div className="mt-6 space-y-4">
              {deletedProperties.map((property) => {
                const imageCount = property.images?.length
                  ? property.images.length
                  : property.image
                    ? 1
                    : 0;
                return (
                  <article
                    key={property.id}
                    className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/30 p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={property.images?.[0] || property.image}
                      alt={property.title}
                      className="h-44 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-28"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="wrap-break-words font-bold text-[#071A3D]">
                        {property.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {property.location}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Deleted
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          {property.purpose}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <FiImage size={14} />
                          {imageCount} {imageCount === 1 ? "photo" : "photos"}
                        </span>
                      </div>
                      <p className="mt-3 font-bold text-[#071A3D]">
                        {property.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => restoreProperty(property.id)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <FiRotateCcw size={17} />
                      Restore Property
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-gray-50 px-5 py-10 text-center">
              <FiTrash2 className="mx-auto text-gray-400" size={30} />
              <h4 className="mt-3 font-bold text-[#071A3D]">
                No deleted properties
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Properties you delete will appear here, ready to restore.
              </p>
            </div>
          )}
        </section>
      </main>
      {/* Delete confirmation modal */}
      {propertyToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A3D]/60 px-4 py-6"
          onClick={() => setPropertyToDelete(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-property-title"
            aria-describedby="delete-property-description"
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <FiAlertTriangle size={28} />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3
                  id="delete-property-title"
                  className="text-xl font-bold text-[#071A3D]"
                >
                  Are you sure you want to delete this property?
                </h3>
                <p
                  id="delete-property-description"
                  className="mt-3 text-sm leading-6 text-gray-600"
                >
                  You are about to remove{" "}
                  <span className="font-semibold text-[#071A3D]">
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
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPropertyToDelete(null)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                No, Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
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
