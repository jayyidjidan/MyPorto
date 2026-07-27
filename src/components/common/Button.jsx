export default function Button({
  children,
  variant = "primary", // "primary" | "secondary"
  className = "",
  ...props
}) {
  const base =
    "inline-flex h-14 min-w-[116px] items-center justify-center gap-2.5 rounded-full px-6 font-body transition-all duration-150";

  const variants = {
    primary:
      "text-white-1 border-[3px] border-border-default bg-black-gradient-2 shadow-btn-inset " +
      "hover:border-border-hover " +
      "active:border-border-default active:bg-pressed-primary active:bg-none",

    secondary:
      "border-[0.7px] border-gray-1 bg-grey-gradient text-black-400" +
      "hover:shadow-btn-inset-light " +
      "active:bg-pressed-secondary active:bg-none",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}