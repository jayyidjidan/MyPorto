import Button from "../common/Button";
import { useEffect, useRef, useState } from "react";

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

export default function Experience() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start gap-18 rounded-[48px] bg-black-400 px-4 py-12 lg:min-h-0 lg:px-12 lg:py-25">

      {/* Header */}
      <AnimatedItem>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-body text-white-2">
            Experience
          </p>

          <h1 className="w-[200px] text-h1 text-gradient-white-1 lg:w-[424px]">
            Explore My Exprience
          </h1>
        </div>
      </AnimatedItem>


      {/* Desktop */}
      <div className="hidden w-full flex-col items-start gap-6 self-stretch lg:flex">

        {/* Experience labels */}
        <div className="flex w-full items-end justify-between self-stretch">

          {/* Previous */}
          <AnimatedItem>
            <div className="flex flex-col items-center justify-center gap-2.5">
              <h4 className="text-h4 text-white-2">
                My Previous Exprience
              </h4>

              <img
                src="/assets/Polygon.png"
                className="h-4.75 w-5"
                alt=""
              />
            </div>
          </AnimatedItem>


          {/* Current */}
          <AnimatedItem delay={150}>
            <div className="flex flex-col items-center gap-2.5">
              <h4 className="text-h4 text-white-2">
                Plainthing Studio
              </h4>

              <h4 className="text-h4 text-white/50">
                Intern UI Designer
              </h4>

              <p className="text-body text-white/50">
                2025 - 2026
              </p>

              <img
                src="/assets/Polygon.png"
                className="h-4.75 w-5"
                alt=""
              />
            </div>
          </AnimatedItem>


          {/* Future */}
          <AnimatedItem delay={300}>
            <div className="flex flex-col items-center justify-center gap-2.5">
              <h4 className="text-h4 text-white-2">
                My Future Exprience
              </h4>

              <img
                src="/assets/Polygon.png"
                className="h-4.75 w-5"
                alt=""
              />
            </div>
          </AnimatedItem>

        </div>


        {/* Timeline */}
        <AnimatedItem
          className="flex w-full items-center justify-center pl-[120px] pr-[100px]"
          delay={150}
        >
          <div className="h-6 w-6 shrink-0 rounded-full bg-white/5"></div>

          <div className="h-1 flex-1 bg-white-gradient"></div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white">
            <div className="h-8 w-8 rounded-full bg-white"></div>
          </div>

          <div className="h-1 flex-1 bg-white"></div>

          <div className="h-6 w-6 shrink-0 rounded-full bg-white"></div>
        </AnimatedItem>

      </div>


      {/* Mobile */}
      <div className="flex min-h-0 w-full flex-1 items-stretch gap-6 lg:hidden">

        <div className="flex flex-1 flex-col items-center justify-between gap-8 py-2">

          {/* Previous */}
          <AnimatedItem>
            <div className="flex items-center gap-2.5">
              <h4 className="text-h4 text-center text-white-2">
                My Previous Exprience
              </h4>

              <img
                src="/assets/Polygon.png"
                className="h-5 w-4.75 rotate-[-90deg]"
                alt=""
              />
            </div>
          </AnimatedItem>


          {/* Current */}
          <AnimatedItem delay={150}>
            <div className="flex items-center justify-center gap-2.5">
              <div className="flex flex-col items-center gap-2.5 text-center">

                <h4 className="text-h4 text-white-2">
                  Plainthing Studio
                </h4>

                <h4 className="text-h4 text-white/50">
                  Intern UI Designer
                </h4>

                <p className="text-body text-white/50">
                  2025 - 2026
                </p>

              </div>

              <img
                src="/assets/Polygon.png"
                className="h-5 w-4.75 rotate-[-90deg]"
                alt=""
              />
            </div>
          </AnimatedItem>


          {/* Future */}
          <AnimatedItem delay={300}>
            <div className="flex items-center gap-2.5">
              <h4 className="text-h4 text-center text-white-2">
                My Future Exprience
              </h4>

              <img
                src="/assets/Polygon.png"
                className="h-5 w-4.75 rotate-[-90deg]"
                alt=""
              />
            </div>
          </AnimatedItem>

        </div>


        {/* Mobile timeline */}
        <AnimatedItem
          className="flex flex-col items-center justify-between py-2"
          delay={150}
        >
          <div className="h-6 w-6 shrink-0 rounded-full bg-white/5"></div>

          <div className="w-1 flex-1 bg-white-gradient"></div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white">
            <div className="h-8 w-8 rounded-full bg-white"></div>
          </div>

          <div className="w-1 flex-1 bg-white"></div>

          <div className="h-6 w-6 shrink-0 rounded-full bg-white"></div>
        </AnimatedItem>

      </div>


      {/* Button */}
      <AnimatedItem delay={200}>
        <Button variant="secondary">
          Know More
        </Button>
      </AnimatedItem>

    </section>
  );
}