export default function Textarea({
  label,
  required = false,
  rows = 6,
  ...props
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      {label && (
        <label
          htmlFor={props.id}
          className="text-body text-black-400"
        >
          {label}
          {required && (
            <span className="text-red-500">*</span>
          )}
        </label>
      )}

      <textarea
        {...props}
        rows={rows}
        className="w-full resize-none rounded-2xl bg-grey-100 p-4 outline-none"
      />
    </div>
  );
}