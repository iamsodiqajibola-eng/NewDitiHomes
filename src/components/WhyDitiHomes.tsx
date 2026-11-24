import { FiCheckCircle, FiHome, FiSearch, FiUsers } from "react-icons/fi";

const reasons = [
  {
    id: 1,
    title: "Verified Properties",
    description:
      "We help you discover genuine properties with reliable information, so you can search with confidence.",
    icon: FiCheckCircle,
  },
  {
    id: 2,
    title: "Wide Range of Homes",
    description:
      "From apartments and duplexes to land and shortlets, explore properties that match your needs.",
    icon: FiHome,
  },
  {
    id: 3,
    title: "Trusted Agents",
    description:
      "Connect with property professionals who can guide you through your search and decision-making.",
    icon: FiUsers,
  },
  {
    id: 4,
    title: "Simple Property Search",
    description:
      "Search by location, property type, and purpose to find suitable properties without unnecessary stress.",
    icon: FiSearch,
  },
];

function WhyDitiHomes() {
  return (
    <section className="relative overflow-hidden bg-[#111315] py-20 sm:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6AD55]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AD55] sm:text-sm">
            Why DitiHomes
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F5F3] sm:text-4xl lg:text-5xl">
            Finding a home should{" "}
            <span className="text-[#D6AD55]">feel easy.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#A6A8AD] sm:text-base">
            DitiHomes brings properties, locations, and trusted professionals
            together to make your journey to finding a home simpler.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.id}
                className="group relative overflow-hidden rounded-2xl border border-[#303238] bg-[#1B1D20] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#D6AD55]/50 hover:bg-[#242629]"
              >
                {/* Number */}
                <span className="absolute right-5 top-5 text-4xl font-bold text-white/4 transition-colors group-hover:text-[#D6AD55]/10">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55] transition-all duration-300 group-hover:border-[#D6AD55] group-hover:bg-[#D6AD55] group-hover:text-[#111315]">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#F5F5F3] transition-colors group-hover:text-[#E5C477]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#A6A8AD]">
                  {reason.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-0.5 w-10 rounded-full bg-[#D6AD55]/40 transition-all duration-300 group-hover:w-16 group-hover:bg-[#D6AD55]" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyDitiHomes;
