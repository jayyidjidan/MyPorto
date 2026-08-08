export default function FileInput({
  label,
  required = false,
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

      <input
        type="file"
        {...props}
        className="w-full rounded-2xl border border-dashed border-[#B1B1B1] bg-grey-100 p-4 file:mr-4 file:rounded-xl file:border-0 file:bg-black-400 file:px-4 file:py-2 file:text-white"
      />
    </div>
  );
}