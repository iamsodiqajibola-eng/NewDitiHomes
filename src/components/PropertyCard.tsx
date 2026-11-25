import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiMaximize } from "react-icons/fi";
import { FaBed, FaBath } from "react-icons/fa";
import type { Property } from "../data/properties";

type PropertyCardProps = {
  property: Property;
};

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      to={`/properties/${property.id}`}
      aria-label={`View details for ${property.title}`}
      className="group block overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface) transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold)/50 hover:shadow-2xl hover:shadow-black/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--dh-gold)"
    >
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden bg-(--dh-bg-secondary)">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

        {/* Purpose Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-(--dh-gold)/30 bg-(--dh-gold) px-4 py-2 text-xs font-bold text-[#111315] shadow-lg">
          {property.purpose}
        </span>
      </div>

      {/* Property Information */}
      <div className="p-5 sm:p-6">
        {/* Title and Location */}
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-(--dh-white) transition-colors group-hover:text-(--dh-gold-light)">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-(--dh-muted)">
            <FiMapPin className="shrink-0 text-(--dh-gold)" size={16} />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Price */}
        <p className="mt-5 text-xl font-bold text-(--dh-gold)">
          {property.price}
        </p>

        {/* Property Details */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-(--dh-border) py-4">
          <div className="flex min-w-0 items-center gap-2 text-xs text-(--dh-muted) sm:text-sm">
            <FaBed className="shrink-0 text-(--dh-gold)" size={17} />
            <span className="truncate">
              {property.bedrooms > 0 ? `${property.bedrooms} Beds` : "N/A"}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2 text-xs text-(--dh-muted) sm:text-sm">
            <FaBath className="shrink-0 text-(--dh-gold)" size={17} />
            <span className="truncate">
              {property.bathrooms > 0 ? `${property.bathrooms} Baths` : "N/A"}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2 text-xs text-(--dh-muted) sm:text-sm">
            <FiMaximize className="shrink-0 text-(--dh-gold)" size={17} />
            <span className="truncate">{property.area}</span>
          </div>
        </div>

        {/* Property Type and View Button */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="truncate text-sm font-semibold text-(--dh-muted)">
            {property.type}
          </span>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-(--dh-gold)/30 bg-(--dh-gold)/10 px-4 py-3 text-sm font-semibold text-(--dh-gold) transition-all duration-200 group-hover:border-(--dh-gold) group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
            View Property
            <FiArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
