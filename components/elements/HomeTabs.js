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

  // --- Visual tokens (colors/fonts only; no structure changes) ---
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
  const borderCol = isDark ? "#2a2f3a" : "#e2e8f0";
  const textCol = isDark ? "#e6e7ea" : "#0f172a";
  const textMuted = isDark ? "#a6adbb" : "#475569";

  // fun, colorful gradients per tab (consistent order)
  const tabGradientsDark = [
    "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #f43f5e 100%)", // Tabs
    "linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0ea5e9 100%)", // Escape Room
    "linear-gradient(135deg, #34d399 0%, #10b981 50%, #84cc16 100%)", // Coding Races
    "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #f472b6 100%)", // Court Room
  ];
  const tabGradientsLight = [
    "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 50%, #f9a8d4 100%)",
    "linear-gradient(135deg, #99f6e4 0%, #67e8f9 50%, #93c5fd 100%)",
    "linear-gradient(135deg, #86efac 0%, #34d399 50%, #bef264 100%)",
    "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 50%, #fbcfe8 100%)",
  ];

  const getGrad = (index) =>
    (isDark ? tabGradientsDark : tabGradientsLight)[
      // map index -> gradient (Tabs=3, Escape=0, Coding=1, Court=2)
      index === 3 ? 0 : index === 0 ? 1 : index === 1 ? 2 : 3
    ];

  const tabStyle = (index) => {
    const isActive = activeTab === index;
    return {
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      border: "1px solid",
      borderColor: borderCol,
      borderBottom: "none",
      background: isActive ? getGrad(index) : isDark ? "#171a21" : "#f8fafc",
      cursor: "pointer",
      fontWeight: isActive ? 800 : 600,
      color: isActive ? "#ffffff" : textCol,
      letterSpacing: ".2px",
      fontFamily: fontSans,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      boxShadow: isActive
        ? "0 8px 18px rgba(0,0,0,.25)"
        : isDark
        ? "inset 0 -1px 0 rgba(0,0,0,.35)"
        : "inset 0 -1px 0 rgba(0,0,0,.06)",
      transition: "filter .15s ease, transform .06s ease, box-shadow .2s ease",
      // subtle interactive feel without adding handlers or changing structure
      transform: isActive ? "translateY(0)" : "translateY(0)",
    };
  };

  const panelStyle = {
    border: "1px solid",
    borderColor: borderCol,
    padding: "16px",
    color: textCol,
    background: isDark ? "#0f1115" : "#ffffff",
    fontFamily: fontSans,
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", fontFamily: fontSans }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: `1px solid ${borderCol}`,
          background: isDark
            ? "linear-gradient(180deg, rgba(34,211,238,.12), rgba(0,0,0,0))"
            : "linear-gradient(180deg, rgba(14,165,233,.10), rgba(255,255,255,0))",
          gap: 8,
          padding: 8,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          boxShadow: isDark
            ? "0 10px 28px rgba(0,0,0,.45)"
            : "0 12px 30px rgba(15,23,42,.08)",
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
