import { getImageUrl } from "../../../api/projects";

export default function ProjectProcess({ project }) {
  const processes = project?.processes || [];

  // 1. Extract all images from all processes into a single flat array
  const allImages = processes.flatMap((p) => p.images || []);

  // 2. Group the flat list of images into pairs (chunks of 2) for the layout
  const imagePairs = [];
  for (let i = 0; i < allImages.length; i += 2) {
    imagePairs.push(allImages.slice(i, i + 2));
  }

  return (
    <section className="flex w-full flex-col min-h-screen items-start gap-14 lg:gap-30 px-4 py-12 lg:py-12 lg:px-32">
      <div className="flex gap-1">
        <h2 className="text-h2 text-black-400">Process</h2>
      </div>

      {/* Timeline */}
      {processes.length > 0 && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
          {processes.map((process, i) => (
            <div
              key={i}
              // Added flex-1 and min-w-0 to allow the flex item to shrink and share space
              className="flex flex-1 items-start w-full min-w-0"
              style={{ paddingTop: `${i * 3}rem` }}>
              {/* Added min-w-0 here as well to pass the shrinkability down */}
              <div className="flex flex-col gap-2 pr-4 border-0 lg:border-r-1 border-[#c9c9c9] w-full min-w-0">
                <h3 className="text-h3 text-black-400">
                  {i + 1}. {process.title}
                </h3>
                {/* Added break-all to strictly force unbroken gibberish text to wrap */}
                <h5 className="text-h5 text-black-400/50 w-full break-all whitespace-normal">
                  {process.description}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Process images */}
      {imagePairs.length > 0 && (
        <div className="flex flex-col w-full gap-6">
          {imagePairs.map((pair, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-col lg:flex-row w-full h-[500px] items-center justify-center gap-4"
            >
              {pair.map((img, imgIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                const isFirstImage = imgIndex === 0;

                const widthClass =
                  (isEvenRow && !isFirstImage) || (!isEvenRow && isFirstImage)
                    ? "w-full lg:w-[900px]"
                    : "w-full";

                return (
                  <img
                    key={imgIndex}
                    src={getImageUrl(img)}
                    alt={`Process image ${rowIndex}-${imgIndex}`}
                    className={`h-full rounded-4xl object-cover ${widthClass}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}