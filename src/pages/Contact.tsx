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
    <div className="dh-page min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-(--dh-border) bg-(--dh-bg) pt-32 transition-colors duration-300">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-(--dh-gold)/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-(--dh-gold)/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              Contact DitiHomes
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-(--dh-white) sm:text-5xl lg:text-6xl">
              Let's find your next
              <span className="text-(--dh-gold)"> home.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-(--dh-muted) sm:text-lg">
              Have a question about a property? Want to schedule a viewing? Send
              us a message and we'll be happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-(--dh-bg-secondary) px-5 py-16 transition-colors duration-300 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--dh-gold)">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-(--dh-white) sm:text-4xl">
              We're here to help.
            </h2>

            <p className="mt-5 leading-8 text-(--dh-muted)">
              Whether you want to buy, rent or book a shortlet, reach out to
              DitiHomes and let's discuss what you're looking for.
            </p>

            <div className="mt-9 space-y-4">
              {/* Phone */}
              <a
                href="tel:+2348142676421"
                className="group flex items-center gap-4 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold)/50 hover:bg-(--dh-surface-hover)"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold) transition group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
                  <FiPhone size={21} />
                </div>

                <div>
                  <p className="text-sm text-(--dh-muted)">Call us</p>
                  <p className="mt-1 font-semibold text-(--dh-white)">
                    +234 814 267 6421
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2348142676421"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold)/50 hover:bg-(--dh-surface-hover)"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold) transition group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
                  <FaWhatsapp size={23} />
                </div>

                <div>
                  <p className="text-sm text-(--dh-muted)">WhatsApp</p>
                  <p className="mt-1 font-semibold text-(--dh-white)">
                    Chat with us on WhatsApp
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:Ditihomespropertiesltd@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold)/50 hover:bg-(--dh-surface-hover)"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold) transition group-hover:bg-(--dh-gold) group-hover:text-[#111315]">
                  <FiMail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-(--dh-muted)">Email</p>
                  <p className="mt-1 break-all font-semibold text-(--dh-white)">
                    Ditihomespropertiesltd@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiMapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Our service locations
                  </p>
                  <p className="mt-1 font-semibold text-(--dh-white)">
                    Lagos & Ibadan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-(--dh-border) bg-(--dh-surface) p-6 shadow-2xl shadow-black/10 transition-colors duration-300 sm:p-9">
            <h2 className="text-2xl font-bold text-(--dh-white)">
              Send us a message
            </h2>

            <p className="mt-3 text-sm leading-7 text-(--dh-muted)">
              Have a detailed enquiry? Fill out the form and tell us how we can
              help.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-(--dh-gold)/20 bg-(--dh-surface-hover) p-7 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiCheckCircle size={30} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-(--dh-white)">
                  Thank you for reaching out!
                </h3>

                <p className="mt-3 text-sm leading-7 text-(--dh-muted)">
                  The form preview has been submitted successfully. However,
                  this form is not yet connected to an email service or
                  database, so your message has not been delivered to DitiHomes.
                </p>

                <a
                  href="https://wa.me/2348142676421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 font-bold text-[#111315] transition hover:bg-(--dh-gold-light)"
                >
                  <FaWhatsapp size={18} />
                  Contact us on WhatsApp
                </a>

                <div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-sm font-semibold text-(--dh-gold) transition hover:opacity-75"
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
                    className="text-sm font-semibold text-(--dh-white)"
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
                    className="text-sm font-semibold text-(--dh-white)"
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
                    className="text-sm font-semibold text-(--dh-white)"
                  >
                    What are you looking for?
                  </label>

                  <select
                    id="contact-purpose"
                    className="dh-input mt-2 cursor-pointer"
                    defaultValue="Buying a property"
                  >
                    <option value="Buying a property">Buying a property</option>
                    <option value="Renting a property">
                      Renting a property
                    </option>
                    <option value="Shortlet">Shortlet</option>
                    <option value="General enquiry">General enquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-(--dh-white)"
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
