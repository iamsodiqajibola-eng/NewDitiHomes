import { FiCheckCircle, FiHome, FiSearch, FiUsers } from "react-icons/fi";
import Environment from "./Environment";
import NatureVideo from "../assets/nature-trees.mp4";

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
    <Environment
      video={NatureVideo}
      overlay="bg-[#041126]/75"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] drop-shadow-md">
            Why DitiHomes
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">
            Finding a home should feel easy.
          </h2>

          <p className="mt-4 text-base leading-7 text-white/90 drop-shadow-md sm:text-lg">
            DitiHomes brings properties, locations, and trusted professionals
            together to make your journey to finding a home simpler.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.id}
                className="group rounded-3xl border border-white/30 bg-white/90 p-6 shadow-2xl backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-white"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071A3D] shadow-lg transition duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#071A3D]">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Environment>
  );
}

export default WhyDitiHomes;
