import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiSliders,
  FiX,
  FiList,
  FiMap,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import PropertyMap from "../components/PropertyMap";

import { useProperties } from "../context/PropertyContext";
import { useTheme } from "../context/ThemeContext";

type ViewMode = "list" | "map";

function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { properties } = useProperties();
  const { theme } = useTheme();

  const isLight = theme === "light";

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const purposeFromUrl = searchParams.get("purpose");
    const searchFromUrl = searchParams.get("search");

    if (
      purposeFromUrl === "For Sale" ||
      purposeFromUrl === "For Rent" ||
      purposeFromUrl === "Shortlet"
    ) {
      setPurpose(purposeFromUrl);
    } else {
      setPurpose("");
    }

    setSearch(searchFromUrl || "");
  }, [searchParams]);

  const filteredProperties = properties.filter((property) => {
    const searchText = search.toLowerCase().trim();

    const searchableText = [
      property.title,
      property.location,
      property.type,
      property.purpose,
      property.description,
      ...property.features,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchText === "" || searchableText.includes(searchText);

    const matchesLocation = property.location
      .toLowerCase()
      .includes(location.toLowerCase().trim());

    const matchesType = propertyType === "" || property.type === propertyType;

    const matchesPurpose = purpose === "" || property.purpose === purpose;

    return matchesSearch && matchesLocation && matchesType && matchesPurpose;
  });

  function clearFilters() {
    setLocation("");
    setPropertyType("");
    setPurpose("");
    setSearch("");

    navigate("/properties");
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (purpose) {
      params.set("purpose", purpose);
    }

    const query = params.toString();

    navigate(query ? `/properties?${query}` : "/properties");
  }

  function handleFilterSearch() {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (purpose) {
      params.set("purpose", purpose);
    }

    const query = params.toString();

    navigate(query ? `/properties?${query}` : "/properties");
  }

  const fieldClass =
    "w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) px-4 py-3 text-sm font-semibold text-(--dh-white) outline-none transition focus:border-(--dh-gold)";

  const inputClass =
    "w-full bg-transparent text-sm font-semibold text-(--dh-white) outline-none placeholder:font-normal placeholder:text-(--dh-muted)";

  const optionClass = isLight
    ? "bg-white text-[#202226]"
    : "bg-[#1B1D20] text-white";

  const viewButtonClass = (mode: ViewMode) =>
    `flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
      viewMode === mode
        ? "bg-(--dh-gold) text-[#111315]"
        : "bg-(--dh-bg-secondary) text-(--dh-muted) hover:text-(--dh-white)"
    }`;

  return (
    <div className="dh-page min-h-screen">
      <Navbar />

      {/* Search and Filters */}
      <section className="bg-(--dh-bg) px-5 pb-10 pt-28 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-5 shadow-xl transition-colors duration-300 md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
                <FiSliders size={20} />
              </div>

              <div>
                <h2 className="font-bold text-(--dh-white)">
                  Find your property
                </h2>

                <p className="text-sm text-(--dh-muted)">
                  Search and filter properties based on what you need.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <form
              onSubmit={handleSearch}
              className="mb-4 rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) px-4 py-3"
            >
              <label className="flex items-center gap-2 text-xs font-medium text-(--dh-muted)">
                <FiSearch size={14} />
                Search
              </label>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Lekki, apartment, shortlet, duplex..."
                  className={inputClass}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-(--dh-muted) transition hover:text-(--dh-white)"
                    aria-label="Clear search"
                  >
                    <FiX size={17} />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Fields */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Location */}
              <div className={fieldClass}>
                <label className="flex items-center gap-2 text-xs font-medium text-(--dh-muted)">
                  <FiMapPin size={14} />
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos"
                  className={`${inputClass} mt-2`}
                />
              </div>

              {/* Property Type */}
              <div className={fieldClass}>
                <label className="block text-xs font-medium text-(--dh-muted)">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className={`${inputClass} mt-2 cursor-pointer`}
                >
                  <option value="" className={optionClass}>
                    Any property
                  </option>
                  <option value="Apartment" className={optionClass}>
                    Apartment
                  </option>
                  <option value="Duplex" className={optionClass}>
                    Duplex
                  </option>
                  <option value="House" className={optionClass}>
                    House
                  </option>
                  <option value="Land" className={optionClass}>
                    Land
                  </option>
                  <option value="Office" className={optionClass}>
                    Office
                  </option>
                  <option value="Shop" className={optionClass}>
                    Shop
                  </option>
                </select>
              </div>

              {/* Purpose */}
              <div className={fieldClass}>
                <label className="block text-xs font-medium text-(--dh-muted)">
                  Purpose
                </label>

                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`${inputClass} mt-2 cursor-pointer`}
                >
                  <option value="" className={optionClass}>
                    Any purpose
                  </option>
                  <option value="For Sale" className={optionClass}>
                    For Sale
                  </option>
                  <option value="For Rent" className={optionClass}>
                    For Rent
                  </option>
                  <option value="Shortlet" className={optionClass}>
                    Shortlet
                  </option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleFilterSearch}
                className="flex items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 font-semibold text-[#111315] transition hover:bg-(--dh-gold-light)"
              >
                <FiSearch size={18} />
                Search Properties
              </button>
            </div>

            {(location || propertyType || purpose || search) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-(--dh-gold) underline underline-offset-4 transition hover:opacity-75"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Available Properties */}
      <section className="bg-(--dh-bg-secondary) px-5 py-16 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-(--dh-white) sm:text-4xl">
                Available Properties
              </h2>

              <p className="mt-2 text-sm font-medium text-(--dh-muted)">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "property" : "properties"}{" "}
                found
              </p>
            </div>

            {/* List / Map Toggle */}
            <div className="flex w-full gap-2 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-2 sm:w-auto">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`${viewButtonClass("list")} flex-1 sm:flex-none`}
                aria-pressed={viewMode === "list"}
              >
                <FiList size={17} />
                List View
              </button>

              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`${viewButtonClass("map")} flex-1 sm:flex-none`}
                aria-pressed={viewMode === "map"}
              >
                <FiMap size={17} />
                Map View
              </button>
            </div>
          </div>

          {/* List View */}
          {viewMode === "list" && (
            <>
              {filteredProperties.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="mt-10 rounded-3xl border border-(--dh-border) bg-(--dh-surface) px-6 py-16 text-center shadow-lg transition-colors duration-300">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiSearch size={26} />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-(--dh-white)">
                    No properties found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-(--dh-muted)">
                    We couldn't find a property matching your current search or
                    filters. Try another location, property type or purpose.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-xl bg-(--dh-gold) px-6 py-3 font-semibold text-[#111315] transition hover:bg-(--dh-gold-light)"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* Map View */}
          {viewMode === "map" && (
            <div className="mt-10">
              {filteredProperties.length > 0 ? (
                <>
                  {/* Desktop: Property Cards + Map */}
                  <div className="hidden gap-6 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="grid max-h-162.5 grid-cols-1 gap-5 overflow-y-auto pr-2 xl:grid-cols-2">
                      {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>

                    <div className="min-w-0">
                      <div className="sticky top-24">
                        <PropertyMap
                          properties={filteredProperties}
                          height="650px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile and Tablet: Map Only */}
                  <div className="lg:hidden">
                    <PropertyMap
                      properties={filteredProperties}
                      height="520px"
                    />

                    <p className="mt-3 text-xs text-(--dh-muted)">
                      Switch to List View to browse property cards.
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) px-6 py-16 text-center shadow-lg">
                  <FiMapPin className="mx-auto text-(--dh-gold)" size={30} />

                  <h3 className="mt-5 text-2xl font-bold text-(--dh-white)">
                    No properties to display
                  </h3>

                  <p className="mt-3 text-sm text-(--dh-muted)">
                    Try changing your search or filters to find available
                    properties.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-xl bg-(--dh-gold) px-6 py-3 font-semibold text-[#111315] transition hover:bg-(--dh-gold-light)"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Properties;
