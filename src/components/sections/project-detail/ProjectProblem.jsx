import { getImageUrl } from "../../../api/projects";

export default function ProjectProblem({ project }) {
  const problem = project?.problem || {};
  const images = problem.images || [];

  return (
    <section className="flex w-full flex-col min-h-screen items-center gap-14 lg:gap-30 px-4 py-12 lg:py-12 lg:px-32">
      <div className="flex flex-col lg:flex-row justify-center w-full items-center gap-12 lg:gap-21">
        {/* Problem */}
        <div className="flex flex-col w-full gap-6">
          <h2 className="text-h2 text-black-400">Problem</h2>
          {/* Added break-words, whitespace-normal, and changed lg:w to lg:max-w */}
          <h5 className="text-h5 text-black-400/50 w-full lg:max-w-[536px] break-words whitespace-normal">
            {problem.problem}
          </h5>
        </div>

        {/* Solution */}
        <div className="flex flex-col items-end lg:items-start w-full gap-6 pt-0 lg:pt-14">
          <h2 className="text-h2 text-black-400">Solution</h2>
          {/* Added break-words, whitespace-normal, and changed lg:w to lg:max-w */}
          <h5 className="text-h5 text-black-400/50 text-right lg:text-left w-full lg:max-w-[536px] break-words whitespace-normal">
            {problem.solution}
          </h5>
        </div>
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row w-full h-[700px] lg:h-[500px] items-center justify-center gap-4">
        {images.length > 0 ? (
          images.map((img, i) => (
            <img
              key={i}
              src={getImageUrl(img)}
              alt={`Problem illustration ${i + 1}`}
              className="w-full h-full rounded-4xl object-cover"
            />
          ))
        ) : (
          <>
            <div className="bg-gray-400 w-full h-full rounded-4xl" />
            <div className="bg-gray-400 w-full h-full rounded-4xl" />
          </>
        )}
      </div>
    </section>
  );
}