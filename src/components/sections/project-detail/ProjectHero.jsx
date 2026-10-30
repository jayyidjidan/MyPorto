import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../common/Button"; // Adjust the import path as needed
import Chip from "../../common/Chip";     // Adjust the import path as needed

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

        {/* Back Home Button Component */}
        <div className="mb-10 lg:mb-14">
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="text-sm font-medium"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back Home
          </Button>
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
                  <Chip variant="small">{category}</Chip>
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
                  <Chip key={s} variant="small">{s}</Chip>
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