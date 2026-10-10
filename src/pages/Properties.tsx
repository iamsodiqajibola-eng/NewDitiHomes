import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiMapPin, FiSliders, FiX } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Environment from "../components/Environment";
import PropertyCard from "../components/PropertyCard";
import CitySkylineVideo from "../assets/city-skyline.mp4";

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

  return (
    <>
      <Navbar />

      <Environment
        video={CitySkylineVideo}
        overlay="bg-[#041126]/55"
        className="pt-32"
      >
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C542]">
              DitiHomes Properties
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Find a property that feels like
              <span className="text-[#F5C542]"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              Explore homes, apartments, land and shortlets available across
              different locations in Nigeria.
            </p>
          </div>
        </div>
      </Environment>

      <section className="bg-white px-5 py-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                <FiSliders size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#071A3D]">Find your property</h2>

                <p className="text-sm text-gray-500">
                  Search and filter properties based on what you need.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSearch}
              className="mb-4 rounded-xl border border-gray-200 px-4 py-3"
            >
              <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <FiSearch size={14} />
                Search
              </label>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Lekki, apartment, shortlet, duplex..."
                  className="w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-gray-400 transition hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    <FiX size={17} />
                  </button>
                )}
              </div>
            </form>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-200 px-4 py-3">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <FiMapPin size={14} />
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lagos"
                  className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-400"
                />
              </div>

              <div className="rounded-xl border border-gray-200 px-4 py-3">
                <label className="block text-xs font-medium text-gray-500">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none"
                >
                  <option value="">Any property</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Duplex">Duplex</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Office">Office</option>
                  <option value="Shop">Shop</option>
                </select>
              </div>

              <div className="rounded-xl border border-gray-200 px-4 py-3">
                <label className="block text-xs font-medium text-gray-500">
                  Purpose
                </label>

                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none"
                >
                  <option value="">Any purpose</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Shortlet">Shortlet</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleFilterSearch}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3 font-semibold text-white transition hover:bg-[#123D78]"
              >
                <FiSearch size={18} />
                Search Properties
              </button>
            </div>

            {(location || propertyType || purpose || search) && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-[#071A3D] underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-sky-50 px-5 py-16 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#071A3D] sm:text-4xl">
                Available Properties
              </h2>
            </div>

            <p className="text-sm font-medium text-gray-500">
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
            <div className="mt-10 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-lg">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-[#071A3D]">
                <FiSearch size={26} />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#071A3D]">
                No properties found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                We couldn't find a property matching your current search or
                filters. Try another location, property type or purpose.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#071A3D] transition hover:bg-[#c29f2f]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Properties;
