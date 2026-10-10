import Environment from "./Environment";
import PropertyCard from "./PropertyCard";
import SkyVideo from "../assets/sky-video.mp4";
import { useProperties } from "../context/PropertyContext";

type FeaturedPropertiesProps = {
  location: string;
  propertyType: string;
  purpose: string;
  onViewAll: () => void;
};

function FeaturedProperties({
  location,
  propertyType,
  purpose,
  onViewAll,
}: FeaturedPropertiesProps) {
  const { properties } = useProperties();

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesType = propertyType === "" || property.type === propertyType;

    const matchesPurpose = purpose === "" || property.purpose === purpose;

    return matchesLocation && matchesType && matchesPurpose;
  });

  // Display only the first three matching properties
  // in the Featured Properties section.
  const featuredProperties = filteredProperties.slice(0, 3);

  return (
    <Environment video={SkyVideo} overlay="bg-[#041126]/75" className="py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] drop-shadow-md">
              Explore properties
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">
              Featured Properties
            </h2>

            <p className="mt-3 max-w-2xl text-white/90 drop-shadow-md">
              Explore some of our available properties and find a place that
              fits your needs.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="w-fit font-semibold text-white drop-shadow-md transition hover:text-[#D4AF37]"
          >
            View all properties →
          </button>
        </div>

        {featuredProperties.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/40 bg-white/90 px-6 py-12 text-center shadow-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-[#071A3D]">
              No properties found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your location, property type, or purpose.
            </p>

            <button
              type="button"
              onClick={onViewAll}
              className="mt-5 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#123D78]"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </Environment>
  );
}

export default FeaturedProperties;
