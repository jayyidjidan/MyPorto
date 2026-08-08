import Input from "../../Admin/Input";
import FileInput from "../../Admin/FileInput";
import Textarea from "../../Admin/Textarea";
import Checkbox from "../../Admin/Checkbox";
import TagInput from "../../Admin/TagInput";

export default function ProjectHeroOverview({
  formData,
  setFormData,
  handleChange,
}) {
  return (
    <section className="flex gap-1 w-full">

      {/* ================= HERO ================= */}

      <div className="flex flex-col gap-6 rounded-3xl bg-white-1 p-12 w-full">
        <h3 className="text-h3 text-black-400">
          Project Hero
        </h3>

        <div className="flex w-full items-stretch gap-6">

          {/* Left Column */}

          <div className="flex flex-1 flex-col justify-between">

            <Input
              id="title"
              name="title"
              label="Project Title"
              placeholder="Enter Project Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-3">

              <p className="text-body text-black-400">
                Button Selection
              </p>

              <Checkbox
                label="Show Source Button"
                checked={formData.showSource}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    showSource: e.target.checked,
                  })
                }
              />

              <Checkbox
                label="Show Preview Button"
                checked={formData.showPreview}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    showPreview: e.target.checked,
                  })
                }
              />

            </div>

          </div>

          {/* Right Column */}

          <div className="flex flex-1 flex-col justify-between">

            <FileInput
              id="coverImage"
              label="Cover Image"
              required
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coverImage: e.target.files[0],
                })
              }
            />

            <div className="flex gap-2">

              <Input
                id="previewUrl"
                name="previewUrl"
                label="Preview URL"
                placeholder="Enter Preview URL"
                value={formData.previewUrl}
                onChange={handleChange}
              />

              <Input
                id="sourceUrl"
                name="sourceUrl"
                label="Source URL"
                placeholder="Enter Source URL"
                value={formData.sourceUrl}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>
      </div>

      {/* ================= OVERVIEW ================= */}

      <div className="flex flex-col gap-6 rounded-3xl bg-white-1 p-12 w-full">

        <h3 className="text-h3 text-black-400">
          Project Overview
        </h3>

        <div className="flex w-full items-stretch gap-6">

          <Textarea
            id="overview"
            name="overview"
            label="Project Overview"
            placeholder="Enter Project Overview"
            value={formData.overview}
            onChange={handleChange}
            required
          />

          <div className="flex flex-1 flex-col w-full justify-between">

            <Input
              id="duration"
              name="duration"
              label="Duration"
              placeholder="Example: 3 Months"
              value={formData.duration}
              onChange={handleChange}
            />

            <TagInput
              label="Categories"
              tags={formData.categories}
              setTags={(tags) =>
                setFormData({
                  ...formData,
                  categories: tags,
                })
              }
            />

          </div>

        </div>

      </div>

    </section>
  );
}