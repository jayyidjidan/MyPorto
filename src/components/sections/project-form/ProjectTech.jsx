import { useState } from "react";
import Input from "../../Admin/Input";

export default function ProjectTech({ formData, setFormData }) {
  const [techName, setTechName] = useState("");
  const [techIcon, setTechIcon] = useState("");

  const addTech = () => {
    if (!techName.trim()) return;
    setFormData({
      ...formData,
      technologies: [
        ...(formData.technologies || []),
        { name: techName.trim(), icon: techIcon.trim() },
      ],
    });
    setTechName("");
    setTechIcon("");
  };

  const removeTech = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <section className="flex flex-col w-full p-12 bg-white gap-6 rounded-3xl">
      <h3 className="text-h3 text-black-400">Project Technologies</h3>

      <div className="flex flex-col lg:flex-row gap-4 items-end w-full">
        <Input
          id="techName"
          name="techName"
          label="Tech Name"
          placeholder="e.g. React JS"
          value={techName}
          onChange={(e) => setTechName(e.target.value)}
        />
        <Input
          id="techIcon"
          name="techIcon"
          label="Icon URL (optional)"
          placeholder="https://... or /uploads/..."
          value={techIcon}
          onChange={(e) => setTechIcon(e.target.value)}
        />
        <button
          type="button"
          onClick={addTech}
          className="h-14 px-6 bg-black-400 text-white rounded-2xl whitespace-nowrap text-body hover:bg-black-400/80 transition-colors flex-shrink-0"
        >
          + Add Tech
        </button>
      </div>

      {/* Tech pills preview */}
      {(formData.technologies || []).length > 0 && (
        <div className="flex flex-wrap gap-3">
          {formData.technologies.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full bg-black-400 text-white px-4 py-2"
            >
              {tech.icon && (
                <img
                  src={tech.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              <span className="text-body">{tech.name}</span>
              <button
                type="button"
                onClick={() => removeTech(i)}
                className="ml-1 hover:text-red-300 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}