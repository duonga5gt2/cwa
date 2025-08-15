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

  const tabsForm = (id, name) => {
    return `<button id="tab-${id}" role="tab" aria-controls="panel-${id}"
onclick="openTab('${id}')" style="padding:8px;border:1px solid #ccc;border-bottom:none;background:#fff">${name}</button>`;
  };

  const sectionForm = (id, title, content, index) => {
    const isFirst = index === 0;
    const finalForm = `<section id="panel-${id}"
             role="tabpanel"
             aria-labelledby="tab-${id}"
             style="${
               isFirst ? "" : "display:none;"
             }border:1px solid #ccc;padding:12px">
      ${
        content ||
        `<h2 style="margin:0 0 8px 0">${title}</h2><p>Not yet finished.</p>`
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
<body style="font-family:sans-serif;margin:16px">
  <div role="tablist" aria-label="Pages" style="display:flex;gap:6px;border-bottom:1px solid #ccc;margin-bottom:8px">
    ${tabs.join("\n")}
  </div>

  ${sections.join("\n")}

  <script>
    function openTab(id){
      document.querySelectorAll('[role="tabpanel"]').forEach(p=>p.style.display="none");
      var panel = document.getElementById("panel-"+id);
      if(panel) panel.style.display="block";

      document.querySelectorAll('[role="tab"]').forEach(b=>{
        b.style.background="#f7f7f7";
        b.setAttribute("aria-selected","false");
        b.style.borderBottom="none";
      });
      var btn = document.getElementById("tab-"+id);
      if(btn){
        btn.style.background="#fff";
        btn.style.borderBottom="1px solid #fff";
        btn.setAttribute("aria-selected","true");
      }
    }

    // Show first tab by default
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

  const cardBaseStyle = {
    borderRadius: "12px",
    padding: "20px",
    fontFamily: "JetBrains Mono, monospace",
    border: "1px solid",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, border-color 0.3s",
  };

  const cardLight = {
    backgroundColor: "#ffffff",
    borderColor: "#e0e0e0",
    color: "#111",
  };

  const cardDark = {
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
    color: "#eee",
  };

  return (
    <div
      className={clsx(
        theme === "dark" ? "bg-black" : "bg-white",
        "min-h-screen"
      )}
    >
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          color: theme === "dark" ? "white" : "black",
          paddingTop: "20px",
        }}
      >
        Tabs Generator
      </h1>

      <div
        className="flex flex-wrap justify-evenly items-center"
        style={{ padding: "10px" }}
      >
        <div>
          <div
            style={{
              ...cardBaseStyle,
              ...(theme === "dark" ? cardDark : cardLight),
              width: "400px",
              display: "grid",
              gap: "10px",
            }}
          >
            <label>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>ID</span>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value.replace(" ", "-"))}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>

            <label>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>

            <label>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>

            <label>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>Content</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
            <button
              onClick={() => addTabsAndSections(id, name, title, content)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#516b62ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#10b981")
              }
              style={{
                background: "#10b981",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.2s ease",
              }}
            >
              Add Tab
            </button>
          </div>
        </div>

        <div
          style={{
            ...cardBaseStyle,
            ...(theme === "dark" ? cardDark : cardLight),
            width: "500px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            Generated Inline HTML
          </h2>
          <button
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#516b62ff")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
            onClick={() =>
              navigator.clipboard.writeText(generateFullHTMLPage())
            }
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "6px 12px",
              paddingBottom: "6px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "JetBrains Mono, monospace",
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
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "14px",
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "6px",
              overflow: "hidden",
              height: "400px",
            }}
          >
           

            {/* Code Block */}
            <SyntaxHighlighter
              language="html"
              style={theme === "dark" ? oneDark : oneLight}
              showLineNumbers
              wrapLines
              customStyle={{
                height: "400px",
                overflowY: "auto",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "JetBrains Mono, monospace",
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

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#333" : "#ccc",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#18181b" : "#fff",
        color: isDark ? "#fff" : "#111",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Escape Room</h2>
      <p>Not yet finished. Add Escape Room content here.</p>
    </div>
  );
}

function CodingRaces() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#333" : "#ccc",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#18181b" : "#fff",
        color: isDark ? "#fff" : "#111",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Coding Races</h2>
      <p>Not yet finished. Add Coding Races content here.</p>
    </div>
  );
}

function CourtRoom() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: isDark ? "#333" : "#ccc",
        borderTop: "none",
        padding: 16,
        background: isDark ? "#18181b" : "#fff",
        color: isDark ? "#fff" : "#111",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Court Room</h2>
      <p>Not yet finished. Put your Court Room content here.</p>
    </div>
  );
}

export default function Home() {
  const { activeTab, setActiveTab } = useHome();
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        theme === "dark" ? "bg-black" : "bg-white",
        "min-h-screen"
      )}
    >
      <HomeTabs />
      {activeTab === 3 && <TabsGenerator />}
      {activeTab === 0 && <EscapeRoom />}
      {activeTab === 1 && <CodingRaces />}
      {activeTab === 2 && <CourtRoom />}
    </div>
  );
}
