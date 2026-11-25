import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiMapPin, FiSliders, FiX } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Environment from "../components/Environment";
import PropertyCard from "../components/PropertyCard";
import CitySkylineVideo from "../assets/city-skyline.mp4";

import { useProperties } from "../context/PropertyContext";
import { useTheme } from "../context/ThemeContext";

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

  return (
    <div className="dh-page min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Environment
        video={CitySkylineVideo}
        overlay={isLight ? "bg-white/65" : "bg-[#041126]/55"}
        className="pt-32"
      >
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              DitiHomes Properties
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-(--dh-white) drop-shadow-lg sm:text-5xl lg:text-6xl">
              Find a property that feels like
              <span className="text-(--dh-gold)"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-(--dh-white) sm:text-lg">
              Explore homes, apartments, land and shortlets available across
              different locations in Nigeria.
            </p>
          </div>
        </div>
      </Environment>

      {/* Search and Filters */}
      <section className="bg-(--dh-bg) px-5 py-10 transition-colors duration-300 md:px-8 lg:px-10">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-(--dh-white) sm:text-4xl">
                Available Properties
              </h2>
            </div>

            <p className="text-sm font-medium text-(--dh-muted)">
              {filteredProperties.length}{" "}
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Properties;
