import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Environment from "../components/Environment";
import EveningVideo from "../assets/evening-city.mp4";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />

      <Environment
        video={EveningVideo}
        overlay="bg-[#041126]/65"
        className="pt-32"
      >
        <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C542]">
              Contact DitiHomes
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Let's find your next
              <span className="text-[#F5C542]"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-white/90">
              Have a question about a property? Want to schedule a viewing? Send
              us a message and we'll be happy to help.
            </p>
          </div>
        </div>
      </Environment>

      <section className="bg-sky-50 px-5 py-16 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Get in touch
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#071A3D]">
              We're here to help.
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Whether you want to buy, rent or book a shortlet, reach out to
              DitiHomes and let's discuss what you're looking for.
            </p>

            <div className="mt-8 space-y-4">
              {/* Phone */}
              <a
                href="tel:+2348142676421"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D]">
                  <FiPhone size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Call us</p>

                  <p className="font-semibold text-[#071A3D]">
                    +234 814 267 6421
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2348142676421"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FaWhatsapp size={23} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>

                  <p className="font-semibold text-[#071A3D]">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:Ditihomespropertiesltd@gmail.com"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D]">
                  <FiMail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Email</p>

                  <p className="break-all font-semibold text-[#071A3D]">
                    Ditihomespropertiesltd@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D]">
                  <FiMapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>

                  <p className="font-semibold text-[#071A3D]">Lagos & Ibadan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message form */}
          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-2xl font-bold text-[#071A3D]">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Prefer to send a detailed enquiry? Fill out the form and we'll get
              back to you.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-green-50 p-6 text-center">
                <h3 className="text-xl font-bold text-green-700">
                  Message received
                </h3>

                <p className="mt-2 text-sm leading-6 text-green-600">
                  Your message has been captured. We'll connect the form to
                  DitiHomes contact channels before launch.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-xl bg-[#071A3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123D78]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="text-sm font-semibold text-[#071A3D]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#071A3D]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#071A3D]">
                    What are you looking for?
                  </label>

                  <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none">
                    <option>Buying a property</option>
                    <option>Renting a property</option>
                    <option>Shortlet</option>
                    <option>General enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#071A3D]">
                    Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you need..."
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#123D78]"
                >
                  <FiSend size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
