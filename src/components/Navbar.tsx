import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";

import { useProperties } from "../context/PropertyContext";
import type { Property } from "../data/properties";
import { supabase } from "../lib/supabase";

function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { properties } = useProperties();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const accountMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check the current session and listen for authentication changes.
  useEffect(() => {
    let isMounted = true;

    async function updateUserSession(userId: string | null, email = "") {
      if (!userId) {
        if (isMounted) {
          setIsLoggedIn(false);
          setUserRole(null);
          setUserEmail("");
          setIsAccountMenuOpen(false);
        }
        return;
      }

      if (isMounted) {
        setIsLoggedIn(true);
        setUserEmail(email);
        setUserRole(null);
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("Unable to retrieve user role:", error);
          return;
        }

        if (isMounted) {
          setUserRole(data?.role ?? "user");
        }
      } catch (error) {
        console.error("Role lookup failed:", error);
      }
    }

    async function checkSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        await updateUserSession(
          session?.user.id ?? null,
          session?.user.email ?? "",
        );
      } catch (error) {
        console.error("Unable to check login session:", error);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void updateUserSession(
        session?.user.id ?? null,
        session?.user.email ?? "",
      );

      if (isMounted) {
        setIsAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Close dropdowns when clicking outside them.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedDesktopSearch = desktopSearchRef.current?.contains(target);

      const clickedMobileSearch = mobileSearchRef.current?.contains(target);

      const clickedAccountMenu = accountMenuRefs.current.some((menu) =>
        menu?.contains(target),
      );

      if (!clickedDesktopSearch && !clickedMobileSearch) {
        setShowSearch(false);
      }

      if (!clickedAccountMenu) {
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus after navigation.
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearch(false);
    setIsAccountMenuOpen(false);
  }, [currentLocation.pathname]);

  // Logout.
  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        console.error("Logout failed:", error);
        alert(`Unable to log out: ${error.message}`);
        return;
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session verification failed:", sessionError);
        alert("Unable to verify logout. Please try again.");
        return;
      }

      if (session) {
        console.error("Session still exists after logout:", session);
        alert("Your session is still active. Please try again.");
        return;
      }

      setIsLoggedIn(false);
      setUserRole(null);
      setUserEmail("");
      setIsAccountMenuOpen(false);
      setIsMenuOpen(false);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong while logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  function normalizeText(value: string) {
    return value.toLowerCase().replace(/[₦,]/g, "").replace(/\s+/g, " ").trim();
  }

  function getSearchTerms(query: string) {
    const normalizedQuery = normalizeText(query);
    const terms = normalizedQuery.split(" ").filter(Boolean);

    return { normalizedQuery, terms };
  }

  function getMatchingProperties(): Property[] {
    if (!search.trim()) return [];

    const { normalizedQuery, terms } = getSearchTerms(search);

    return properties
      .map((property) => {
        const title = normalizeText(property.title);
        const location = normalizeText(property.location);
        const type = normalizeText(property.type);
        const purpose = normalizeText(property.purpose);
        const description = normalizeText(property.description);

        const features = (property.features || []).map(normalizeText).join(" ");

        const searchableText = `
          ${title} ${location} ${type} ${purpose}
          ${description} ${features}
          ${property.bedrooms} bedroom
          ${property.bedrooms} bedrooms
          ${property.bedrooms} bed
          ${property.bathrooms} bathroom
          ${property.bathrooms} bathrooms
          ${property.area}
        `;

        let score = 0;

        if (title.includes(normalizedQuery)) score += 10;
        if (location.includes(normalizedQuery)) score += 10;
        if (type.includes(normalizedQuery)) score += 8;
        if (purpose.includes(normalizedQuery)) score += 8;

        if (
          (normalizedQuery.includes("buy") ||
            normalizedQuery.includes("sale")) &&
          purpose.includes("sale")
        ) {
          score += 12;
        }

        if (normalizedQuery.includes("rent") && purpose.includes("rent")) {
          score += 12;
        }

        if (
          normalizedQuery.includes("shortlet") ||
          normalizedQuery.includes("short let")
        ) {
          if (purpose.includes("shortlet")) score += 12;
        }

        const bedroomMatch = normalizedQuery.match(/\d+/);

        if (bedroomMatch) {
          const requestedBedrooms = Number(bedroomMatch[0]);

          if (property.bedrooms === requestedBedrooms) {
            score += 15;
          }
        }

        terms.forEach((term) => {
          if (searchableText.includes(term)) score += 3;
        });

        return { property, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((result) => result.property);
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

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setShowSearch(false);
      return;
    }

    if (event.key === "Enter") {
      if (matchingProperties.length > 0) {
        openProperty(matchingProperties[0].id);
      } else if (search.trim()) {
        setShowSearch(false);
        navigate(`/properties?search=${encodeURIComponent(search)}`);
      }
    }
  }

  function getPurposeUrl(purpose: string) {
    return `/properties?purpose=${encodeURIComponent(purpose)}`;
  }

  const navLinkClass =
    "text-sm font-medium text-[#E6E6E3] transition-colors duration-200 hover:text-[#D6AD55]";

  // Shared account menu for desktop and mobile.
  function AccountMenu({ menuIndex }: { menuIndex: number }) {
    if (isAuthLoading) {
      return (
        <div className="h-11 w-11 animate-pulse rounded-xl border border-[#41444A] bg-[#242629]" />
      );
    }

    return (
      <div
        ref={(element) => {
          accountMenuRefs.current[menuIndex] = element;
        }}
        className="relative"
      >
        <button
          type="button"
          onClick={() => setIsAccountMenuOpen((open) => !open)}
          aria-label="Open account menu"
          aria-expanded={isAccountMenuOpen}
          aria-haspopup="true"
          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
            isAccountMenuOpen
              ? "border-[#D6AD55] bg-[#D6AD55]/10 text-[#D6AD55]"
              : "border-[#41444A] bg-[#242629] text-[#F5F5F3] hover:border-[#D6AD55] hover:text-[#D6AD55]"
          }`}
        >
          <FiUser size={20} />
        </button>

        {isAccountMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+12px)] z-120 w-64 overflow-hidden rounded-2xl border border-[#41444A] bg-[#1B1D20] shadow-2xl shadow-black/40">
            {isLoggedIn ? (
              <>
                <div className="border-b border-[#303238] px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#A6A8AD]">
                    My Account
                  </p>

                  <p className="mt-2 truncate text-sm font-semibold text-[#F5F5F3]">
                    {userEmail || "Signed in"}
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-[#D6AD55]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D6AD55]">
                    {userRole === "admin" ? "Administrator" : "Customer"}
                  </span>
                </div>

                <div className="p-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#E6E6E3] transition hover:bg-[#242629] hover:text-[#D6AD55]"
                  >
                    <FiUser size={17} />
                    My Profile
                  </Link>

                  {userRole === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#D6AD55] transition hover:bg-[#242629]"
                    >
                      <FiGrid size={17} />
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="my-2 border-t border-[#303238]" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiLogOut size={17} />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-[#303238] px-4 py-4">
                  <p className="text-sm font-bold text-[#F5F5F3]">
                    Welcome to DitiHomes
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-[#A6A8AD]">
                    Sign in or create an account to get started.
                  </p>
                </div>

                <div className="flex flex-col gap-2 p-3">
                  <Link
                    to="/login"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#41444A] px-4 text-sm font-semibold text-[#F5F5F3] transition hover:border-[#D6AD55] hover:text-[#D6AD55]"
                  >
                    <FiUser size={17} />
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="flex h-11 items-center justify-center rounded-xl bg-[#D6AD55] px-4 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477]"
                  >
                    Create Account
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="border-b border-white/8 bg-[#111315]/90 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight sm:text-3xl"
          >
            <span className="text-[#60A5FA]">Diti</span>
            <span className="text-[#D6AD55]">Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-7">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            <Link to={getPurposeUrl("For Sale")} className={navLinkClass}>
              Buy
            </Link>

            <Link to={getPurposeUrl("For Rent")} className={navLinkClass}>
              Rent
            </Link>

            <Link to={getPurposeUrl("Shortlet")} className={navLinkClass}>
              Shortlet
            </Link>

            <Link to="/about" className={navLinkClass}>
              About
            </Link>

            <Link to="/contact" className={navLinkClass}>
              Contact
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-3 lg:flex">
            <div ref={desktopSearchRef} className="relative">
              <div className="flex h-11 w-64 items-center rounded-xl border border-[#41444A] bg-[#242629] px-3 transition focus-within:border-[#D6AD55] xl:w-72">
                <FiSearch className="mr-2 shrink-0 text-[#D6AD55]" size={19} />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search properties..."
                  aria-label="Search properties"
                  className="w-full min-w-0 bg-transparent text-sm text-[#F5F5F3] outline-none placeholder:text-[#858990]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setShowSearch(true);
                    }}
                    className="shrink-0 text-[#A6A8AD] transition hover:text-white"
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
                  onViewAll={() => {
                    setShowSearch(false);
                    navigate(
                      `/properties?search=${encodeURIComponent(search)}`,
                    );
                  }}
                />
              )}
            </div>

            <AccountMenu menuIndex={0} />
          </div>

          {/* Mobile Controls */}
          <div className="flex min-w-0 max-w-65 flex-1 items-center justify-end gap-2 lg:hidden">
            <div ref={mobileSearchRef} className="relative min-w-0 flex-1">
              <div className="flex h-10 w-full items-center rounded-xl border border-[#41444A] bg-[#242629] px-2 transition focus-within:border-[#D6AD55] sm:px-3">
                <FiSearch
                  className="mr-1.5 shrink-0 text-[#D6AD55] sm:mr-2"
                  size={18}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search..."
                  aria-label="Search properties"
                  className="w-full min-w-0 bg-transparent text-base text-[#F5F5F3] outline-none placeholder:text-[#858990] sm:text-sm"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setShowSearch(true);
                    }}
                    className="ml-1 shrink-0 text-[#A6A8AD] hover:text-white"
                    aria-label="Clear search"
                  >
                    <FiX size={16} />
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
                  onViewAll={() => {
                    setShowSearch(false);
                    navigate(
                      `/properties?search=${encodeURIComponent(search)}`,
                    );
                  }}
                  mobile
                />
              )}
            </div>

            {/* Profile icon and mobile menu */}
            <AccountMenu menuIndex={1} />

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#41444A] bg-[#242629] text-[#D6AD55] transition hover:border-[#D6AD55]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/8 bg-[#17191C]/98 px-5 py-5 backdrop-blur-xl lg:hidden">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col">
                {[
                  { label: "Home", to: "/" },
                  { label: "Buy", to: getPurposeUrl("For Sale") },
                  { label: "Rent", to: getPurposeUrl("For Rent") },
                  { label: "Shortlet", to: getPurposeUrl("Shortlet") },
                  { label: "About", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="border-b border-white/[0.07] py-4 text-sm font-medium text-[#E6E6E3] transition hover:text-[#D6AD55]"
                  >
                    {item.label}
                  </Link>
                ))}
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
  matchingProperties: Property[];
  popularSearches: string[];
  onPropertyClick: (propertyId: number) => void;
  onPopularSearch: (value: string) => void;
  onViewAll: () => void;
  mobile?: boolean;
};

function SearchDropdown({
  search,
  matchingProperties,
  popularSearches,
  onPropertyClick,
  onPopularSearch,
  onViewAll,
  mobile = false,
}: SearchDropdownProps) {
  const panelClass = mobile
    ? "fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+110px)] z-[100] mx-auto max-h-[calc(100dvh-140px)] w-auto max-w-[420px] translate-x-0 overflow-hidden rounded-2xl border border-[#41444A] bg-[#1B1D20] shadow-2xl shadow-black/50"
    : "absolute left-0 right-0 top-[calc(100%+10px)] z-[100] overflow-hidden rounded-2xl border border-[#41444A] bg-[#1B1D20] shadow-2xl shadow-black/50";

  return (
    <div className={panelClass}>
      {!search.trim() ? (
        <div className="p-4">
          <p className="px-1 text-xs font-bold uppercase tracking-[0.15em] text-[#A6A8AD]">
            Popular Searches
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onPopularSearch(item)}
                className="rounded-full border border-[#41444A] bg-[#242629] px-3 py-2 text-xs font-semibold text-[#E6E6E3] transition hover:border-[#D6AD55] hover:text-[#D6AD55]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : matchingProperties.length > 0 ? (
        <div>
          <div className="border-b border-[#303238] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A6A8AD]">
              Properties
            </p>
          </div>

          <div className="max-h-[min(420px,55dvh)] overflow-y-auto">
            {matchingProperties.map((property) => (
              <button
                key={property.id}
                type="button"
                onClick={() => onPropertyClick(property.id)}
                className="flex w-full items-center gap-3 border-b border-[#303238] p-3 text-left transition hover:bg-[#242629]"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-14 w-16 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#F5F5F3]">
                    {property.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#A6A8AD]">
                    {property.location}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#D6AD55]/15 px-2 py-1 text-[10px] font-semibold text-[#D6AD55]">
                      {property.purpose}
                    </span>

                    {property.bedrooms > 0 && (
                      <span className="text-[10px] text-[#A6A8AD]">
                        {property.bedrooms} bed
                      </span>
                    )}

                    <span className="text-[10px] font-semibold text-[#E5C477]">
                      {property.price}
                    </span>
                  </div>
                </div>

                <FiChevronRight className="shrink-0 text-[#A6A8AD]" size={18} />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="flex w-full items-center justify-center border-t border-[#303238] px-4 py-3 text-xs font-bold text-[#D6AD55] transition hover:bg-[#242629]"
          >
            View all results
            <FiChevronRight size={15} className="ml-1" />
          </button>
        </div>
      ) : (
        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#242629] text-[#D6AD55]">
            <FiSearch size={20} />
          </div>

          <p className="mt-3 text-sm font-semibold text-[#F5F5F3]">
            No properties found
          </p>

          <p className="mt-1 text-xs text-[#A6A8AD]">
            Try a location, property type, bedroom count or purpose.
          </p>

          <button
            type="button"
            onClick={onViewAll}
            className="mt-4 text-xs font-semibold text-[#D6AD55] hover:text-[#E5C477]"
          >
            Search all listings
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
