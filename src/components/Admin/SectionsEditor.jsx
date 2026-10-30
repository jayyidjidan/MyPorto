import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import BlockEditor from "./BlockEditor";

const input =
  "w-full rounded-xl border border-grey-100 bg-white px-4 py-2.5 text-sm text-black-400 outline-none transition focus:border-black-400/40 focus:ring-2 focus:ring-black-400/10";
const label =
  "block text-xs font-semibold uppercase tracking-wider text-black-400/50 mb-1";

function newSection() {
  return {
    id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    order: 0,
    blocks: [],
  };
}

export default function SectionsEditor({ sections, onChange, onFile }) {
  const [openIdx, setOpenIdx] = useState(null);

  const updateSection = (idx, updated) => {
    onChange(sections.map((s, i) => (i === idx ? updated : s)));
  };

  const addSection = () => {
    const next = [...sections, { ...newSection(), order: sections.length }];
    onChange(next);
    setOpenIdx(next.length - 1);
  };

  const removeSection = (idx) => {
    const next = sections.filter((_, i) => i !== idx);
    onChange(next);
    if (openIdx === idx) setOpenIdx(null);
  };

  const moveSection = (idx, dir) => {
    const next = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    // Recompute order values
    onChange(next.map((s, i) => ({ ...s, order: i })));
    setOpenIdx(target);
  };

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section, sIdx) => {
        const isOpen = openIdx === sIdx;
        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-2xl border border-grey-100 bg-white"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-4">
              {/* Name input */}
              <div className="flex-1">
                <label className={label}>Section Name</label>
                <input
                  className={input}
                  value={section.name}
                  placeholder="e.g. Overview, Research, Final Design…"
                  onChange={(e) =>
                    updateSection(sIdx, { ...section, name: e.target.value })
                  }
                />
              </div>

              {/* Controls */}
              <div className="flex flex-shrink-0 items-center gap-1 pt-5">
                <button
                  type="button"
                  onClick={() => moveSection(sIdx, -1)}
                  disabled={sIdx === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-black-400/40 hover:bg-grey-100 hover:text-black-400 disabled:opacity-30"
                >
                  <ChevronUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(sIdx, 1)}
                  disabled={sIdx === sections.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-black-400/40 hover:bg-grey-100 hover:text-black-400 disabled:opacity-30"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : sIdx)}
                  className="flex h-8 items-center justify-center rounded-lg px-3 text-xs font-semibold text-black-400/60 hover:bg-grey-100 hover:text-black-400"
                >
                  {isOpen ? "Collapse" : `Edit blocks (${section.blocks?.length ?? 0})`}
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(sIdx)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Block editor — shown when open */}
            {isOpen && (
              <div className="border-t border-grey-100 bg-[#f4f4f4] px-5 py-4">
                <BlockEditor
                  sIdx={sIdx}
                  blocks={section.blocks || []}
                  onChange={(blocks) => updateSection(sIdx, { ...section, blocks })}
                  onFile={onFile}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Add section */}
      <button
        type="button"
        onClick={addSection}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-grey-100 py-4 text-sm font-medium text-black-400/50 transition hover:border-black-400/30 hover:text-black-400"
      >
        <Plus size={16} />
        Add Section
      </button>
    </div>
  );
}
