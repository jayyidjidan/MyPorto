import { useCallback, useEffect, useRef, useState } from "react";

// Ganti image & credentialUrl sesuai masing-masing sertifikat.
const certificates = [
  {
    id: 1,
    title: "Katalon Practicioner Level",
    issuer: "Katalon Academy",
    image: "/assets/Katalon.png",
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "Junior Web Developer",
    issuer: "BNSP",
    image: "/assets/Katalon.png", // ganti dengan gambar sertifikat BNSP
    credentialUrl: "#",
  },
  {
    id: 3,
    title: "Frontend Web Development",
    issuer: "Coding Studio",
    image: "/assets/Katalon.png", // ganti dengan gambar sertifikat Coding Studio
    credentialUrl: "#",
  },
];

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

function ChevronIcon({ direction = "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

const buttonPrimary =
  "border-border-default bg-black-gradient-2 text-white-2 shadow-btn-inset hover:border-border-hover";
const buttonSecondary =
  "border-gray-1 bg-grey-gradient text-black-400 shadow-btn-inset-light";

function NavButton({ variant, direction, label, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex size-14 items-center justify-center rounded-full border-[3px] transition duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${
        variant === "primary" ? buttonPrimary : buttonSecondary
      }`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function CertificateCard({ title, issuer, image, credentialUrl }) {
  return (
    <article
      data-card
      className="flex h-[538px] w-[calc(100vw-2rem)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[56px] bg-grey-100 p-6 lg:h-[629px] lg:w-[474px] lg:rounded-[64px] lg:p-8"
    >
      {/* Credencial */}
      <div className="flex justify-end">
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className={`text-h5 inline-flex h-14 items-center justify-center rounded-full border-[3px] px-[22px] transition duration-200 active:scale-95 ${buttonPrimary}`}
        >
          Credencial
        </a>
      </div>

      {/* Gambar sertifikat: sengaja dibiarkan terpotong di sisi kanan card */}
      <div className="flex min-h-0 flex-1 items-center">
        <img
          src={image}
          alt={`${title} certificate`}
          draggable={false}
          className="ml-12 h-[221px] w-auto max-w-none shrink-0 rounded-[24px] shadow-[0_28px_40px_-12px_rgba(0,0,0,0.3)] lg:ml-[84px] lg:h-[286px]"
        />
      </div>

      {/* Judul */}
      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-black-400 lg:font-normal!">{title}</h3>
        <p className="text-h4 text-grey-400/80">{issuer}</p>
      </div>
    </article>
  );
}

export default function Certif() {
  const scrollerRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, [updateButtons]);

  // Geser sebanyak 1 card (lebar card + gap)
  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    const card = el?.querySelector("[data-card]");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  // Drag pakai mouse (di HP/tablet sudah otomatis bisa di-swipe)
  const handlePointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.style.scrollSnapType = "none"; // matikan snap sementara saat drag
  };

  const handlePointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    scrollerRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    scrollerRef.current.style.scrollSnapType = ""; // snap aktif lagi
  };

  // Kalau habis drag, jangan ikut klik link "Credencial"
  const handleClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      id="certif"
      aria-label="Certificate"
      className="flex min-h-screen w-full flex-col justify-start gap-8 px-4 py-12 lg:gap-18 lg:px-12 lg:py-25"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <AnimatedItem className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-grey-400">
            <PlusIcon />
            <p className="text-body">Certificate</p>
          </div>
          <h1 className="text-h1 text-gradient-black-1 max-w-[424px] text-left!">
            Proof of My Knowledge
          </h1>
        </AnimatedItem>

        <AnimatedItem delay={100} className="flex gap-1 self-end lg:self-auto">
          <NavButton
            variant="secondary"
            direction="left"
            label="Previous certificate"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
          />
          <NavButton
            variant="primary"
            direction="right"
            label="Next certificate"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
          />
        </AnimatedItem>
      </div>

      {/* Carousel: mulai sejajar dengan padding section, tapi melebar sampai tepi layar */}
      <AnimatedItem delay={200} className="-mx-4 lg:-mx-12">
        <div
          ref={scrollerRef}
          onScroll={updateButtons}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={handleClickCapture}
          className="flex cursor-grab snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 select-none active:cursor-grabbing lg:scroll-px-12 lg:gap-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} {...cert} />
          ))}
        </div>
      </AnimatedItem>
    </section>
  );
}