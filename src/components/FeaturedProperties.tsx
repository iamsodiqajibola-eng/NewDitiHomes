import PropertyCard from "./PropertyCard";
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

  const featuredProperties = filteredProperties.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-(--dh-bg) py-20 transition-colors duration-300 sm:py-24">
      {/* Subtle gold background glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#D6AD55]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-(--dh-gold) sm:text-sm">
              Explore properties
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--dh-white) sm:text-4xl lg:text-5xl">
              Featured <span className="text-(--dh-gold)">Properties</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-(--dh-muted) sm:text-base">
              Explore our selection of available properties and discover a space
              that feels right for you.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-(--dh-white) transition-colors hover:text-(--dh-gold)"
          >
            View all properties
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Properties */}
        {featuredProperties.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) px-6 py-16 text-center transition-colors duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-(--dh-gold)/20 bg-(--dh-gold)/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--dh-gold)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <h3 className="mt-5 text-xl font-bold text-(--dh-white)">
              No properties found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--dh-muted)">
              We couldn't find properties matching your search. Try adjusting
              your location, property type, or purpose.
            </p>

            <button
              type="button"
              onClick={onViewAll}
              className="mt-6 rounded-xl bg-(--dh-gold) px-6 py-3 text-sm font-bold text-[#111315] transition hover:brightness-110"
            >
              View all properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProperties;
