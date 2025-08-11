"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import clsx from "clsx";

export default function CodingRaces() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "w-screen h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="p-8 text-2xl font-bold">Coding Races</div>
      <div className="p-8">Join the Coding Races and test your skills!</div>
    </div>
  );
}
