"use client";
import clsx from "clsx";
import Image from "next/image";
import { useTheme } from "../../contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={clsx(
        "w-screen h-screen transition-colors duration-300",
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div>Full</div>
    </div>
  );
}
