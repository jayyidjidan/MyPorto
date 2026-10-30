import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProjectHero({ project }) {
  const navigate = useNavigate();

  const { title = "", category = "", scope = [], duration = "" } = project || {};

  return (
    <section className="w-full px-4 py-6 lg:px-8 lg:py-8">
      {/* Dark hero card */}
      <div
        className="relative w-full overflow-hidden rounded-3xl px-8 py-10 lg:px-14 lg:py-14"
        style={{
          background:
            "linear-gradient(110deg, #111111 0%, #1c1c1c 45%, #2a2a2a 100%)",
          minHeight: "280px",
        }}
      >
        {/* Subtle radial glow top-right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Back Home pill */}
        <div className="mb-10 lg:mb-14">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back Home
          </button>
        </div>

        {/* Project title */}
        <h1
          className="mb-10 text-left font-bold text-white lg:mb-14"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Left: Category */}
          <div className="flex flex-col gap-2">
            {category && (
              <>
                <span
                  className="text-xs font-medium uppercase tracking-widest text-white/40"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                    {category}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Center: Scope */}
          {scope.length > 0 && (
            <div className="flex flex-col gap-2">
              <span
                className="text-xs font-medium uppercase tracking-widest text-white/40"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Scope
              </span>
              <div className="flex flex-wrap gap-2">
                {scope.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Right: Duration */}
          {duration && (
            <p
              className="text-sm text-white/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="font-semibold text-white/90">Duration</span>
              {": "}
              {duration}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}