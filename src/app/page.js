"use client";
import { useTheme } from "../../contexts/ThemeContext";
import clsx from "clsx";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import HomeTabs from "../../components/elements/HomeTabs";
import { useHome } from "../../contexts/HomeContext";

function TabsGenerator() {
  const { theme } = useTheme();
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ---- Theme tokens (inline, no structural changes) ----
  const isDark = theme === "dark";
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"';
  const fontMono =
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

  const tone = {
    bg: isDark ? "#0b0c0f" : "#f8fafc",
    surface: isDark ? "#111317" : "#ffffff",
    surfaceAlt: isDark ? "#0f1115" : "#f1f5f9",
    text: isDark ? "#e6e7ea" : "#0f172a",
    textMuted: isDark ? "#a6adbb" : "#475569",
    border: isDark ? "#2a2f3a" : "#e2e8f0",
    primary: isDark ? "#22d3ee" : "#0ea5e9", // cyan/blue pop
    primaryHover: isDark ? "#67e8f9" : "#38bdf8",
    success: isDark ? "#34d399" : "#10b981",
    successHover: isDark ? "#6ee7b7" : "#34d399",
    tabIdle: isDark ? "#171a21" : "#ffffff",
    tabActive: isDark ? "#111317" : "#ffffff",
    tabIdleText: isDark ? "#cbd5e1" : "#334155",
  };

  const focusRing = (c = tone.primary) =>
    `0 0 0 3px ${
      isDark ? "rgba(34,211,238,0.25)" : "rgba(14,165,233,0.25)"
    }, 0 1px 1px rgba(0,0,0,0.05)`;

  const tabsForm = (id, name) => {
    return `<button id="tab-${id}" role="tab" aria-controls="panel-${id}"
onclick="openTab('${id}')"
style="
  padding:10px 12px;
  border:1px solid ${tone.border};
  border-bottom:none;
  background:${tone.tabIdle};
  color:${tone.tabIdleText};
  border-top-left-radius:10px;
  border-top-right-radius:10px;
  font:${isDark ? "600 13px" : "600 13px"} ${fontSans};
  letter-spacing:.2px;
  box-shadow: inset 0 -1px 0 ${isDark ? "#00000033" : "#0000000a"};
  cursor:pointer;
">
${name}</button>`;
  };

  const sectionForm = (id, title, content, index) => {
    const isFirst = index === 0;
    const finalForm = `<section id="panel-${id}"
             role="tabpanel"
             aria-labelledby="tab-${id}"
             style="${isFirst ? "" : "display:none;"}border:1px solid ${
      tone.border
    };
                    padding:16px 16px 18px 16px;
                    background:${tone.surface};
                    color:${tone.text};
                    border-radius:12px;
                    box-shadow: 0 6px 20px ${
                      isDark ? "rgba(0,0,0,.35)" : "rgba(15, 23, 42, .06)"
                    };">
      ${
        content ||
        `<h2 style="margin:0 0 10px 0;font:700 18px ${fontSans};color:${tone.text}">${title}</h2><p style="margin:0;color:${tone.textMuted};font:400 14px ${fontSans}">Not yet finished.</p>`
      }
    </section>`;
    return finalForm;
  };

  const addTabsAndSections = (id, name, title, content) => {
    const newTab = tabsForm(id, name);
    const newSection = sectionForm(
      id,
      title,
      content,
      tabs.length === 0 ? 0 : 1
    );
    setTabs((prev) => [...prev, newTab]);
    setSections((prev) => [...prev, newSection]);

    setId("");
    setName("");
    setTitle("");
    setContent("");
  };

  const generateFullHTMLPage = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Generated Form</title>
</head>
<body style="font-family:${fontSans};margin:16px;background:${tone.bg};color:${
      tone.text
    }">
  <div role="tablist" aria-label="Pages"
       style="display:flex;gap:8px;border-bottom:1px solid ${
         tone.border
       };margin:0 0 12px 0;padding-bottom:6px;">
    ${tabs.join("\n")}
  </div>
  ${sections.join("\n")}
  <script>
    function openTab(id){
      document.querySelectorAll('[role="tabpanel"]').forEach(p=>p.style.display="none");
      var panel = document.getElementById("panel-"+id);
      if(panel) panel.style.display="block";

      document.querySelectorAll('[role="tab"]').forEach(b=>{
        b.style.background="${tone.tabIdle}";
        b.style.color="${tone.tabIdleText}";
        b.setAttribute("aria-selected","false");
        b.style.borderBottom="none";
        b.style.boxShadow="inset 0 -1px 0 ${
          isDark ? "#00000033" : "#0000000a"
        }";
      });
      var btn = document.getElementById("tab-"+id);
      if(btn){
        btn.style.background="${tone.tabActive}";
        btn.style.color="${tone.text}";
        btn.style.borderBottom="1px solid ${tone.tabActive}";
        btn.setAttribute("aria-selected","true");
        btn.style.boxShadow="0 1px 0 ${tone.tabActive}";
      }
    }
    (function(){
      var first = document.querySelector('[role="tab"]');
      if(first){
        var id = first.id.replace('tab-','');
        openTab(id);
      }
    })();
  </script>
</body>
</html>`;
  };

  const deleteTab = (index) => {
    setTabs((prev) => prev.filter((_, i) => i !== index));
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  // ---- Shared card styles ----
  const cardBaseStyle = {
    borderRadius: "16px",
    padding: "20px",
    fontFamily: fontSans,
    border: `1px solid ${tone.border}`,
    boxShadow: isDark
      ? "0 8px 28px rgba(0,0,0,.45)"
      : "0 10px 30px rgba(15,23,42,.08)",
    transition: "background-color .25s, border-color .25s, box-shadow .25s",
    background: tone.surface,
    color: tone.text,
  };

  const inputBase = {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${tone.border}`,
    borderRadius: "10px",
    outline: "none",
    background: isDark ? "#0f1115" : "#ffffff",
    color: tone.text,
    fontFamily: fontSans,
    fontSize: "14px",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.05)",
  };

  const labelHint = { fontSize: "12px", opacity: 0.8, color: tone.textMuted };

  const primaryBtn = {
    background: `linear-gradient(180deg, ${tone.primary}, ${tone.primaryHover})`,
    color: "#ffffff",
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: ".2px",
    fontFamily: fontSans,
    boxShadow: "0 6px 16px rgba(14,165,233,.35)",
    transition: "transform .08s ease, box-shadow .2s ease, filter .15s ease",
  };

  const successBtn = {
    background: `linear-gradient(180deg, ${tone.success}, ${tone.successHover})`,
    color: "#0b1220",
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 800,
    letterSpacing: ".3px",
    fontFamily: fontSans,
    boxShadow: "0 8px 18px rgba(16,185,129,.25)",
    transition: "transform .08s ease, box-shadow .2s ease, filter .15s ease",
  };

  return (
    <div
      className={clsx(
        theme === "dark" ? "bg-black" : "bg-white",
        "min-h-screen"
      )}
      style={{
        background: isDark
          ? // Dark mode — rich neon vibe
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #6d28d9 70%, #f43f5e 100%)"
          : // Light mode — bright pastel vibe
            "linear-gradient(135deg, #a5f3fc 0%, #93c5fd 35%, #c4b5fd 70%, #f9a8d4 100%)",
      }}
    >
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{
          fontFamily: fontSans,
          color: tone.text,
          paddingTop: "24px",
          letterSpacing: ".3px",
          textShadow: isDark ? "0 1px 0 rgba(0,0,0,.4)" : "0 1px 0 #fff",
          fontSize: "3rem",
        }}
      >
        Tabs Generator
      </h1>

      <div
        className="flex flex-wrap justify-evenly items-center"
        style={{ padding: "16px", gap: 16 }}
      >
        <div>
          <div
            style={{
              ...cardBaseStyle,
              width: "420px",
              display: "grid",
              gap: "12px",
            }}
          >
            <label>
              <span style={labelHint}>ID</span>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value.replace(" ", "-"))}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing())}
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "inset 0 1px 2px rgba(0,0,0,.05)")
                }
                style={inputBase}
              />
            </label>

            <label>
              <span style={labelHint}>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing())}
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "inset 0 1px 2px rgba(0,0,0,.05)")
                }
                style={inputBase}
              />
            </label>

            <label>
              <span style={labelHint}>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing())}
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "inset 0 1px 2px rgba(0,0,0,.05)")
                }
                style={inputBase}
              />
            </label>

            <label>
              <span style={labelHint}>Content</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                onFocus={(e) => (e.currentTarget.style.boxShadow = focusRing())}
                onBlur={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "inset 0 1px 2px rgba(0,0,0,.05)")
                }
                style={{
                  ...inputBase,
                  resize: "vertical",
                  minHeight: 120,
                  fontFamily: fontMono,
                }}
              />
            </label>

            <button
              onClick={() => addTabsAndSections(id, name, title, content)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(1.05)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "translateY(1px)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              style={successBtn}
            >
              Add Tab
            </button>

            {/* Existing form to add a tab goes here */}

            {/* List of created tabs with delete buttons */}
            <div style={{ marginTop: "16px" }}>
              {tabs.map((tab, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: tab }} />
                  <button
                    onClick={() => deleteTab(i)}
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Your preview section continues here */}
          </div>
        </div>

        <div style={{ ...cardBaseStyle, width: "540px" }}>
          <h2
            style={{
              fontSize: "20px",
              marginBottom: "14px",
              color: tone.text,
              fontFamily: fontSans,
              fontWeight: 800,
            }}
          >
            Generated Inline HTML
          </h2>

          <button
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter = "brightness(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(1px)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onClick={() =>
              navigator.clipboard.writeText(generateFullHTMLPage())
            }
            style={{
              ...primaryBtn,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: fontMono,
              fontWeight: 700,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              fill="currentColor"
            >
              <path
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 
      1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 
      18H8V7h11v16z"
              />
            </svg>
            Copy
          </button>

          <div
            style={{
              display: "flex",
              fontFamily: fontMono,
              fontSize: "14px",
              backgroundColor: isDark ? "#0e1116" : tone.surfaceAlt,
              border: `1px solid ${tone.border}`,
              borderRadius: "12px",
              overflow: "hidden",
              height: "420px",
              marginTop: 12,
            }}
          >
            <SyntaxHighlighter
              language="html"
              style={isDark ? oneDark : oneLight}
              showLineNumbers
              wrapLines
              customStyle={{
                height: "420px",
                overflowY: "auto",
                borderRadius: "12px",
                fontSize: "13.5px",
                fontFamily: fontMono,
                margin: 0,
                width: "100%",
                background: isDark ? "#0e1116" : tone.surfaceAlt,
              }}
            >
              {generateFullHTMLPage()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

function EscapeRoom() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#2a2f3a" : "#e2e8f0",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#0f1115" : "#ffffff",
        color: isDark ? "#e6e7ea" : "#0f172a",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: isDark
          ? "0 8px 22px rgba(0,0,0,.4)"
          : "0 8px 22px rgba(15,23,42,.06)",
        fontFamily: fontSans,
      }}
    >
      <h2 style={{ marginTop: 0, letterSpacing: ".2px" }}>Escape Room</h2>
      <p style={{ color: isDark ? "#a6adbb" : "#475569" }}>
        Not yet finished. Add Escape Room content here.
      </p>
    </div>
  );
}

function CodingRaces() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#2a2f3a" : "#e2e8f0",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#0f1115" : "#ffffff",
        color: isDark ? "#e6e7ea" : "#0f172a",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: isDark
          ? "0 8px 22px rgba(0,0,0,.4)"
          : "0 8px 22px rgba(15,23,42,.06)",
        fontFamily: fontSans,
      }}
    >
      <h2 style={{ marginTop: 0, letterSpacing: ".2px" }}>Coding Races</h2>
      <p style={{ color: isDark ? "#a6adbb" : "#475569" }}>
        Not yet finished. Add Coding Races content here.
      </p>
    </div>
  );
}

function CourtRoom() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#2a2f3a" : "#e2e8f0",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#0f1115" : "#ffffff",
        color: isDark ? "#e6e7ea" : "#0f172a",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: isDark
          ? "0 8px 22px rgba(0,0,0,.4)"
          : "0 8px 22px rgba(15,23,42,.06)",
        fontFamily: fontSans,
      }}
    >
      <h2 style={{ marginTop: 0, letterSpacing: ".2px" }}>Court Room</h2>
      <p style={{ color: isDark ? "#a6adbb" : "#475569" }}>
        Not yet finished. Put your Court Room content here.
      </p>
    </div>
  );
}

export default function Home() {
  const { activeTab, setActiveTab } = useHome();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={clsx(
        theme === "dark" ? "bg-black" : "bg-white",
        "min-h-screen"
      )}
      style={{
        background: isDark
          ? "radial-gradient(1200px 600px at 50% -10%, rgba(34,211,238,.12), transparent 60%), linear-gradient(180deg, #090a0e 0%, #0b0c10 100%)"
          : "radial-gradient(1200px 600px at 50% -10%, rgba(14,165,233,.10), transparent 60%), linear-gradient(180deg, #f6f8fb 0%, #ffffff 100%)",
      }}
    >
      <HomeTabs />
      {activeTab === 3 && <TabsGenerator />}
      {activeTab === 0 && <EscapeRoom />}
      {activeTab === 1 && <CodingRaces />}
      {activeTab === 2 && <CourtRoom />}
    </div>
  );
}
