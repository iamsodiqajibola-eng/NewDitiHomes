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
    <section className="relative overflow-hidden bg-(--dh-bg) py-20 transition-colors duration-300 sm:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6AD55]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-(--dh-gold) sm:text-sm">
            Why DitiHomes
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--dh-white) sm:text-4xl lg:text-5xl">
            Finding a home should{" "}
            <span className="text-(--dh-gold)">feel easy.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-(--dh-muted) sm:text-base">
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
                className="group relative overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 transition-all duration-300 hover:-translate-y-2 hover:border-(--dh-gold)/50 hover:bg-(--dh-surface-hover)"
              >
                {/* Number */}
                <span className="absolute right-5 top-5 text-4xl font-bold text-(--dh-muted)/10 transition-colors group-hover:text-(--dh-gold)/20">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold) transition-all duration-300 group-hover:border-(--dh-gold) group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-(--dh-white) transition-colors group-hover:text-(--dh-gold-light)">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-(--dh-muted)">
                  {reason.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-0.5 w-10 rounded-full bg-(--dh-gold)/40 transition-all duration-300 group-hover:w-16 group-hover:bg-(--dh-gold)" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyDitiHomes;
