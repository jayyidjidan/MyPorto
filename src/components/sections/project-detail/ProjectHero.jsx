import Button from "../../common/Button";
import { getImageUrl } from "../../../api/projects";

export default function ProjectHero({ project }) {
  const hero = project?.hero || {};

  return (
    <section className="flex flex-col min-h-screen w-full justify-between lg:justify-start gap-6 lg:gap-14 px-4 py-12 lg:py-12 lg:px-32">

      <div className="flex flex-col lg:flex-row items-start lg:items-end gap-25 lg:gap-0 justify-between w-full">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-h1 text-black-400">{hero.title}</h1>
        </div>

        <div className="flex gap-2">
          {hero.showSource && hero.sourceUrl && (
            <a href={hero.sourceUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">See Source</Button>
            </a>
          )}
          {hero.showPreview && hero.previewUrl && (
            <a href={hero.previewUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">See Preview</Button>
            </a>
          )}
        </div>
      </div>

      {hero.coverImage ? (
        <img
          src={getImageUrl(hero.coverImage)}
          alt={hero.title}
          className="w-full h-[600px] rounded-4xl object-cover"
        />
      ) : (
        <div className="bg-gray-400 w-full h-[600px] rounded-4xl" />
      )}
    </section>
  );
}