"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import clsx from "clsx";

export default function CourtRoom() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "w-screen h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="p-8 text-2xl font-bold">Court Room</div>
      <div className="p-8">This is the Court Room simulation.</div>
    </div>
  );
}
