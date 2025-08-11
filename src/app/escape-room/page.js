"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import clsx from "clsx";

export default function EscapeRoom() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "w-screen h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="p-8 text-2xl font-bold">Escape Room</div>
      <div className="p-8">Welcome to the Escape Room challenge!</div>
    </div>
  );
}
