import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronRight, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";

import { useProperties } from "../context/PropertyContext";

function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const { properties } = useProperties();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentLocation.pathname]);

  function normalizeText(value: string) {
    return value.toLowerCase().replace(/[₦,]/g, "").replace(/\s+/g, " ").trim();
  }

  function getSearchTerms(query: string) {
    const normalizedQuery = normalizeText(query);

    const terms = normalizedQuery.split(" ").filter((term) => term.length > 0);

    const expandedTerms = [...terms];

    if (
      normalizedQuery.includes("buy") ||
      normalizedQuery.includes("sale") ||
      normalizedQuery.includes("sell")
    ) {
      expandedTerms.push("for sale");
    }

    if (
      normalizedQuery.includes("rent") ||
      normalizedQuery.includes("rental")
    ) {
      expandedTerms.push("for rent");
    }

    if (
      normalizedQuery.includes("shortlet") ||
      normalizedQuery.includes("short let")
    ) {
      expandedTerms.push("shortlet");
    }

    return {
      normalizedQuery,
      terms,
      expandedTerms,
    };
  }

  function getMatchingProperties() {
    if (!search.trim()) {
      return [];
    }

    const { normalizedQuery, terms } = getSearchTerms(search);

    const results = properties
      .map((property) => {
        const title = normalizeText(property.title);
        const location = normalizeText(property.location);
        const type = normalizeText(property.type);
        const purpose = normalizeText(property.purpose);
        const description = normalizeText(property.description);
        const features = property.features
          .map((feature) => normalizeText(feature))
          .join(" ");

        const searchableText = `
          ${title}
          ${location}
          ${type}
          ${purpose}
          ${description}
          ${features}
          ${property.bedrooms} bedroom
          ${property.bedrooms} bedrooms
          ${property.bedrooms} bed
          ${property.bathrooms} bathroom
          ${property.bathrooms} bathrooms
          ${property.area}
        `;

        let score = 0;

        if (title.includes(normalizedQuery)) {
          score += 10;
        }

        if (location.includes(normalizedQuery)) {
          score += 10;
        }

        if (type.includes(normalizedQuery)) {
          score += 8;
        }

        if (purpose.includes(normalizedQuery)) {
          score += 8;
        }

        if (
          normalizedQuery.includes("buy") &&
          property.purpose === "For Sale"
        ) {
          score += 12;
        }

        if (
          normalizedQuery.includes("sale") &&
          property.purpose === "For Sale"
        ) {
          score += 12;
        }

        if (
          normalizedQuery.includes("rent") &&
          property.purpose === "For Rent"
        ) {
          score += 12;
        }

        if (
          normalizedQuery.includes("shortlet") &&
          property.purpose === "Shortlet"
        ) {
          score += 12;
        }

        const bedroomMatch = normalizedQuery.match(/\d+/);

        if (bedroomMatch) {
          const requestedBedrooms = Number(bedroomMatch[0]);

          if (property.bedrooms === requestedBedrooms) {
            score += 15;
          }
        }

        terms.forEach((term) => {
          if (searchableText.includes(term)) {
            score += 3;
          }
        });

        return {
          property,
          score,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    return results.slice(0, 6).map((result) => result.property);
  }

  const matchingProperties = getMatchingProperties();

  const popularSearches = [
    "Buy",
    "Rent",
    "Shortlet",
    "Apartments",
    "3 Bedrooms",
    "Lekki",
  ];

  function openProperty(propertyId: number) {
    setSearch("");
    setShowSearch(false);
    setIsMenuOpen(false);

    navigate(`/properties/${propertyId}`);
  }

  function handlePopularSearch(value: string) {
    setSearch(value);
    setShowSearch(true);
  }

  function handleSearchFocus() {
    setShowSearch(true);
  }

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setShowSearch(false);
      return;
    }

    if (event.key === "Enter" && matchingProperties.length > 0) {
      openProperty(matchingProperties[0].id);
    }
  }

  function getPurposeUrl(purpose: string) {
    return `/properties?purpose=${encodeURIComponent(purpose)}`;
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="border-b border-white/20 bg-sky-500/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            <span className="text-[#60A5FA]">Diti</span>
            <span className="text-[#F5C542]">Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            <Link
              to="/"
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              Home
            </Link>

            <Link
              to={getPurposeUrl("For Sale")}
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              Buy
            </Link>

            <Link
              to={getPurposeUrl("For Rent")}
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              Rent
            </Link>

            <Link
              to={getPurposeUrl("Shortlet")}
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              Shortlet
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-white transition hover:text-[#F5C542]"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 lg:flex">
            <div ref={searchContainerRef} className="relative">
              <div className="flex h-11 w-72 items-center rounded-xl border border-white/30 bg-white/15 px-3 backdrop-blur-md">
                <FiSearch className="mr-2 shrink-0 text-white" size={19} />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search properties..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/75"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setShowSearch(true);
                    }}
                    className="text-white/70 transition hover:text-white"
                    aria-label="Clear search"
                  >
                    <FiX size={17} />
                  </button>
                )}
              </div>

              {showSearch && (
                <SearchDropdown
                  search={search}
                  matchingProperties={matchingProperties}
                  popularSearches={popularSearches}
                  onPropertyClick={openProperty}
                  onPopularSearch={handlePopularSearch}
                />
              )}
            </div>

            <Link
              to="/login"
              className="flex h-11 items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <FiUser size={17} />
              Login
            </Link>

            <Link
              to="/signup"
              className="flex h-11 items-center rounded-xl bg-[#F5C542] px-5 text-sm font-bold text-[#071A3D] transition hover:bg-[#e6b92f]"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/20 bg-[#071A3D]/95 px-5 py-5 backdrop-blur-xl lg:hidden">
            <div className="mx-auto max-w-7xl">
              {/* Mobile Search */}
              <div ref={searchContainerRef} className="relative">
                <div className="flex h-12 items-center rounded-xl border border-white/20 bg-white/10 px-3">
                  <FiSearch className="mr-2 shrink-0 text-white" size={19} />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setShowSearch(true);
                    }}
                    onFocus={handleSearchFocus}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search properties..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setShowSearch(true);
                      }}
                      className="text-white/70"
                      aria-label="Clear search"
                    >
                      <FiX size={17} />
                    </button>
                  )}
                </div>

                {showSearch && (
                  <SearchDropdown
                    search={search}
                    matchingProperties={matchingProperties}
                    popularSearches={popularSearches}
                    onPropertyClick={openProperty}
                    onPopularSearch={handlePopularSearch}
                  />
                )}
              </div>

              {/* Mobile Links */}
              <div className="mt-5 flex flex-col">
                <Link
                  to="/"
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  Home
                </Link>

                <Link
                  to={getPurposeUrl("For Sale")}
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  Buy
                </Link>

                <Link
                  to={getPurposeUrl("For Rent")}
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  Rent
                </Link>

                <Link
                  to={getPurposeUrl("Shortlet")}
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  Shortlet
                </Link>

                <Link
                  to="/about"
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="border-b border-white/10 py-4 text-sm font-medium text-white"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 text-sm font-semibold text-white"
                >
                  <FiUser size={17} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="flex h-11 items-center justify-center rounded-xl bg-[#F5C542] text-sm font-bold text-[#071A3D]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

type SearchDropdownProps = {
  search: string;
  matchingProperties: {
    id: number;
    title: string;
    location: string;
    price: string;
    type: string;
    purpose: "For Sale" | "For Rent" | "Shortlet";
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    description: string;
    features: string[];
  }[];
  popularSearches: string[];
  onPropertyClick: (propertyId: number) => void;
  onPopularSearch: (value: string) => void;
};

function SearchDropdown({
  search,
  matchingProperties,
  popularSearches,
  onPropertyClick,
  onPopularSearch,
}: SearchDropdownProps) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
      {!search.trim() ? (
        <div className="p-4">
          <p className="px-1 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
            Popular Searches
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onPopularSearch(item)}
                className="rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-[#071A3D] transition hover:bg-sky-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : matchingProperties.length > 0 ? (
        <div>
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
              Properties
            </p>
          </div>

          <div className="max-h-105 overflow-y-auto">
            {matchingProperties.map((property) => (
              <button
                key={property.id}
                type="button"
                onClick={() => onPropertyClick(property.id)}
                className="flex w-full items-center gap-3 border-b border-gray-100 p-3 text-left transition hover:bg-sky-50"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-14 w-16 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#071A3D]">
                    {property.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {property.location}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold text-[#071A3D]">
                      {property.purpose}
                    </span>

                    {property.bedrooms > 0 && (
                      <span className="text-[10px] text-gray-500">
                        {property.bedrooms} bed
                      </span>
                    )}

                    <span className="text-[10px] font-semibold text-[#071A3D]">
                      {property.price}
                    </span>
                  </div>
                </div>

                <FiChevronRight className="shrink-0 text-gray-400" size={18} />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              onPopularSearch(search);
              window.location.href = `/properties?search=${encodeURIComponent(search)}`;
            }}
            className="flex w-full items-center justify-center border-t border-gray-100 px-4 py-3 text-xs font-bold text-[#071A3D] transition hover:bg-gray-50"
          >
            View all results
          </button>
        </div>
      ) : (
        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-[#071A3D]">
            <FiSearch size={20} />
          </div>

          <p className="mt-3 text-sm font-semibold text-[#071A3D]">
            No properties found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try a location, property type, bedroom count or purpose.
          </p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
