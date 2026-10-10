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
      className="group block overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
    >
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Purpose Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#071A3D]">
          {property.purpose}
        </span>
      </div>
      {/* Property Information */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#071A3D]">
              {property.title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <FiMapPin className="shrink-0" size={16} />
              <span>{property.location}</span>
            </div>
          </div>
        </div>
        {/* Price */}
        <p className="mt-5 text-xl font-bold text-[#071A3D]">
          {property.price}
        </p>
        {/* Property Details */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-gray-100 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBed className="shrink-0 text-[#D4AF37]" size={18} />
            <span>
              {property.bedrooms > 0 ? `${property.bedrooms} Beds` : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBath className="shrink-0 text-[#D4AF37]" size={18} />
            <span>
              {property.bathrooms > 0 ? `${property.bathrooms} Baths` : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiMaximize className="shrink-0 text-[#D4AF37]" size={18} />
            <span>{property.area}</span>
          </div>
        </div>
        {/* Property Type + View Button */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-500">
            {property.type}
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-[#123D78]">
            View Property
            <FiArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
export default PropertyCard;
