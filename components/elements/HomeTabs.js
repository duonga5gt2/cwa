"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useHome } from "../../contexts/HomeContext";

export default function HomeTabs() {
  const { theme } = useTheme();
  const { activeTab, setActiveTab } = useHome();

  const setCookie = (name, value, days = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  };
  const getCookie = (name) => {
    const match = document.cookie
      .split("; ")
      .find((r) => r.startsWith(name + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
  };

  useEffect(() => {
    const saved = getCookie("homeTabIndex");
    if (saved !== null) setActiveTab(Number(saved) || 0);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setCookie("homeTabIndex", String(index));
  };

  const isDark = theme === "dark";

  const tabStyle = (index) => ({
    flex: 1,
    textAlign: "center",
    padding: "12px 0",
    border: "1px solid",
    borderColor: isDark ? "#333" : "#ccc",
    borderBottom: "none",
    background:
      activeTab === index
        ? isDark
          ? "#18181b"
          : "#fff"
        : isDark
        ? "#27272a"
        : "#f3f4f6",
    cursor: "pointer",
    fontWeight: activeTab === index ? "bold" : "normal",
    color: isDark ? "#fff" : "#111",
  });

  const panelStyle = {
    border: "1px solid",
    borderColor: isDark ? "#333" : "#ccc",
    padding: "16px",
    color: isDark ? "#fff" : "#111",
    background: isDark ? "#18181b" : "#fff",
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: `1px solid ${isDark ? "#333" : "#ccc"}`,
        }}
      >
        <button style={tabStyle(3)} onClick={() => handleTabClick(3)}>
          Tabs
        </button>
        <button style={tabStyle(0)} onClick={() => handleTabClick(0)}>
          Escape Room
        </button>
        <button style={tabStyle(1)} onClick={() => handleTabClick(1)}>
          Coding Races
        </button>
        <button style={tabStyle(2)} onClick={() => handleTabClick(2)}>
          Court Room
        </button>
      </div>
    </div>
  );
}
