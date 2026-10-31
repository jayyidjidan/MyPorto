import BlockRenderer from "./BlockRenderer";

export default function SectionRenderer({ section }) {
  if (!section) return null;

  const { name, blocks = [] } = section;

  return (
    <section className="w-full px-4 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section name */}
        {name && (
          <h2
            className="mb-8 text-left font-semibold text-black-400"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}
          >
            {name}
          </h2>
        )}

        {/* Blocks */}
        <div className="flex flex-col gap-8">
          {blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}