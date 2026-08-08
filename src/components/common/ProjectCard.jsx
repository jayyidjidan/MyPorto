import Button from "./Button";
import Chip from "./Chip";
import { Link } from "react-router-dom";

export default function ProjectCard({
  title,
  description,
  tags = [],
  image,
  href = "#",
}) {
  return (
    <Link
      to={href}
      className="group flex h-full w-full max-w-[397px] flex-col items-start justify-between gap-8 py-8 opacity-50 transition-opacity duration-300 hover:opacity-100 lg:flex-1 lg:gap-0"
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <h2 className="text-h2">{title}</h2>
          <p className="text-body text-black-400/50 w-full break-words whitespace-normal">{description}</p>
        </div>

        <div className="flex items-start gap-1">
          {tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>

      <div
        className="flex h-[240px] w-full items-center justify-center rounded-4xl bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button variant="primary">View Project</Button>
        </div>
      </div>
    </Link>
  );
}