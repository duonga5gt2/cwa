"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import clsx from "clsx";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={clsx(
        "w-full flex items-center justify-between px-6 py-4 shadow-md transition-colors duration-300",
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      )}
    >
      {/* Left: Logo or Title */}
      <div className="text-xl font-semibold">🌐 CWA Project</div>

      {/* Right: Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={clsx(
          "px-4 py-1.5 text-sm font-medium rounded transition-colors duration-300 border",
          theme === "dark"
            ? "bg-zinc-800 text-white border-white/20 hover:bg-zinc-700"
            : "bg-gray-100 text-black border-black/10 hover:bg-gray-200"
        )}
      >
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </nav>
  );
};

export default Navbar;
