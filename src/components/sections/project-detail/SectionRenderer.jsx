import BlockRenderer from "./BlockRenderer";

export default function SectionRenderer({ section }) {
  if (!section) return null;

  const { name, blocks = [] } = section;

  return (
    <section className="w-full px-4 py-8 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Section name — dark rounded banner */}
        {name && (
          <div className="mb-10 flex w-full items-center justify-center rounded-[28px] bg-black-gradient-2 px-6 py-8 lg:mb-16 lg:rounded-[40px] lg:py-12">
            <h2
              className="text-center font-medium text-white"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(32px, 5vw, 68px)",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}
            >
              {name}
            </h2>
          </div>
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