import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiHome,
  FiKey,
  FiShield,
  FiArrowUpRight,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const values = [
    {
      icon: FiHome,
      title: "Properties",
      description: "Browse available homes, apartments and land.",
    },
    {
      icon: FiKey,
      title: "Flexible Options",
      description: "Buy, rent or find a shortlet that suits your needs.",
    },
    {
      icon: FiShield,
      title: "Better Decisions",
      description: "Get the information you need before making a decision.",
    },
    {
      icon: FiCheckCircle,
      title: "Customer Focus",
      description: "We focus on making the property search experience simple.",
    },
  ];

  return (
    <div className="dh-page min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-(--dh-border) bg-(--dh-bg) pt-32 transition-colors duration-300">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-(--dh-gold)/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-(--dh-gold)/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              About DitiHomes
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-(--dh-white) sm:text-5xl lg:text-6xl">
              Helping you find a place that feels like
              <span className="text-(--dh-gold)"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-(--dh-muted) sm:text-lg">
              DitiHomes is a real-estate brand focused on helping people
              discover properties for sale, rent and shortlet across Nigeria.
            </p>

            <Link
              to="/properties"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-(--dh-gold) px-7 py-4 font-bold text-[#111315] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--dh-gold-light)"
            >
              Explore Properties
              <FiArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-(--dh-bg-secondary) px-5 py-20 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              Who we are
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-(--dh-white) sm:text-4xl">
              Real estate made
              <span className="text-(--dh-gold)"> easier.</span>
            </h2>

            <p className="mt-6 leading-8 text-(--dh-muted)">
              Finding the right property should not feel complicated. DitiHomes
              brings available properties into one simple experience where
              customers can explore homes, compare options and connect with us
              when they find something they love.
            </p>

            <p className="mt-5 leading-8 text-(--dh-muted)">
              Whether you are looking to buy a home, rent an apartment or find a
              comfortable shortlet, our goal is to make the search easier,
              clearer and more enjoyable.
            </p>

            <Link
              to="/properties"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-(--dh-gold) transition hover:opacity-75"
            >
              Discover available properties
              <FiArrowUpRight size={17} />
            </Link>
          </div>

          {/* Brand Statement */}
          <div className="relative overflow-hidden rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-8 transition-colors duration-300 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--dh-gold)/10 blur-[80px]" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-(--dh-muted)">
                The DitiHomes approach
              </p>

              <h3 className="mt-8 text-3xl font-bold leading-tight text-(--dh-white) sm:text-4xl">
                Your next chapter deserves the
                <span className="text-(--dh-gold)"> right space.</span>
              </h3>

              <p className="mt-6 leading-8 text-(--dh-muted)">
                A home is more than a building. It is where life happens,
                memories are created and new beginnings take shape. We want
                finding that space to be a better experience.
              </p>

              <div className="mt-10 border-t border-(--dh-border) pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-(--dh-gold)">
                  DitiHomes
                </p>
                <p className="mt-2 text-sm text-(--dh-muted)">
                  Find your place. Start your story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-(--dh-bg) px-5 py-20 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              What matters to us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-(--dh-white) sm:text-4xl">
              What makes the experience different?
            </h2>

            <p className="mt-5 leading-8 text-(--dh-muted)">
              Our focus is to make discovering and choosing a property a
              straightforward experience from the first search to the next step.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold)/50 hover:bg-(--dh-surface-hover)"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold) transition-colors duration-300 group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-(--dh-white)">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-(--dh-muted)">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-(--dh-bg-secondary) px-5 py-16 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-(--dh-border) bg-(--dh-surface) px-7 py-14 text-center transition-colors duration-300 sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
            Start your search
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-(--dh-white) sm:text-4xl">
            The right property could be closer than you think.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-(--dh-muted)">
            Explore our available properties and take the next step towards
            finding your ideal space.
          </p>

          <Link
            to="/properties"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-(--dh-gold) px-7 py-4 font-bold text-[#111315] transition hover:bg-(--dh-gold-light)"
          >
            Browse Properties
            <FiArrowUpRight size={19} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
