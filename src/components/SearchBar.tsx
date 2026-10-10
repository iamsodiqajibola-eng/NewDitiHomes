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
    <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 px-4 py-3">
          <label className="block text-xs font-medium text-gray-500">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="mt-1 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-400"
          />
        </div>

        <div className="rounded-xl border border-gray-200 px-4 py-3">
          <label className="block text-xs font-medium text-gray-500">
            Property Type
          </label>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none"
          >
            <option value="">Any property</option>
            <option value="Apartment">Apartment</option>
            <option value="Duplex">Duplex</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="rounded-xl border border-gray-200 px-4 py-3">
          <label className="block text-xs font-medium text-gray-500">
            Purpose
          </label>

          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none"
          >
            <option value="">Any purpose</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Shortlet">Shortlet</option>
          </select>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-[#071A3D] transition hover:bg-[#c29f2f]"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
