import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiChevronDown,
  FiHome,
  FiTag,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

type SearchBarProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  propertyType: string;
  setPropertyType: Dispatch<SetStateAction<string>>;
  purpose: string;
  setPurpose: Dispatch<SetStateAction<string>>;
};

function SearchBar({
  location,
  setLocation,
  propertyType,
  setPropertyType,
  purpose,
  setPurpose,
}: SearchBarProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const fieldClass = `relative flex min-h-[76px] items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-md transition-all duration-300 focus-within:border-[#D6AD55] ${
    isLight
      ? "border-[#D9DCE2] bg-white/85 focus-within:bg-white"
      : "border-white/15 bg-white/[0.07] focus-within:bg-white/[0.11]"
  }`;

  const labelClass = `block text-sm font-semibold ${
    isLight ? "text-[#202226]" : "text-white"
  }`;

  const valueClass = `mt-1 w-full bg-transparent text-sm outline-none ${
    isLight
      ? "text-[#202226] placeholder:text-[#8A8F98]"
      : "text-white placeholder:text-white/55"
  }`;

  const iconClass = isLight ? "text-[#626873]" : "text-white";

  const optionClass = isLight
    ? "bg-white text-[#202226]"
    : "bg-[#172333] text-white";

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (propertyType) {
      params.set("propertyType", propertyType);
    }

    if (purpose) {
      params.set("purpose", purpose);
    }

    const query = params.toString();

    navigate(query ? `/properties?${query}` : "/properties");
  };

  return (
    <div
      className={`w-full rounded-2xl border p-3 backdrop-blur-xl transition-all duration-300 sm:p-4 ${
        isLight
          ? "border-white/70 bg-white/80 shadow-2xl shadow-black/10"
          : "border-white/35 bg-[#172333]/80 shadow-2xl shadow-black/30"
      }`}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Location */}
        <div className={fieldClass}>
          <FiMapPin className="shrink-0 text-2xl text-(--dh-gold)" />

          <div className="min-w-0 flex-1">
            <label className={labelClass} htmlFor="hero-location">
              Location
            </label>

            <input
              id="hero-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className={valueClass}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className={fieldClass}>
          <FiHome className={`shrink-0 text-2xl ${iconClass}`} />

          <div className="relative min-w-0 flex-1">
            <label className={labelClass} htmlFor="hero-property-type">
              Property Type
            </label>

            <select
              id="hero-property-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className={`${valueClass} cursor-pointer appearance-none pr-6`}
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
            </select>

            <FiChevronDown
              className={`pointer-events-none absolute right-0 top-8 ${
                isLight ? "text-[#626873]" : "text-white/70"
              }`}
            />
          </div>
        </div>

        {/* Purpose */}
        <div className={fieldClass}>
          <FiTag className={`shrink-0 text-2xl ${iconClass}`} />

          <div className="relative min-w-0 flex-1">
            <label className={labelClass} htmlFor="hero-purpose">
              Purpose
            </label>

            <select
              id="hero-purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className={`${valueClass} cursor-pointer appearance-none pr-6`}
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

            <FiChevronDown
              className={`pointer-events-none absolute right-0 top-8 ${
                isLight ? "text-[#626873]" : "text-white/70"
              }`}
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="group flex min-h-19 w-full items-center justify-center gap-3 rounded-xl bg-(--dh-gold) px-5 py-4 text-base font-bold text-[#111315] transition duration-200 hover:-translate-y-0.5 hover:bg-(--dh-gold-light) hover:shadow-lg hover:shadow-[#D6AD55]/20 active:translate-y-0"
        >
          <FiSearch
            size={21}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
