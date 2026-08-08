export default function Checkbox({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-black-400"
      />

      <span className="text-body text-black-400">
        {label}
      </span>
    </label>
  );
}