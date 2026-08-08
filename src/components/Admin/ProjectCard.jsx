import Button from "../common/Button";
import { getImageUrl } from "../../api/projects";

export default function ProjectCard({
  id,
  title,
  createdAt,
  thumbnail,
  onEdit,
  onDelete,
}) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      onDelete(id);
    }
  };

  return (
    <div className="flex h-[322px] w-[422px] flex-col rounded-3xl border border-[#B1B1B1]/70 bg-[#fafafa] overflow-hidden">
      <div
        className="h-full w-full rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: thumbnail
            ? `url(${getImageUrl(thumbnail)})`
            : "linear-gradient(to bottom, #d9d9d9, #bfbfbf)",
        }}
      >
        <div className="flex h-full w-full items-start justify-end gap-2 p-6">
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => onEdit(id)}>
            Edit
          </Button>
        </div>
      </div>

      <div className="flex w-full items-center justify-between p-6">
        <h3 className="text-h3 text-black-400">{title}</h3>

        <p className="text-right text-p text-black-400/50">
          Created At
          <br />
          {createdAt}
        </p>
      </div>
    </div>
  );
}