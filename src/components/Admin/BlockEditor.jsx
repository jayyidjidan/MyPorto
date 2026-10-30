import { useRef } from "react";
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Type,
  Image as ImageIcon,
  GalleryHorizontal,
  Grid2x2,
  ExternalLink,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

// ── Helpers ───────────────────────────────────────────────────────────────────
const label =
  "block text-xs font-semibold uppercase tracking-wider text-black-400/50 mb-1";
const input =
  "w-full rounded-xl border border-grey-100 bg-white px-4 py-2.5 text-sm text-black-400 outline-none transition focus:border-black-400/40 focus:ring-2 focus:ring-black-400/10";

function FieldLabel({ children }) {
  return <label className={label}>{children}</label>;
}

// ── Individual block editors ──────────────────────────────────────────────────
function TextBlockEditor({ block, onChange }) {
  return (
    <div>
      <FieldLabel>Rich Text</FieldLabel>
      <RichTextEditor
        content={block.content || ""}
        onChange={(html) => onChange({ ...block, content: html })}
      />
    </div>
  );
}

function ImageBlockEditor({ block, onChange, fileKey, onFile }) {
  const ref = useRef();
  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>Image</FieldLabel>
        {block.url && (
          <img
            src={block.url}
            alt={block.alt || ""}
            className="mb-2 h-24 w-auto rounded-xl object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          ref={ref}
          className="hidden"
          onChange={(e) => onFile(fileKey, e.target.files[0])}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-2 rounded-xl border border-dashed border-grey-100 px-4 py-2.5 text-sm text-black-400/60 transition hover:border-black-400/30 hover:text-black-400"
        >
          <ImageIcon size={14} />
          {block.url ? "Replace image" : "Upload image"}
        </button>
      </div>
      <div>
        <FieldLabel>Alt text</FieldLabel>
        <input
          className={input}
          value={block.alt || ""}
          placeholder="Describe this image…"
          onChange={(e) => onChange({ ...block, alt: e.target.value })}
        />
      </div>
    </div>
  );
}

function CarouselBlockEditor({ block, onChange, sIdx, bIdx, onFile }) {
  const images = block.images || [];

  const addImage = () =>
    onChange({ ...block, images: [...images, { url: "", alt: "" }] });

  const removeImage = (i) =>
    onChange({
      ...block,
      images: images.filter((_, idx) => idx !== i),
    });

  const updateImage = (i, field, value) => {
    const updated = images.map((img, idx) =>
      idx === i ? { ...img, [field]: value } : img
    );
    onChange({ ...block, images: updated });
  };

  return (
    <div className="flex flex-col gap-3">
      <FieldLabel>Carousel Images</FieldLabel>
      {images.map((img, i) => {
        const fileKey = `s${sIdx}_b${bIdx}_img${i}`;
        const ref = useRef();
        return (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-grey-100 bg-white/50 p-3"
          >
            {img.url && (
              <img
                src={img.url}
                alt={img.alt || ""}
                className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="flex flex-1 flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                ref={ref}
                className="hidden"
                onChange={(e) => onFile(fileKey, e.target.files[0])}
              />
              <button
                type="button"
                onClick={() => ref.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-dashed border-grey-100 px-3 py-1.5 text-xs text-black-400/60 hover:border-black-400/30"
              >
                <ImageIcon size={12} />
                {img.url ? "Replace" : "Upload"}
              </button>
              <input
                className={input}
                placeholder="Alt text"
                value={img.alt || ""}
                onChange={(e) => updateImage(i, "alt", e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={addImage}
        className="flex items-center gap-2 rounded-xl border border-dashed border-grey-100 px-4 py-2 text-sm text-black-400/60 hover:border-black-400/30 hover:text-black-400"
      >
        <Plus size={14} /> Add slide
      </button>
    </div>
  );
}

function GridBlockEditor({ block, onChange, sIdx, bIdx, onFile }) {
  const images = block.images || [];

  const addImage = () =>
    onChange({ ...block, images: [...images, { url: "", alt: "" }] });

  const removeImage = (i) =>
    onChange({ ...block, images: images.filter((_, idx) => idx !== i) });

  const updateImage = (i, field, value) => {
    const updated = images.map((img, idx) =>
      idx === i ? { ...img, [field]: value } : img
    );
    onChange({ ...block, images: updated });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div>
          <FieldLabel>Columns</FieldLabel>
          <select
            className={`${input} w-24`}
            value={block.columns || 2}
            onChange={(e) =>
              onChange({ ...block, columns: Number(e.target.value) })
            }
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
      <FieldLabel>Grid Images</FieldLabel>
      {images.map((img, i) => {
        const fileKey = `s${sIdx}_b${bIdx}_img${i}`;
        const ref = useRef();
        return (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-grey-100 bg-white/50 p-3"
          >
            {img.url && (
              <img
                src={img.url}
                alt={img.alt || ""}
                className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="flex flex-1 flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                ref={ref}
                className="hidden"
                onChange={(e) => onFile(fileKey, e.target.files[0])}
              />
              <button
                type="button"
                onClick={() => ref.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-dashed border-grey-100 px-3 py-1.5 text-xs text-black-400/60 hover:border-black-400/30"
              >
                <ImageIcon size={12} />
                {img.url ? "Replace" : "Upload"}
              </button>
              <input
                className={input}
                placeholder="Alt text"
                value={img.alt || ""}
                onChange={(e) => updateImage(i, "alt", e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={addImage}
        className="flex items-center gap-2 rounded-xl border border-dashed border-grey-100 px-4 py-2 text-sm text-black-400/60 hover:border-black-400/30 hover:text-black-400"
      >
        <Plus size={14} /> Add image
      </button>
    </div>
  );
}

function ButtonBlockEditor({ block, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>Button Label</FieldLabel>
        <input
          className={input}
          value={block.label || ""}
          placeholder="e.g. View Prototype"
          onChange={(e) => onChange({ ...block, label: e.target.value })}
        />
      </div>
      <div>
        <FieldLabel>URL</FieldLabel>
        <input
          className={input}
          value={block.href || ""}
          placeholder="https://…"
          onChange={(e) => onChange({ ...block, href: e.target.value })}
        />
      </div>
    </div>
  );
}

// ── Block type icons / labels ─────────────────────────────────────────────────
const BLOCK_TYPES = [
  { type: "text", label: "Text", icon: Type },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "carousel", label: "Carousel", icon: GalleryHorizontal },
  { type: "grid", label: "Grid", icon: Grid2x2 },
  { type: "button", label: "Button", icon: ExternalLink },
];

function newBlock(type) {
  const base = { type };
  if (type === "text") return { ...base, content: "" };
  if (type === "image") return { ...base, url: "", alt: "" };
  if (type === "carousel") return { ...base, images: [] };
  if (type === "grid") return { ...base, columns: 2, images: [] };
  if (type === "button") return { ...base, label: "", href: "" };
  return base;
}

// ── BlockEditor: manages blocks within one section ────────────────────────────
export default function BlockEditor({ sIdx, blocks, onChange, onFile }) {
  const updateBlock = (bIdx, updated) => {
    const next = blocks.map((b, i) => (i === bIdx ? updated : b));
    onChange(next);
  };

  const removeBlock = (bIdx) => {
    onChange(blocks.filter((_, i) => i !== bIdx));
  };

  const moveBlock = (bIdx, dir) => {
    const next = [...blocks];
    const target = bIdx + dir;
    if (target < 0 || target >= next.length) return;
    [next[bIdx], next[target]] = [next[target], next[bIdx]];
    onChange(next);
  };

  const addBlock = (type) => {
    onChange([...blocks, newBlock(type)]);
  };

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, bIdx) => {
        const fileKey = `s${sIdx}_b${bIdx}_img0`;
        const Icon = BLOCK_TYPES.find((t) => t.type === block.type)?.icon || Type;

        return (
          <div
            key={bIdx}
            className="rounded-2xl border border-grey-100 bg-[#f8f8f8] p-4"
          >
            {/* Block header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={14} className="text-black-400/50" />
                <span className="text-xs font-semibold uppercase tracking-wider text-black-400/50">
                  {BLOCK_TYPES.find((t) => t.type === block.type)?.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveBlock(bIdx, -1)}
                  disabled={bIdx === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-black-400/40 transition hover:bg-grey-100 hover:text-black-400 disabled:opacity-30"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(bIdx, 1)}
                  disabled={bIdx === blocks.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-black-400/40 transition hover:bg-grey-100 hover:text-black-400 disabled:opacity-30"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(bIdx)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Block content editor */}
            {block.type === "text" && (
              <TextBlockEditor
                block={block}
                onChange={(b) => updateBlock(bIdx, b)}
              />
            )}
            {block.type === "image" && (
              <ImageBlockEditor
                block={block}
                onChange={(b) => updateBlock(bIdx, b)}
                fileKey={fileKey}
                onFile={onFile}
              />
            )}
            {block.type === "carousel" && (
              <CarouselBlockEditor
                block={block}
                onChange={(b) => updateBlock(bIdx, b)}
                sIdx={sIdx}
                bIdx={bIdx}
                onFile={onFile}
              />
            )}
            {block.type === "grid" && (
              <GridBlockEditor
                block={block}
                onChange={(b) => updateBlock(bIdx, b)}
                sIdx={sIdx}
                bIdx={bIdx}
                onFile={onFile}
              />
            )}
            {block.type === "button" && (
              <ButtonBlockEditor
                block={block}
                onChange={(b) => updateBlock(bIdx, b)}
              />
            )}
          </div>
        );
      })}

      {/* Add block buttons */}
      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="flex items-center gap-1.5 rounded-full border border-grey-100 bg-white px-4 py-2 text-xs font-medium text-black-400/70 transition hover:border-black-400/30 hover:bg-grey-100 hover:text-black-400"
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
