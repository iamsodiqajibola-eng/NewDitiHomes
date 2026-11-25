import type { Dispatch, SetStateAction } from "react";
import { FiShield, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
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
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className={`relative isolate flex min-h-195 overflow-hidden transition-colors duration-500 sm:min-h-190 lg:min-h-190 ${
        isLight ? "bg-[#F7F8FA] text-[#202226]" : "bg-[#111315] text-white"
      }`}
    >
      {/* Eko Atlantic Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/eko-atlantic-hero.png"
          alt="Eko Atlantic waterfront skyline"
          className={`h-full w-full object-cover object-[68%_center] transition-all duration-500 ${
            isLight ? "brightness-110" : "brightness-75"
          }`}
        />
      </div>

      {/* Cinematic / Light Overlays */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-500 ${
          isLight
            ? "bg-linear-to-r from-white/95 via-white/75 to-white/15"
            : "bg-linear-to-r from-[#080D15]/95 via-[#080D15]/75 to-[#080D15]/15"
        }`}
      />

      <div
        className={`absolute inset-0 -z-10 transition-all duration-500 ${
          isLight
            ? "bg-linear-to-t from-white/80 via-transparent to-white/35"
            : "bg-linear-to-t from-[#080D15]/90 via-transparent to-[#080D15]/35"
        }`}
      />

      <div
        className={`absolute inset-0 -z-10 transition-colors duration-500 ${
          isLight ? "bg-white/10" : "bg-[#101923]/10"
        }`}
      />

      {/* Main Hero Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-20 lg:pt-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-0.75 w-10 rounded-full bg-(--dh-gold)" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-(--dh-gold) sm:text-sm">
              Find your perfect home
            </p>
          </div>

          {/* Main Heading */}
          <h1
            className={`max-w-3xl text-[42px] font-bold leading-[1.08] tracking-tight transition-colors duration-500 sm:text-5xl md:text-6xl lg:text-[68px] ${
              isLight ? "text-[#202226]" : "text-white"
            }`}
          >
            Find a place you'll love to call{" "}
            <span className="text-(--dh-gold)">home.</span>
          </h1>

          {/* Description */}
          <p
            className={`mt-6 max-w-xl text-base leading-7 transition-colors duration-500 sm:text-lg sm:leading-8 ${
              isLight ? "text-[#454A52]" : "text-white/80"
            }`}
          >
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
          <div
            className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium transition-colors duration-500 ${
              isLight ? "text-[#353A42]" : "text-white/90"
            }`}
          >
            {["Properties for sale", "Homes for rent", "Premium shortlets"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-(--dh-gold)" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-16 grid max-w-3xl grid-cols-3 border-t pt-7 transition-colors duration-500 sm:mt-20 ${
            isLight ? "border-black/15" : "border-white/20"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <FiShield className="shrink-0 text-xl text-(--dh-gold) sm:text-2xl" />

            <div>
              <p
                className={`text-xs font-semibold sm:text-sm ${
                  isLight ? "text-[#202226]" : "text-white"
                }`}
              >
                Verified
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  isLight ? "text-[#646A73]" : "text-white/65"
                }`}
              >
                Listings
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 border-l pl-3 sm:gap-3 sm:pl-6 ${
              isLight ? "border-black/15" : "border-white/20"
            }`}
          >
            <FiCalendar className="shrink-0 text-xl text-(--dh-gold) sm:text-2xl" />

            <div>
              <p
                className={`text-xs font-semibold sm:text-sm ${
                  isLight ? "text-[#202226]" : "text-white"
                }`}
              >
                Safe
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  isLight ? "text-[#646A73]" : "text-white/65"
                }`}
              >
                Inspections
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 border-l pl-3 sm:gap-3 sm:pl-6 ${
              isLight ? "border-black/15" : "border-white/20"
            }`}
          >
            <FiCheckCircle className="shrink-0 text-xl text-(--dh-gold) sm:text-2xl" />

            <div>
              <p
                className={`text-xs font-semibold sm:text-sm ${
                  isLight ? "text-[#202226]" : "text-white"
                }`}
              >
                Secure
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  isLight ? "text-[#646A73]" : "text-white/65"
                }`}
              >
                Transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
