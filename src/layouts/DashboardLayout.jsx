import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2"></div>
        </div>
        {/* Page content here */}
        <Outlet />
        {/* page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Logo />
        <ul className="menu bg-white text-gray-800 min-h-full w-60 p-4">
          {/* Sidebar content here */}
          <li>
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
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  );
}
