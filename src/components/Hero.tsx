import type { Dispatch, SetStateAction } from "react";
import SearchBar from "./SearchBar";
import SkyVideo from "../assets/sky-video.mp4";

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
    <section className="relative min-h-162.5 overflow-hidden text-white">
      {/* Sky video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={SkyVideo} type="video/mp4" />
      </video>

      {/* Sky overlay */}
      <div className="absolute inset-0 bg-[#041126]/75" />

      {/* Soft white glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_35%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-162.5 max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Find your perfect home
          </p>

          <h1 className="max-w-xl text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
            Find a place you'll love to call
            <span className="text-[#D4AF37]"> home.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/90 drop-shadow-md sm:text-lg">
            Discover beautiful homes, apartments, and properties available for
            sale, rent, lease, and shortlet across Nigeria.
          </p>

          <div className="mt-8">
            <SearchBar
              location={location}
              setLocation={setLocation}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              purpose={purpose}
              setPurpose={setPurpose}
            />
          </div>
        </div>

        {/* Property image */}
        <div className="relative hidden lg:block">
          <div className="overflow-hidden rounded-4xl border border-white/50 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Modern luxury home"
              className="h-130 w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-2xl bg-[#D4AF37] shadow-lg" />
        </div>
      </div>

      {/* Smooth transition into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white/80 to-transparent" />
    </section>
  );
}

export default Hero;
