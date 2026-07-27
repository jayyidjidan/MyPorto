export default function Chip({
  children,
  variant = "small", // "primary" | "secondary"
  className = "",
  ...props
}) {
  const base = "flex px-5 justify-center items-center rounded-full font-body bg-grey-100 text-black-400"

  const variants = {
    small: "h-[42px]",

    medium: "h-[56px]"
  };


  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
    </span>
  );
}