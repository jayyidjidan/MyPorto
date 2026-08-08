export default function Select({
  label,
  required = false,
  options = [],
  ...props
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      {label && (
        <label className="text-body text-black-400">
          {label}
          {required && (
            <span className="text-red-500">*</span>
          )}
        </label>
      )}

      <select
        {...props}
        className="h-14 w-full rounded-2xl bg-grey-100 px-4 outline-none"
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}