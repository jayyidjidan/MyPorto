import Chip from "../../common/Chip";

export default function ProjectOverview({ project }) {
  const overview = project?.overview || {};
  const categories = overview.categories || [];

  return (
    <section className="flex flex-col lg:flex-row w-full items-start gap-12 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">
      <div className="flex flex-col gap-6 items-start w-full">
        <h3 className="text-h2 text-black-400">Overview</h3>
        <h5 className="text-h5 text-black-400/50 w-full lg:w-[536px] break-words whitespace-normal">
          {overview.description}
        </h5>
      </div>

      <div className="flex flex-col gap-6 justify-center items-start w-full h-full">
        {/* Duration */}
        <div className="flex flex-col gap-6 items-start">
          <h5 className="text-h5 text-black-400/50">Time</h5>
          <h3 className="text-h3 text-black-400">{overview.duration || "—"}</h3>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-6 items-start">
            <h5 className="text-h5 text-black-400/50">Categories</h5>
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <Chip key={cat} variant="medium">{cat}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}