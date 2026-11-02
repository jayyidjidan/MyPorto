import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";
import { optimizeImage, srcSetFor } from "../../../utils/image";

// Content is capped at 1440px with 32px side padding -> 1376px max image width
const FULL_SIZES = "(min-width: 1440px) 1376px, 100vw";

// ── Text block ────────────────────────────────────────────────────────────────
// The block itself is full width. Each child (p, h2, h3, ul, ol) is capped at
// 720px, and the editor's text-align decides where that 720px column sits:
// right-aligned -> pushed to the right edge, centered -> centered.
const TEXT_BLOCK_CLASSES = [
  "tiptap-content w-full",
  "[&>*]:max-w-[720px]",
  "[&>[style*='right']]:ml-auto",
  "[&>[style*='center']]:mx-auto",
  "[&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-3xl",
].join(" ");

function TextBlock({ block }) {
  const clean = DOMPurify.sanitize(block.content || "");
  return (
    <div
      className={TEXT_BLOCK_CLASSES}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

// ── Image block ───────────────────────────────────────────────────────────────
function ImageBlock({ block }) {
  if (!block.url) return null;
  return (
    <figure className="w-full overflow-hidden rounded-3xl">
      <img
        src={optimizeImage(block.url, 1440)}
        srcSet={srcSetFor(block.url)}
        sizes={FULL_SIZES}
        alt={block.alt || ""}
        className="h-auto w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

// ── Carousel block ────────────────────────────────────────────────────────────
function CarouselBlock({ block }) {
  const images = block.images || [];
  const [current, setCurrent] = useState(0);

  // Preload the next slide so clicking "next" feels instant.
  // Uses the same fixed width as the displayed <img> so the cache is hit.
  useEffect(() => {
    if (images.length < 2) return;
    const nextUrl = images[(current + 1) % images.length]?.url;
    if (nextUrl) {
      const preload = new Image();
      preload.src = optimizeImage(nextUrl, 1440);
    }
  }, [current, images]);

  if (images.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      <img
        src={optimizeImage(images[current]?.url, 1440)}
        alt={images[current]?.alt || `Slide ${current + 1}`}
        className="h-auto w-full object-cover transition-opacity duration-300"
        loading="lazy"
        decoding="async"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
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
                    ? "scale-125 bg-white"
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

  // Tell the browser how wide each grid image really is
  const sizes =
    cols === 3
      ? "(min-width: 1024px) 33vw, 50vw"
      : "(min-width: 1024px) 50vw, 100vw";

  return (
    <div
      className={`grid gap-3 ${
        cols === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
      }`}
    >
      {images.map((img, i) => (
        <figure key={i} className="overflow-hidden rounded-3xl">
          <img
            src={optimizeImage(img.url, 960)}
            srcSet={srcSetFor(img.url, [480, 720, 960, 1440])}
            sizes={sizes}
            alt={img.alt || `Image ${i + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
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