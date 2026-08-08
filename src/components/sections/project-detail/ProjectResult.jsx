import { useState } from "react";
import { getImageUrl } from "../../../api/projects";

export default function ProjectResult({ project }) {
  const results = project?.results || [];
  const [active, setActive] = useState(0);

  if (results.length === 0) return null;

  const activeResult = results[active];

  return (
    <section className="flex w-full flex-col min-h-screen items-start gap-8 lg:gap-16 px-4 py-12 lg:py-12 lg:px-32">
      <div className="flex gap-1">
        <h2 className="text-h2 text-black-400">Results</h2>
      </div>

      <div className="flex flex-col lg:flex-row w-full items-center h-auto lg:h-[500px] gap-8 lg:gap-16 justify-center">
        {/* Feature list */}
        <div className="flex flex-col w-full">
          {results.map((result, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`flex flex-col gap-6 py-8 w-full border-b border-[#c9c9c9] text-left transition-opacity duration-200
                ${i === active ? "opacity-100" : "opacity-40 hover:opacity-70"}
                ${i === results.length - 1 ? "border-0" : ""}
              `}
            >
              <h2 className="text-h2 text-black-400">{result.title}</h2>
              <h5 className="text-h5 text-black-400/50 w-full">{result.description}</h5>
            </button>
          ))}
        </div>

        {/* Active result image */}
        {activeResult?.images?.[0] ? (
          <img
            src={getImageUrl(activeResult.images[0])}
            alt={activeResult.title}
            className="w-full h-64 sm:h-80 lg:h-[500px] object-cover rounded-4xl"
          />
        ) : (
          <div className="w-full h-64 sm:h-80 lg:h-[500px] rounded-4xl bg-gray-400" />
        )}
      </div>
    </section>
  );
}