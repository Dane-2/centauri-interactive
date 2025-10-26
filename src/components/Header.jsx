import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/apps", label: "Apps" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-black" : "text-black/60 hover:text-black"}`;

  return (
    <header className="sticky top-3 z-40">
      <div className="container-page">
        {/* 3-column frame: [logo] [centered pill] [spacer same size as logo] */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: Logo */}
          <NavLink
            to="/"
            aria-label="Centauri Interactive — Home"
            className="inline-flex items-center gap-2"
          >
            <span className="h-8 w-8 grid place-items-center rounded-full border border-black/20">
              <span className="h-2.5 w-2.5 rounded-full bg-black" />
            </span>
            <span className="text-sm font-medium tracking-wide text-black">
              Centauri Interactive
            </span>
          </NavLink>

          {/* Center: Cylindrical pill */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-full border border-black/10 bg-white/80 backdrop-blur shadow-sm">
              <div className="flex items-center justify-center px-6 py-2">
                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                  {navItems.map(({ to, label, end }) => (
                    <NavLink key={to} to={to} end={end} className={linkClasses}>
                      {label}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile toggle (shown inside pill only on small screens) */}
                <div className="flex justify-end md:hidden">
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label="Toggle navigation"
                  >
                    <span className="sr-only">Menu</span>
                    <span className="block h-0.5 w-5 bg-black" />
                  </button>
                </div>
              </div>

              {/* Mobile nav expands inside the pill */}
              {open && (
                <nav id="mobile-nav" className="md:hidden border-t border-black/10 px-3 py-1">
                  <div className="flex flex-col py-1">
                    {navItems.map(({ to, label, end }) => (
                      <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `py-2 text-sm ${isActive ? "text-black" : "text-black/70"}`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </div>

          {/* Right: Invisible spacer that matches the logo’s footprint to balance centering */}
          <div className="opacity-0 pointer-events-none inline-flex items-center gap-2">
            <span className="h-8 w-8 grid place-items-center rounded-full border border-black/20">
              <span className="h-2.5 w-2.5 rounded-full bg-black" />
            </span>
            <span className="text-sm font-medium tracking-wide">Centauri Interactive</span>
          </div>
        </div>
      </div>
    </header>
  );
}
