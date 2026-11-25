import type { Dispatch, SetStateAction } from "react";
import { FiShield, FiCalendar, FiCheckCircle } from "react-icons/fi";
import SearchBar from "./SearchBar";

type HeroProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  propertyType: string;
  setPropertyType: Dispatch<SetStateAction<string>>;
  purpose: string;
  setPurpose: Dispatch<SetStateAction<string>>;
};

function Hero({
  location,
  setLocation,
  propertyType,
  setPropertyType,
  purpose,
  setPurpose,
}: HeroProps) {
  return (
    <section className="relative isolate flex min-h-195 overflow-hidden bg-[#111315] text-[#F5F5F3] sm:min-h-190 lg:min-h-190">
      {/* Eko Atlantic Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/eko-atlantic-hero.png"
          alt="Eko Atlantic waterfront skyline"
          className="h-full w-full object-cover object-[68%_center]"
        />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#080D15]/95 via-[#080D15]/75 to-[#080D15]/15" />

      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#080D15]/90 via-transparent to-[#080D15]/35" />

      <div className="absolute inset-0 -z-10 bg-[#101923]/10" />

      {/* Main Hero Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-20 lg:pt-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-0.75 w-10 rounded-full bg-[#D6AD55]" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E2BB68] sm:text-sm">
              Find your perfect home
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-3xl text-[42px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[68px]">
            Find a place you'll love to call{" "}
            <span className="text-[#E5B84F]">home.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Discover beautiful homes, apartments, and properties available for
            sale, rent, lease, and shortlet across Nigeria.
          </p>

          {/* Search Panel */}
          <div className="mt-9 w-full max-w-4xl sm:mt-11">
            <SearchBar
              location={location}
              setLocation={setLocation}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              purpose={purpose}
              setPurpose={setPurpose}
            />
          </div>

          {/* Property Categories */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white/90">
            {["Properties for sale", "Homes for rent", "Premium shortlets"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D6AD55]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid max-w-3xl grid-cols-3 border-t border-white/20 pt-7 sm:mt-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <FiShield className="shrink-0 text-xl text-[#D6AD55] sm:text-2xl" />

            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">
                Verified
              </p>
              <p className="text-xs text-white/65 sm:text-sm">Listings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-3 sm:gap-3 sm:pl-6">
            <FiCalendar className="shrink-0 text-xl text-[#D6AD55] sm:text-2xl" />

            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">
                Safe
              </p>
              <p className="text-xs text-white/65 sm:text-sm">Inspections</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-3 sm:gap-3 sm:pl-6">
            <FiCheckCircle className="shrink-0 text-xl text-[#D6AD55] sm:text-2xl" />

            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">
                Secure
              </p>
              <p className="text-xs text-white/65 sm:text-sm">Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
