import type { ReactNode } from "react";

type EnvironmentProps = {
  video: string;
  children: ReactNode;
  overlay?: string;
  className?: string;
  videoPosition?: string;
};

function Environment({
  video,
  children,
  overlay = "bg-sky-900/20",
  className = "",
  videoPosition = "object-center",
}: EnvironmentProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Moving environment */}
      <video
        className={`absolute inset-0 h-full w-full object-cover ${videoPosition}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Environment overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default Environment;
