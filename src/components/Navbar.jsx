import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const { theme, setTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 mb-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          NASA APOD
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/favourites" className={linkClass}>
            Favourites
          </NavLink>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
