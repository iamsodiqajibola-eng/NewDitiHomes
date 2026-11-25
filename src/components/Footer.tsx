import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Buy", path: "/properties?purpose=For%20Sale" },
      { name: "Rent", path: "/properties?purpose=For%20Rent" },
      { name: "Shortlet", path: "/properties?purpose=Shortlet" },
      { name: "Properties", path: "/properties" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-(--dh-border) bg-(--dh-bg) text-(--dh-white) transition-colors duration-300">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#D6AD55]/4 blur-[120px]" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="DitiHomes homepage"
              className="inline-block text-3xl font-bold tracking-tight"
            >
              <span className="text-[#60A5FA]">Diti</span>
              <span className="text-(--dh-gold)">Homes</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-(--dh-muted)">
              Discover beautiful homes, trusted properties, and spaces that feel
              right. DitiHomes makes finding your next home simpler.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex items-center gap-3">
              {/* Facebook - Coming Soon */}
              <span
                aria-label="Facebook page coming soon"
                title="Facebook page coming soon"
                aria-disabled="true"
                className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-(--dh-border) bg-(--dh-bg-secondary) text-(--dh-muted)"
              >
                <FiFacebook size={18} />
              </span>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ditihomes/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit DitiHomes on Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--dh-border) bg-(--dh-bg-secondary) text-(--dh-muted) transition-all duration-200 hover:border-(--dh-gold) hover:bg-(--dh-gold) hover:text-[#111315]"
              >
                <FiInstagram size={18} />
              </a>

              {/* X */}
              <a
                href="https://x.com/officialkaftan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit DitiHomes on X"
                title="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--dh-border) bg-(--dh-bg-secondary) text-(--dh-muted) transition-all duration-200 hover:border-(--dh-gold) hover:bg-(--dh-gold) hover:text-[#111315]"
              >
                <FiTwitter size={18} />
              </a>
            </div>

            <p className="mt-3 text-xs text-(--dh-muted)">
              Follow us on social media.
            </p>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-(--dh-white)">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-(--dh-muted) transition-colors duration-200 hover:text-(--dh-gold)"
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
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-(--dh-white)">
              Get in touch
            </h3>

            <div className="mt-6 space-y-5">
              {/* Location */}
              <div className="flex items-start gap-3">
                <FiMapPin
                  className="mt-0.5 shrink-0 text-(--dh-gold)"
                  size={18}
                />
                <p className="text-sm leading-6 text-(--dh-muted)">
                  Lagos, Nigeria
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-(--dh-gold)" size={18} />
                <a
                  href="tel:+2348142676421"
                  className="text-sm text-(--dh-muted) transition-colors hover:text-(--dh-gold)"
                >
                  +234 814 267 6421
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-(--dh-gold)" size={18} />
                <a
                  href="https://wa.me/2348142676421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-(--dh-muted) transition-colors hover:text-(--dh-gold)"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <FiMail
                  className="mt-0.5 shrink-0 text-(--dh-gold)"
                  size={18}
                />
                <a
                  href="mailto:Ditihomespropertiesltd@gmail.com"
                  className="break-all text-sm leading-6 text-(--dh-muted) transition-colors hover:text-(--dh-gold)"
                >
                  Ditihomespropertiesltd@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-(--dh-border) bg-(--dh-bg-secondary)">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="text-xs text-(--dh-muted) sm:text-sm">
            © {new Date().getFullYear()} DitiHomes. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-(--dh-muted) sm:text-sm">
            <span>Privacy Policy · Coming soon</span>
            <span>Terms & Conditions · Coming soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
