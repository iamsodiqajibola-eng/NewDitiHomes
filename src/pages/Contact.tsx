import { useState } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="dh-page">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#303238] bg-[#111315] pt-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D6AD55]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#D6AD55]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AD55]">
              Contact DitiHomes
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#F5F5F3] sm:text-5xl lg:text-6xl">
              Let's find your next
              <span className="text-[#D6AD55]"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A6A8AD] sm:text-lg">
              Have a question about a property? Want to schedule a viewing? Send
              us a message and we'll be happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#17191C] px-5 py-16 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6AD55]">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F5F5F3] sm:text-4xl">
              We're here to help.
            </h2>

            <p className="mt-5 leading-8 text-[#A6A8AD]">
              Whether you want to buy, rent or book a shortlet, reach out to
              DitiHomes and let's discuss what you're looking for.
            </p>

            <div className="mt-9 space-y-4">
              {/* Phone */}
              <a
                href="tel:+2348142676421"
                className="group flex items-center gap-4 rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D6AD55]/50 hover:bg-[#242629]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55] transition group-hover:bg-[#D6AD55] group-hover:text-[#111315]">
                  <FiPhone size={21} />
                </div>

                <div>
                  <p className="text-sm text-[#A6A8AD]">Call us</p>
                  <p className="mt-1 font-semibold text-[#F5F5F3]">
                    +234 814 267 6421
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2348142676421"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D6AD55]/50 hover:bg-[#242629]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55] transition group-hover:bg-[#D6AD55] group-hover:text-[#111315]">
                  <FaWhatsapp size={23} />
                </div>

                <div>
                  <p className="text-sm text-[#A6A8AD]">WhatsApp</p>
                  <p className="mt-1 font-semibold text-[#F5F5F3]">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:Ditihomespropertiesltd@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D6AD55]/50 hover:bg-[#242629]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55] transition group-hover:bg-[#D6AD55] group-hover:text-[#111315]">
                  <FiMail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-[#A6A8AD]">Email</p>
                  <p className="mt-1 break-all font-semibold text-[#F5F5F3]">
                    Ditihomespropertiesltd@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#303238] bg-[#1B1D20] p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                  <FiMapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-[#A6A8AD]">
                    Our service locations
                  </p>
                  <p className="mt-1 font-semibold text-[#F5F5F3]">
                    Lagos & Ibadan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-[#303238] bg-[#1B1D20] p-6 shadow-2xl shadow-black/10 sm:p-9">
            <h2 className="text-2xl font-bold text-[#F5F5F3]">
              Send us a message
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#A6A8AD]">
              Have a detailed enquiry? Fill out the form and tell us how we can
              help.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#D6AD55]/20 bg-[#242629] p-7 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D6AD55]/10 text-[#D6AD55]">
                  <FiCheckCircle size={30} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#F5F5F3]">
                  Thank you for reaching out!
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#A6A8AD]">
                  The form preview has been submitted successfully. However,
                  this form is not yet connected to an email service or
                  database, so your message has not been delivered to DitiHomes.
                </p>

                <a
                  href="https://wa.me/2348142676421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 font-bold text-[#111315] transition hover:bg-[#E5C477]"
                >
                  <FaWhatsapp size={18} />
                  Contact us on WhatsApp
                </a>

                <div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-sm font-semibold text-[#D6AD55] transition hover:text-[#E5C477]"
                  >
                    Back to contact form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-[#F5F5F3]"
                  >
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="dh-input mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-[#F5F5F3]"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="dh-input mt-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-purpose"
                    className="text-sm font-semibold text-[#F5F5F3]"
                  >
                    What are you looking for?
                  </label>

                  <select
                    id="contact-purpose"
                    className="dh-input mt-2 cursor-pointer"
                    defaultValue="Buying a property"
                  >
                    <option className="bg-[#1B1D20]">Buying a property</option>
                    <option className="bg-[#1B1D20]">Renting a property</option>
                    <option className="bg-[#1B1D20]">Shortlet</option>
                    <option className="bg-[#1B1D20]">General enquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-[#F5F5F3]"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us what you need..."
                    className="dh-input mt-2 resize-none"
                  />
                </div>

                <button type="submit" className="dh-button-primary w-full">
                  <FiSend size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
