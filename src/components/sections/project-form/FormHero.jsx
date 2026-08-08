import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";

export default function FormHero({ title = "Add Project" }) {
  const navigate = useNavigate();

  return (
    <nav className="flex w-full items-center justify-between bg-white-1 px-12 py-12 rounded-3xl">
      <div className="flex items-center gap-4">
        <Button variant="secondary" type="button" onClick={() => navigate("/admin")}>
          ← Back
        </Button>
        <h2 className="text-[40px] text-black-400">{title}</h2>
      </div>
    </nav>
  );
}