export default function NavLink({
  href,
  variant = "black",
  children,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center transition-colors duration-200";

  const variants = {
    black: "text-[#111]/50 hover:text-black-400",
    white: "text-white/50 hover:text-white-1",
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant] ?? variants.black} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}