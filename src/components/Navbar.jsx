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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        
        {/* Title and Intro */}
        <div className="max-w-xl">
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 block mb-1"
          >
            NASA APOD
          </NavLink>
          <p className="text-sm text-gray-700 dark:text-gray-400 leading-snug">
            Discover a new window into the universe — view NASA's Astronomy Picture of the Day from any date since June 16, 1995.
          </p>
        </div>

        {/* Navigation Links + Theme Toggle */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/favourites" className={linkClass}>
            Favourites
          </NavLink>
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
