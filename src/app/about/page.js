"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import clsx from "clsx";

export default function About() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "w-screen h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="p-8 text-2xl font-bold">About Page</div>
      <div className="p-8">This is the About page for the CWA Project.</div>
    </div>
  );
}
