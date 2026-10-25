import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";

function AnimatedItem({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? "animate-fade-up" : "animate-hidden"
      }`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 1v14M1 8h14" />
    </svg>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-h2 text-black-400">
        {value}
        <span className="text-grey-400">+</span>
      </p>
      <p className="text-body text-grey-400">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen w-full flex-col items-stretch gap-12 px-4 py-12 lg:flex-row lg:gap-16 lg:px-12 lg:py-25"
    >
      {/* Left column: label on top, stats at the bottom */}
      <div className="flex flex-col justify-between gap-12 lg:w-[26%] lg:shrink-0">
        <AnimatedItem className="flex items-center gap-2 text-grey-400">
          <PlusIcon />
          <p className="text-body">About Me</p>
        </AnimatedItem>

        <AnimatedItem delay={200} className="flex gap-12 lg:gap-24">
          <Stat value="10" label="Finished Project" />
          <Stat value="2" label="Years Experience" />
        </AnimatedItem>
      </div>

      {/* Gray divider line */}
      <div className="h-px w-full bg-gray-200 lg:h-auto lg:w-px" />

      {/* Right column: photo + button on top, intro text at the bottom */}
      <div className="flex flex-1 flex-col justify-between gap-12">
        <div className="flex items-start justify-between gap-6">
          <AnimatedItem delay={100}>
            <img
              src="/assets/My Photo.webp"
              alt="Jayyid Jidan"
              className="h-[280px] w-[196px] rounded-[20px] object-cover lg:h-[369px] lg:w-[259px]"
            />
          </AnimatedItem>

          <AnimatedItem delay={300}>
            <Button variant="primary">See All</Button>
          </AnimatedItem>
        </div>

        <AnimatedItem delay={400}>
          <h3 className="text-h3 max-w-[850px] text-black-400">
            Hi I’m Jayyid Jidan a UI/UX designer with 2 years’ experience
            solving user problems. I believe great design starts with
            understanding users, turning challenges into solutions that improve
            functionality and satisfaction.
          </h3>
        </AnimatedItem>
      </div>
    </section>
  );
}