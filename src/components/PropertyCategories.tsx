import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Buy a Home",
    description:
      "Find a home that matches your lifestyle, budget, and future plans.",
    purpose: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Rent a Home",
    description:
      "Explore comfortable apartments and homes in locations you love.",
    purpose: "For Rent",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Shortlet",
    description:
      "Discover beautiful shortlet spaces for weekends, holidays, and business trips.",
    purpose: "Shortlet",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
];

function PropertyCategories() {
  const navigate = useNavigate();

  const handleExplore = (purpose: string) => {
    navigate(`/properties?purpose=${encodeURIComponent(purpose)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#1B1D20] py-20 sm:py-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D6AD55]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD55] sm:text-sm">
            Find your way home
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F5F3] sm:text-4xl lg:text-5xl">
            What are you <span className="text-[#D6AD55]">looking for?</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#A6A8AD] sm:text-base">
            Whether you're buying, renting, or looking for a shortlet, DitiHomes
            makes it easier to find a place that feels right.
          </p>
        </div>

        {/* Category Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.id}
              className="group overflow-hidden rounded-2xl border border-[#303238] bg-[#242629] transition-all duration-300 hover:-translate-y-2 hover:border-[#D6AD55]/50 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="mb-2 inline-block rounded-full border border-[#D6AD55]/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E5C477] backdrop-blur-sm">
                    DitiHomes Collection
                  </span>

                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm leading-7 text-[#A6A8AD]">
                  {category.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleExplore(category.purpose)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-bold text-[#111315] transition-all duration-200 hover:bg-[#E5C477]"
                >
                  Explore Properties
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PropertyCategories;
