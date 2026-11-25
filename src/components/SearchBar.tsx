import {
  FiSearch,
  FiMapPin,
  FiChevronDown,
  FiHome,
  FiTag,
} from "react-icons/fi";

type SearchBarProps = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  propertyType: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({
  location,
  setLocation,
  propertyType,
  setPropertyType,
  purpose,
  setPurpose,
}: SearchBarProps) {
  const fieldClass =
    "relative flex min-h-[76px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur-md transition focus-within:border-[#D6AD55] focus-within:bg-white/[0.11]";

  const labelClass = "block text-sm font-semibold text-white";
  const valueClass =
    "mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/55";

  return (
    <div className="w-full rounded-2xl border border-white/35 bg-[#172333]/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Location */}
        <div className={fieldClass}>
          <FiMapPin className="shrink-0 text-2xl text-[#E5B84F]" />

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
          <FiHome className="shrink-0 text-2xl text-white" />

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
              <option value="" className="bg-[#172333]">
                Any property
              </option>
              <option value="Apartment" className="bg-[#172333]">
                Apartment
              </option>
              <option value="Duplex" className="bg-[#172333]">
                Duplex
              </option>
              <option value="House" className="bg-[#172333]">
                House
              </option>
              <option value="Land" className="bg-[#172333]">
                Land
              </option>
            </select>

            <FiChevronDown className="pointer-events-none absolute right-0 top-8 text-white/70" />
          </div>
        </div>

        {/* Purpose */}
        <div className={fieldClass}>
          <FiTag className="shrink-0 text-2xl text-white" />

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
              <option value="" className="bg-[#172333]">
                Any purpose
              </option>
              <option value="For Sale" className="bg-[#172333]">
                For Sale
              </option>
              <option value="For Rent" className="bg-[#172333]">
                For Rent
              </option>
              <option value="Shortlet" className="bg-[#172333]">
                Shortlet
              </option>
            </select>

            <FiChevronDown className="pointer-events-none absolute right-0 top-8 text-white/70" />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="group flex min-h-19 w-full items-center justify-center gap-3 rounded-xl bg-[#D6AD55] px-5 py-4 text-base font-bold text-[#111315] transition duration-200 hover:-translate-y-0.5 hover:bg-[#E5C477] hover:shadow-lg hover:shadow-[#D6AD55]/20 active:translate-y-0"
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
