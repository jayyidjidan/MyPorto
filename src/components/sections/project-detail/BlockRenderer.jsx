import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";

// ── Text block ────────────────────────────────────────────────────────────────
function TextBlock({ block }) {
  const clean = DOMPurify.sanitize(block.content || "");
  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

// ── Image block ───────────────────────────────────────────────────────────────
function ImageBlock({ block }) {
  if (!block.url) return null;
  return (
    <figure className="w-full">
      <img
        src={block.url}
        alt={block.alt || ""}
        className="w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </figure>
  );
}

// ── Carousel block ────────────────────────────────────────────────────────────
function CarouselBlock({ block }) {
  const images = block.images || [];
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <img
        src={images[current]?.url}
        alt={images[current]?.alt || `Slide ${current + 1}`}
        className="w-full object-cover transition-opacity duration-300"
        loading="lazy"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === current
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Grid block ────────────────────────────────────────────────────────────────
function GridBlock({ block }) {
  const images = block.images || [];
  const cols = block.columns || 2;

  if (images.length === 0) return null;

  return (
    <div
      className={`grid gap-3 ${
        cols === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
      }`}
    >
      {images.map((img, i) => (
        <figure key={i} className="overflow-hidden rounded-2xl">
          <img
            src={img.url}
            alt={img.alt || `Image ${i + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  );
}

// ── Button block ──────────────────────────────────────────────────────────────
function ButtonBlock({ block }) {
  if (!block.href) return null;
  return (
    <div className="flex">
      <a
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-black-400 bg-black-gradient-2 px-7 py-3.5 text-sm font-semibold text-white shadow-btn-inset transition-all duration-150 hover:border-white/50"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {block.label || "View"}
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

// ── Block router ──────────────────────────────────────────────────────────────
export default function BlockRenderer({ block }) {
  switch (block?.type) {
    case "text":
      return <TextBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "carousel":
      return <CarouselBlock block={block} />;
    case "grid":
      return <GridBlock block={block} />;
    case "button":
      return <ButtonBlock block={block} />;
    default:
      return null;
  }
}
