import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiMapPin, FiSliders, FiX } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

import { useProperties } from "../context/PropertyContext";

function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { properties } = useProperties();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [search, setSearch] = useState("");

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

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
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

  const hasActiveFilters = Boolean(
    location || propertyType || purpose || search,
  );

  return (
    <div className="dh-page">
      <Navbar />

      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-[#303238] bg-[#111315] pt-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D6AD55]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#D6AD55]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AD55]">
              DitiHomes Properties
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#F5F5F3] sm:text-5xl lg:text-6xl">
              Find a property that feels like
              <span className="text-[#D6AD55]"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A6A8AD] sm:text-lg">
              Explore homes, apartments, land and shortlets available across
              different locations in Nigeria.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#A6A8AD]">
              <span className="rounded-full border border-[#303238] bg-[#1B1D20] px-4 py-2">
                Residential Properties
              </span>
              <span className="rounded-full border border-[#303238] bg-[#1B1D20] px-4 py-2">
                Commercial Spaces
              </span>
              <span className="rounded-full border border-[#303238] bg-[#1B1D20] px-4 py-2">
                Shortlets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-[#17191C] px-5 py-12 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#303238] bg-[#1B1D20] p-5 shadow-2xl shadow-black/10 md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiSliders size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#F5F5F3]">Find your property</h2>

                <p className="mt-1 text-sm text-[#A6A8AD]">
                  Search and filter properties based on what you need.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSearch}
              className="mb-4 rounded-xl border border-[#303238] bg-[#111315] px-4 py-3 transition focus-within:border-[#D6AD55]"
            >
              <label className="flex items-center gap-2 text-xs font-medium text-[#A6A8AD]">
                <FiSearch size={14} className="text-[#D6AD55]" />
                Search
              </label>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Lekki, apartment, shortlet, duplex..."
                  className="w-full bg-transparent text-sm font-medium text-[#F5F5F3] outline-none placeholder:font-normal placeholder:text-[#777B82]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-[#777B82] transition hover:text-[#D6AD55]"
                    aria-label="Clear search"
                  >
                    <FiX size={17} />
                  </button>
                )}
              </div>
            </form>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Location */}
              <div className="rounded-xl border border-[#303238] bg-[#111315] px-4 py-3 transition focus-within:border-[#D6AD55]">
                <label className="flex items-center gap-2 text-xs font-medium text-[#A6A8AD]">
                  <FiMapPin size={14} className="text-[#D6AD55]" />
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos"
                  className="mt-2 w-full bg-transparent text-sm font-medium text-[#F5F5F3] outline-none placeholder:font-normal placeholder:text-[#777B82]"
                />
              </div>

              {/* Property Type */}
              <div className="rounded-xl border border-[#303238] bg-[#111315] px-4 py-3 transition focus-within:border-[#D6AD55]">
                <label className="block text-xs font-medium text-[#A6A8AD]">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm font-medium text-[#F5F5F3] outline-none"
                >
                  <option value="" className="bg-[#1B1D20]">
                    Any property
                  </option>
                  <option value="Apartment" className="bg-[#1B1D20]">
                    Apartment
                  </option>
                  <option value="Duplex" className="bg-[#1B1D20]">
                    Duplex
                  </option>
                  <option value="House" className="bg-[#1B1D20]">
                    House
                  </option>
                  <option value="Land" className="bg-[#1B1D20]">
                    Land
                  </option>
                  <option value="Office" className="bg-[#1B1D20]">
                    Office
                  </option>
                  <option value="Shop" className="bg-[#1B1D20]">
                    Shop
                  </option>
                </select>
              </div>

              {/* Purpose */}
              <div className="rounded-xl border border-[#303238] bg-[#111315] px-4 py-3 transition focus-within:border-[#D6AD55]">
                <label className="block text-xs font-medium text-[#A6A8AD]">
                  Purpose
                </label>

                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm font-medium text-[#F5F5F3] outline-none"
                >
                  <option value="" className="bg-[#1B1D20]">
                    Any purpose
                  </option>
                  <option value="For Sale" className="bg-[#1B1D20]">
                    For Sale
                  </option>
                  <option value="For Rent" className="bg-[#1B1D20]">
                    For Rent
                  </option>
                  <option value="Shortlet" className="bg-[#1B1D20]">
                    Shortlet
                  </option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleFilterSearch}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 font-bold text-[#111315] transition hover:bg-[#E5C477]"
              >
                <FiSearch size={18} />
                Search Properties
              </button>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D6AD55] transition hover:text-[#E5C477]"
              >
                <FiX size={15} />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Available Properties */}
      <section className="bg-[#111315] px-5 py-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AD55]">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F5F3] sm:text-4xl">
                Available Properties
              </h2>

              <p className="mt-3 text-sm text-[#A6A8AD]">
                Discover a place that matches your lifestyle.
              </p>
            </div>

            <p className="text-sm font-medium text-[#A6A8AD]">
              <span className="font-bold text-[#D6AD55]">
                {filteredProperties.length}
              </span>{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}{" "}
              found
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-[#303238] bg-[#1B1D20] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiSearch size={26} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#F5F5F3]">
                No properties found
              </h3>

              <p className="mx-auto mt-3 max-w-md leading-7 text-[#A6A8AD]">
                We couldn't find a property matching your current search or
                filters. Try another location, property type or purpose.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-[#D6AD55] px-6 py-3 font-bold text-[#111315] transition hover:bg-[#E5C477]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Properties;
