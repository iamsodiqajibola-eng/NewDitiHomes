import Environment from "./Environment";
import SunsetHomeVideo from "../assets/sunset-home.mp4";

function CTA() {
  return (
    <Environment
      video={SunsetHomeVideo}
      overlay="bg-black/35"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] drop-shadow-md">
          Your next chapter starts here
        </p>

        <h2 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
          Ready to find a place
          <span className="text-[#D4AF37]"> you'll love?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/95 drop-shadow-md sm:text-lg">
          Whether you're looking to buy, rent, lease, or find the perfect
          shortlet, DitiHomes is here to help you find a place that feels like
          home.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="rounded-xl bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#071A3D] shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#c29f2f]"
          >
            Explore Properties
          </button>

          <button
            type="button"
            className="rounded-xl border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#071A3D]"
          >
            Talk to an Agent
          </button>
        </div>
      </div>
    </Environment>
  );
}

export default CTA;
