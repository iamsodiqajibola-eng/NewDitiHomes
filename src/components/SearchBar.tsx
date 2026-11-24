import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";

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
  return (
    <div className="w-full rounded-2xl border border-[#303238] bg-[#1B1D20] p-3 shadow-2xl shadow-black/20 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Location */}
        <div className="rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 transition-all duration-200 focus-within:border-[#D6AD55] focus-within:ring-2 focus-within:ring-[#D6AD55]/10">
          <label className="flex items-center gap-2 text-xs font-medium text-[#A6A8AD]">
            <FiMapPin size={14} className="text-[#D6AD55]" />
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="mt-2 w-full bg-transparent text-sm font-semibold text-[#F5F5F3] outline-none placeholder:font-normal placeholder:text-[#777B82]"
          />
        </div>

        {/* Property Type */}
        <div className="rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 transition-all duration-200 focus-within:border-[#D6AD55] focus-within:ring-2 focus-within:ring-[#D6AD55]/10">
          <label className="block text-xs font-medium text-[#A6A8AD]">
            Property Type
          </label>

          <div className="relative mt-2">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent pr-7 text-sm font-semibold text-[#F5F5F3] outline-none"
            >
              <option value="" className="bg-[#242629]">
                Any property
              </option>
              <option value="Apartment" className="bg-[#242629]">
                Apartment
              </option>
              <option value="Duplex" className="bg-[#242629]">
                Duplex
              </option>
              <option value="House" className="bg-[#242629]">
                House
              </option>
              <option value="Land" className="bg-[#242629]">
                Land
              </option>
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#A6A8AD]"
            />
          </div>
        </div>

        {/* Purpose */}
        <div className="rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 transition-all duration-200 focus-within:border-[#D6AD55] focus-within:ring-2 focus-within:ring-[#D6AD55]/10">
          <label className="block text-xs font-medium text-[#A6A8AD]">
            Purpose
          </label>

          <div className="relative mt-2">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent pr-7 text-sm font-semibold text-[#F5F5F3] outline-none"
            >
              <option value="" className="bg-[#242629]">
                Any purpose
              </option>
              <option value="For Sale" className="bg-[#242629]">
                For Sale
              </option>
              <option value="For Rent" className="bg-[#242629]">
                For Rent
              </option>
              <option value="Shortlet" className="bg-[#242629]">
                Shortlet
              </option>
            </select>

            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#A6A8AD]"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="group flex min-h-17 items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-bold text-[#111315] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E5C477] hover:shadow-lg hover:shadow-[#D6AD55]/10 active:translate-y-0"
        >
          <FiSearch
            size={19}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          Search Properties
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
