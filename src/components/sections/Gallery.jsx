import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
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

// ── Gallery data ──────────────────────────────────────────────────────────────
// Replace each `href` with the real link (Dribbble, Behance, Figma, ...).
// Leave `href` empty ("") and that image simply shows no button.
const COLUMNS = [
  // Column 1
  [
    {
      id: "g1",
      image: "/assets/Gallery%202.webp",
      alt: "Design shot 1",
      href: "https://example.com/shot-1",
      height: "h-[200px] lg:h-[253px]",
    },
    {
      id: "g2",
      image: "/assets/Gallery%201.webp",
      alt: "Design shot 2",
      href: "https://example.com/shot-2",
      height: "h-[280px] lg:h-[561px]",
    },
    {
      id: "g3",
      image: "/assets/Gallery%203.webp",
      alt: "Design shot 3",
      href: "https://example.com/shot-3",
      height: "h-[220px] lg:h-[431px]",
    },
  ],
  // Column 2
  [
    {
      id: "g4",
      image: "/assets/Gallery%204.webp",
      alt: "Design shot 4",
      href: "https://example.com/shot-4",
      height: "h-[260px] lg:h-[503.567px]",
    },
    {
      id: "g5",
      image: "/assets/Gallery%205.webp",
      alt: "Design shot 5",
      href: "https://example.com/shot-5",
      height: "h-[260px] lg:h-[503.567px]",
    },
    {
      id: "g6",
      image: "/assets/Gallery%206.webp",
      alt: "Design shot 6",
      href: "https://example.com/shot-6",
      height: "h-[200px] lg:h-[389px]",
    },
  ],
  // Column 3
  [
    {
      id: "g7",
      image: "/assets/Gallery%207.webp",
      alt: "Design shot 7",
      href: "https://example.com/shot-7",
      height: "h-[220px] lg:h-[431px]",
    },
    {
      id: "g8",
      image: "/assets/Gallery%208.webp",
      alt: "Design shot 8",
      href: "https://example.com/shot-8",
      height: "h-[200px] lg:h-[253px]",
    },
    {
      id: "g9",
      image: "/assets/Gallery%202.webp",
      alt: "Design shot 9",
      href: "https://example.com/shot-9",
      height: "h-[280px] lg:h-[561px]",
    },
  ],
];

// ── One gallery image with hover button ───────────────────────────────────────
function GalleryCard({ image, alt, href, height }) {
  return (
    <AnimatedItem className="w-full">
      <div
        role="img"
        aria-label={alt}
        className={`group relative flex w-full items-center justify-center overflow-hidden rounded-4xl bg-gray-1 bg-cover bg-center bg-no-repeat p-6 ${height}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        {href && (
          <>
            {/* Soft dark overlay so the button stays readable (desktop hover only) */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100" />

            {/* Button: appears on hover / keyboard focus, always visible on touch screens */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-black-400 bg-black-gradient-2 px-6 py-3 text-sm font-semibold text-white opacity-0 shadow-btn-inset transition-all duration-300 hover:border-white/50 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              View Shot
              <ExternalLink size={14} />
            </a>
          </>
        )}
      </div>
    </AnimatedItem>
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
              My Design Shot Exploration
            </h1>
          </div>

          <Button variant="primary">
            See All
          </Button>
        </div>
      </AnimatedItem>

      {/* Gallery */}
      <div className="flex flex-col items-center gap-6 self-stretch lg:flex-row">
        {COLUMNS.map((column, i) => (
          <div
            key={i}
            className="flex w-full flex-col items-start gap-6 lg:flex-1"
          >
            {column.map((item) => (
              <GalleryCard key={item.id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}