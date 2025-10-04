import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-3 py-2 font-semibold text-xl text-gray-700  transition ${
            isActive
              ? "bg-[#CAEB66] px-5 py-2 rounded-full after:w-full"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/send_parcel"
        className={({ isActive }) =>
          `relative px-3 py-2 font-semibold text-xl text-gray-700  transition ${
            isActive
              ? "bg-[#CAEB66] px-5 py-2 rounded-full after:w-full"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        Send Parcel
      </NavLink>
      {
        user && <>
          <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `relative px-3 py-2 font-semibold text-xl text-gray-700  transition ${
            isActive
              ? "bg-[#CAEB66] px-5 py-2 rounded-full after:w-full"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        Dashboard
      </NavLink>
        </>
      }

      <NavLink
        to="/coverage"
        className={({ isActive }) =>
          `relative px-3 py-2 font-semibold text-xl text-gray-700  transition ${
            isActive
              ? "bg-[#CAEB66] px-5 py-2 rounded-full after:w-full"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        Coverage
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-100 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-3 bg-white rounded-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">{navItems}</nav>

        {/* CTA Button */}
        {user ? (
          <>
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="px-5 py-2 cursor-pointer rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:block">
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          </>
        )}

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
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 cursor-pointer rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
