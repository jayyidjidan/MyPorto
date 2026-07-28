import { Menu } from "lucide-react";
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
    <>
      {/* Desktop nav — your original, just hidden below lg */}
      <nav className={`hidden lg:flex ${base} ${variants[variant]} ${className}`}>
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

      {/* Mobile nav — 64x64 circle with hamburger icon */}
      <button
        type="button"
        aria-label="Open menu"
        className={`flex h-16 w-16 items-center justify-center rounded-full lg:hidden ${variants[variant]} ${className}`}
      >
        <Menu
          size={32}
          color={variant === "black" ? "#111111" : "#FDFDFD"}
          strokeWidth={1}
        />
      </button>
    </>
  );
}