import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Environment from "./Environment";
import EveningCityVideo from "../assets/evening-city.mp4";

const footerLinks = [
  {
    title: "Explore",
    links: [
      {
        name: "Buy",
        path: "/properties?purpose=For%20Sale",
      },
      {
        name: "Rent",
        path: "/properties?purpose=For%20Rent",
      },
      {
        name: "Shortlet",
        path: "/properties?purpose=Shortlet",
      },
      {
        name: "Properties",
        path: "/properties",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
  },
];

function Footer() {
  return (
    <Environment
      video={EveningCityVideo}
      overlay="bg-[#041126]/75"
      className="text-white"
    >
      <footer>
        {/* Main footer */}
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                <span className="text-[#60A5FA]">Diti</span>
                <span className="text-[#F5C542]">Homes</span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/90">
                Discover beautiful homes, trusted properties, and spaces that
                feel right. DitiHomes makes finding your next home simpler.
              </p>

              {/* Social icons */}
              <div className="mt-7 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:border-[#F5C542] hover:bg-[#F5C542] hover:text-[#071A3D]"
                >
                  <FiFacebook size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:border-[#F5C542] hover:bg-[#F5C542] hover:text-[#071A3D]"
                >
                  <FiInstagram size={18} />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:border-[#F5C542] hover:bg-[#F5C542] hover:text-[#071A3D]"
                >
                  <FiTwitter size={18} />
                </a>
              </div>
            </div>

            {/* Footer links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-base font-bold text-white">
                  {section.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/85 transition hover:text-[#F5C542]"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h3 className="text-base font-bold text-white">Get in touch</h3>

              <div className="mt-5 space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <FiMapPin
                    className="mt-0.5 shrink-0 text-[#F5C542]"
                    size={18}
                  />

                  <p className="text-sm leading-6 text-white/90">
                    Lagos, Nigeria
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-[#F5C542]" size={18} />

                  <a
                    href="tel:+2348142676421"
                    className="text-sm text-white/90 transition hover:text-[#F5C542]"
                  >
                    +234 814 267 6421
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-[#F5C542]" size={18} />

                  <a
                    href="https://wa.me/2348142676421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/90 transition hover:text-[#F5C542]"
                  >
                    WhatsApp Us
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <FiMail className="shrink-0 text-[#F5C542]" size={18} />

                  <a
                    href="mailto:Ditihomespropertiesltd@gmail.com"
                    className="break-all text-sm text-white/90 transition hover:text-[#F5C542]"
                  >
                    Ditihomespropertiesltd@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 bg-black/25">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p className="text-sm text-white/80">
              ©️ {new Date().getFullYear()} DitiHomes. All rights reserved.
            </p>

            <div className="flex justify-center gap-5 text-sm">
              <a
                href="#"
                className="text-white/80 transition hover:text-[#F5C542]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-white/80 transition hover:text-[#F5C542]"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Environment>
  );
}

export default Footer;
