import { useState } from "react";

export default function TagInput({
  label,
  tags,
  setTags,
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) return;

    setTags([...tags, value]);

    setInput("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex w-full flex-col gap-2.5">
      <label className="text-body text-black-400">
        {label}
      </label>

      <div className="flex min-h-14 flex-wrap items-center gap-2 w-full rounded-2xl bg-grey-100 p-3">

        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 rounded-full bg-black-400 px-4 py-2 text-white"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
            >
              ×
            </button>
          </div>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Type then press Enter"
          className="flex-1 bg-transparent outline-none"
        />

      </div>
    </div>
  );
}