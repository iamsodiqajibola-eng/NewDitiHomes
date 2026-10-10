import Environment from "./Environment";
import CitySkylineVideo from "../assets/city-skyline.mp4";

const categories = [
  {
    id: 1,
    title: "Buy a Home",
    description:
      "Find a home that matches your lifestyle, budget, and future plans.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Rent a Home",
    description:
      "Explore comfortable apartments and homes in locations you love.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Shortlet",
    description:
      "Discover beautiful shortlet spaces for weekends, holidays, and business trips.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
];

function PropertyCategories() {
  return (
    <Environment
      video={CitySkylineVideo}
      overlay="bg-[#041126]/75"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] drop-shadow-md">
            Find your way home
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">
            What are you looking for?
          </h2>

          <p className="mt-4 text-base leading-7 text-white/90 drop-shadow-md sm:text-lg">
            Whether you're buying, renting, or looking for a shortlet, DitiHomes
            makes it easier to find a place that feels right.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-2xl backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-white drop-shadow-lg">
                  {category.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-[#c29f2f]"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Environment>
  );
}

export default PropertyCategories;
