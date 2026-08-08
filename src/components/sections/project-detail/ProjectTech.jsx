import { getImageUrl } from "../../../api/projects";

export default function ProjectTech({ project }) {
  const technologies = project?.technologies || [];

  if (technologies.length === 0) return null;

  // Pick the "featured" tech (middle one) or first one
  const featuredIndex = Math.floor(technologies.length / 2);

  return (
    <section className="flex w-full overflow-hidden flex-col items-center justify-center gap-10 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">
      <h2 className="text-h2 text-black-400">Tech Used</h2>

      <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
        {technologies.map((tech, i) => {
          const isFeatured = i === featuredIndex;
          return (
            <div
              key={i}
              className={`flex flex-nowrap rounded-full px-8 lg:px-12 py-4 lg:py-6 gap-4 items-center justify-center transition-all duration-200
                ${isFeatured
                  ? "bg-black-400 shadow-2xl scale-110"
                  : "bg-black-400/50"
                }`}
            >
              {tech.icon && (
                <img
                  src={getImageUrl(tech.icon)}
                  alt={tech.name}
                  className="w-6 h-6 lg:w-10 lg:h-10 shrink-0 object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              <h2 className="text-h4 lg:text-[32px] text-white-2 whitespace-nowrap">
                {tech.name}
              </h2>
            </div>
          );
        })}
      </div>
    </section>
  );
}