import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLink from "../common/NavLink";

export default function Navbar({
  variant = "black",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const base =
    "flex w-[575px] h-16 px-10 items-center justify-between rounded-full";

  const variants = {
    black: "bg-grey-100",
    white: "",
  };

  const links = [
    { label: "Home", href: "#home" },
    { label: "Project", href: "#project" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Desktop nav — original, hidden below lg */}
      <nav className={`hidden lg:flex ${base} ${variants[variant]} ${className}`}>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} variant={variant}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile nav — 64x64 circle toggling menu open/closed */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-16 w-16 items-center justify-center rounded-full ${variants[variant]} ${className}`}
        >
          {isOpen ? (
            <X size={32} color={variant === "black" ? "#111111" : "#FDFDFD"} strokeWidth={1} />
          ) : (
            <Menu size={32} color={variant === "black" ? "#111111" : "#FDFDFD"} strokeWidth={1} />
          )}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 top-20 flex w-56 flex-col gap-2 rounded-3xl bg-grey-100 p-4 shadow-xl">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                variant="black"
                onClick={() => setIsOpen(false)}
                className="w-full py-2"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}