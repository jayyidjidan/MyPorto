import NavLink from "../common/NavLink";

export default function Navbar({
  variant = "black",
  className = "",
}) {
  const base =
    "flex w-[575px] h-16 px-10 items-center justify-between rounded-full";

  const variants = {
    black: "bg-grey-100",
    white: "",
  };

  return (
    <nav className={`${base} ${variants[variant]} ${className}`}>
      <NavLink href="#home" variant={variant}>
        Home
      </NavLink>

      <NavLink href="#about" variant={variant}>
        About
      </NavLink>

      <NavLink href="#projects" variant={variant}>
        Projects
      </NavLink>

      <NavLink href="#contact" variant={variant}>
        Contact
      </NavLink>
    </nav>
  );
}