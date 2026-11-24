import type { ReactNode } from "react";

type EnvironmentProps = {
  video?: string;
  children: ReactNode;
  overlay?: string;
  className?: string;
  videoPosition?: string;
};

function Environment({
  children,
  overlay = "bg-transparent",
  className = "",
}: EnvironmentProps) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-[#111315] ${className}`}
    >
      {/* Static gold ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-[#D6AD55]/[0.07] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-112.5 w-112.5 rounded-full bg-[#D6AD55]/4 blur-[130px]"
      />

      {/* Optional overlay */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${overlay}`}
      />

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default Environment;
