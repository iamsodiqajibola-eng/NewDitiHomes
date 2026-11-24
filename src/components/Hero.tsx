import type { Dispatch, SetStateAction } from "react";
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
    <section className="relative min-h-170 overflow-hidden bg-[#111315] text-[#F5F5F3] lg:min-h-180">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(214,173,85,0.10),transparent_40%)]" />

      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full bg-[#D6AD55]/4 blur-[100px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid min-h-170 max-w-7xl items-center gap-12 px-5 pb-16 pt-32 md:px-8 lg:min-h-180 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-24">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#D6AD55]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD55] sm:text-sm">
              Find your perfect home
            </p>
          </div>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.15] tracking-tight text-[#F5F5F3] sm:text-5xl lg:text-6xl xl:text-7xl">
            Find a place you'll love to call{" "}
            <span className="text-[#D6AD55]">home.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-[#A6A8AD] sm:text-lg">
            Discover beautiful homes, apartments, and properties available for
            sale, rent, lease, and shortlet across Nigeria.
          </p>

          {/* Property Search */}
          <div className="mt-9">
            <SearchBar
              location={location}
              setLocation={setLocation}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              purpose={purpose}
              setPurpose={setPurpose}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#A6A8AD]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6AD55]" />
              Properties for sale
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6AD55]" />
              Homes for rent
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6AD55]" />
              Premium shortlets
            </span>
          </div>
        </div>

        {/* Property Image */}
        <div className="relative mx-auto hidden w-full max-w-xl lg:block">
          <div className="absolute -inset-5 rounded-4xl border border-[#D6AD55]/10" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#242629] shadow-2xl shadow-black/40">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Modern luxury residential property"
              className="h-125 w-full object-cover"
            />

            <div className="absolute inset-0 bg--to-t from-[#111315]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5C477]">
                Discover exceptional living
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                A home that feels right.
              </h2>
            </div>
          </div>

          {/* Decorative Gold Accent */}
          <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-2xl border border-[#D6AD55]/40 bg-[#D6AD55]/10 backdrop-blur-sm" />

          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border border-[#D6AD55]/30" />
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#111315] to-transparent" />
    </section>
  );
}

export default Hero;
