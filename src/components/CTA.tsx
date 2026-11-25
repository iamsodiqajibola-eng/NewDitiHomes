import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-(--dh-bg-secondary) py-24 transition-colors duration-300 sm:py-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#D6AD55]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#D6AD55]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        {/* Heading */}
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-(--dh-gold) sm:text-sm">
          Your next chapter starts here
        </p>

        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-(--dh-white) sm:text-5xl lg:text-6xl">
          Ready to find a place
          <span className="block text-(--dh-gold)">you'll love?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-(--dh-muted) sm:text-lg">
          Whether you're looking to buy, rent, lease, or find the perfect
          shortlet, DitiHomes is here to help you find a place that feels like
          home.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-(--dh-gold) px-8 py-4 font-bold text-[#111315] transition-all duration-300 hover:-translate-y-1 hover:bg-(--dh-gold-light) hover:shadow-xl hover:shadow-[#D6AD55]/10"
          >
            Explore Properties
            <FiArrowRight
              size={19}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <a
            href="https://wa.me/2348142676421"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-(--dh-gold)/40 bg-transparent px-8 py-4 font-semibold text-(--dh-white) transition-all duration-300 hover:-translate-y-1 hover:border-(--dh-gold) hover:bg-(--dh-gold)/10 hover:text-(--dh-gold-light)"
          >
            <FiMessageCircle size={19} />
            Talk to an Agent
          </a>
        </div>

        {/* Supporting Text */}
        <p className="mt-8 text-xs tracking-wide text-(--dh-muted)">
          Let's help you find your next place to call home.
        </p>
      </div>
    </section>
  );
}

export default CTA;
