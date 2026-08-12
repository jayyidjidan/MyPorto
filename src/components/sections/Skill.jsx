import { useEffect, useRef, useState } from "react";
import Chip from "../common/Chip";

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

export default function Skill() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start gap-18 px-4 py-12 lg:px-12 lg:py-30">

      {/* Header */}
      <AnimatedItem className="flex w-full flex-col items-start justify-center gap-6">
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-body text-black-400/50">
            Skill
          </p>

          <h1 className="w-[300px] text-left text-h1 text-gradient-black-1 lg:w-[424px]">
            See My Newest Project Case
          </h1>
        </div>
      </AnimatedItem>


      {/* Skills */}
      <div className="flex w-full flex-col items-start self-stretch">

        {/* Skill 1 */}
        <AnimatedItem
          className="flex w-full flex-col items-end justify-between gap-6 self-stretch border-b border-[#c9c9c9] py-12 lg:flex-row lg:items-center lg:gap-0"
          delay={0}
        >
          <div className="flex w-full items-start gap-4">
            <h4 className="text-h4">1</h4>

            <h1 className="text-h1">
              Fullstack Dev
            </h1>
          </div>

          <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
            <Chip variant="medium">
              Frontend
            </Chip>

            <Chip variant="medium">
              Backend
            </Chip>

            <Chip variant="medium">
              Database
            </Chip>
          </div>
        </AnimatedItem>


        {/* Skill 2 */}
        <AnimatedItem
          className="flex w-full flex-col items-end justify-between gap-6 self-stretch border-b border-[#c9c9c9] py-12 lg:flex-row lg:items-center lg:gap-0"
          delay={0}
        >
          <div className="flex w-full items-start gap-4">
            <h4 className="text-h4">2</h4>

            <h1 className="text-h1">
              AI Development
            </h1>
          </div>

          <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
            <Chip variant="medium">
              Chatbot
            </Chip>

            <Chip variant="medium">
              Automation
            </Chip>

            <Chip variant="medium">
              Generative_AI
            </Chip>
          </div>
        </AnimatedItem>


        {/* Skill 3 */}
        <AnimatedItem
          className="flex w-full flex-col items-end justify-between gap-6 self-stretch py-12 lg:flex-row lg:items-center lg:gap-0"
          delay={0}
        >
          <div className="flex w-full items-start gap-4">
            <h4 className="text-h4">3</h4>

            <h1 className="text-h1">
              UI/UX Designer
            </h1>
          </div>

          <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-start">
            <Chip variant="medium">
              UX_Research
            </Chip>

            <Chip variant="medium">
              UI_Design
            </Chip>

            <Chip variant="medium">
              Prototyping
            </Chip>
          </div>
        </AnimatedItem>

      </div>
    </section>
  );
}