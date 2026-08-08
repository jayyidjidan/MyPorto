export default function Input({
  label,
  required = false,
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

      <input
        {...props}
        className="h-14 w-full rounded-2xl bg-grey-100 p-4 outline-none"
      />
    </div>
  );
}