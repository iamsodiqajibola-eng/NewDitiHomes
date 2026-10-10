import { Link } from "react-router-dom";
import { FiCheckCircle, FiHome, FiKey, FiShield } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Environment from "../components/Environment";
import NatureVideo from "../assets/nature-trees.mp4";

function About() {
  return (
    <>
      <Navbar />

      <Environment
        video={NatureVideo}
        overlay="bg-[#041126]/55"
        className="pt-32"
      >
        <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C542]">
              About DitiHomes
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Helping you find a place that feels like
              <span className="text-[#F5C542]"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              DitiHomes is a real-estate brand focused on helping people
              discover properties for sale, rent and shortlet across Nigeria.
            </p>
          </div>
        </div>
      </Environment>

      <section className="bg-white px-5 py-16 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Who we are
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">
              Real estate made easier.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Finding the right property should not feel complicated. DitiHomes
              brings available properties into one simple experience where
              customers can explore homes, compare options and connect with us
              when they find something they love.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you are looking to buy a home, rent an apartment or find a
              comfortable shortlet, our goal is to make the search easier,
              clearer and more enjoyable.
            </p>

            <Link
              to="/properties"
              className="mt-8 inline-flex rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#123D78]"
            >
              Explore Properties
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-sky-50 p-7">
              <FiHome size={30} className="text-[#D4AF37]" />

              <h3 className="mt-5 text-xl font-bold text-[#071A3D]">
                Properties
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Browse available homes, apartments and land.
              </p>
            </div>

            <div className="rounded-3xl bg-sky-50 p-7">
              <FiKey size={30} className="text-[#D4AF37]" />

              <h3 className="mt-5 text-xl font-bold text-[#071A3D]">
                Flexible Options
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Buy, rent or find a shortlet that suits your needs.
              </p>
            </div>

            <div className="rounded-3xl bg-sky-50 p-7">
              <FiShield size={30} className="text-[#D4AF37]" />

              <h3 className="mt-5 text-xl font-bold text-[#071A3D]">
                Better Decisions
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Get the information you need before making a decision.
              </p>
            </div>

            <div className="rounded-3xl bg-sky-50 p-7">
              <FiCheckCircle size={30} className="text-[#D4AF37]" />

              <h3 className="mt-5 text-xl font-bold text-[#071A3D]">
                Customer Focus
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                We focus on making the property search experience simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
