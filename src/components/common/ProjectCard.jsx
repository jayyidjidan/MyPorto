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
      className="group flex h-full w-full max-w-[397px] flex-col items-start justify-between gap-8 py-8 opacity-50 transition-opacity duration-300 hover:opacity-100 lg:flex-1 lg:gap-12"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-h2">{title}</h2>
        </div>

        {/* flex-wrap: chip tidak lagi dipaksa menyusut, jadi teksnya tidak pecah jadi 2 baris */}
        <div className="flex flex-wrap items-start gap-1 [&>*]:whitespace-nowrap">
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