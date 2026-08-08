import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../../components/layout/AdminNavbar";
import ProjectCard from "../../components/Admin/ProjectCard";
import Button from "../../components/common/Button";
import { getProjects, deleteProject } from "../../api/projects";

export default function AdminHome() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = () => {
    setLoading(true);
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="flex min-h-screen flex-col gap-1 bg-[#e6e6e6]">
      <AdminNavbar />

      <section className="flex flex-1 flex-col items-start gap-12 rounded-t-[24px] bg-white px-12 py-10">
        <div className="flex w-full items-end justify-between">
          <h1 className="text-h2 text-black-400 w-[300px]">
            Whatsupp, Homie Jayyid
          </h1>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/add-project")}
          >
            Add Project
          </Button>
        </div>

        {loading && (
          <p className="text-body text-black-400/50">Loading projects…</p>
        )}

        {error && (
          <p className="text-body text-red-500">Error: {error}</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-body text-black-400/50">
            No projects yet. Click "Add Project" to get started.
          </p>
        )}

        <div className="flex w-full flex-wrap gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.hero?.title}
              createdAt={formatDate(project.createdAt)}
              thumbnail={project.hero?.coverImage}
              onEdit={(id) => navigate(`/admin/edit-project/${project.slug}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}