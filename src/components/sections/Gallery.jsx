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
        threshold: 0.15,
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

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="flex min-h-screen w-full flex-col items-center justify-start gap-8 px-4 py-12 lg:gap-18 lg:px-12 lg:py-30"
    >
      {/* Header */}
      <AnimatedItem>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-body text-black-400/50">
              Gallery
            </p>

            <h1 className="w-[250px] text-center text-h1 text-gradient-black-1 lg:w-[350px]">
              Gallery From My Project
            </h1>
          </div>

          <Button variant="primary">
            See All
          </Button>
        </div>
      </AnimatedItem>

      {/* Gallery */}
      <div className="flex flex-col items-center gap-6 self-stretch lg:flex-row">

        {/* Column 1 */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-1">

          <AnimatedItem className="w-full">
            <div className="flex h-[200px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%202.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[253px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[280px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%201.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[561px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[220px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%203.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[431px]" />
          </AnimatedItem>

        </div>


        {/* Column 2 */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-1">

          <AnimatedItem className="w-full">
            <div className="flex h-[260px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%204.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[503.567px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[260px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%205.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[503.567px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[200px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%206.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[389px]" />
          </AnimatedItem>

        </div>


        {/* Column 3 */}
        <div className="flex w-full flex-col items-start gap-6 lg:flex-1">

          <AnimatedItem className="w-full">
            <div className="flex h-[220px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%207.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[431px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[200px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%208.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[253px]" />
          </AnimatedItem>

          <AnimatedItem className="w-full">
            <div className="flex h-[280px] w-full rounded-4xl bg-gray-1 bg-[url('/assets/Gallery%202.webp')] bg-cover bg-center bg-no-repeat p-6 lg:h-[561px]" />
          </AnimatedItem>

        </div>

      </div>
    </section>
  );
}