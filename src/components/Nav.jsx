import { Link, NavLink } from "react-router";
import { useState } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-3 py-2 font-medium transition ${
            isActive
              ? "text-blue-600 after:w-full"
              : "text-gray-700 hover:text-blue-600"
          } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `relative px-3 py-2 font-medium transition ${
            isActive
              ? "text-blue-600 after:w-full"
              : "text-gray-700 hover:text-blue-600"
          } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full`
        }
      >
        About Us
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">{navItems}</nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/get-started"
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-md">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navItems}
            <Link
              to="/get-started"
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
