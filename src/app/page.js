"use client";
import { useTheme } from "../../contexts/ThemeContext";
import clsx from "clsx";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const { theme } = useTheme();
  const [fields, setFields] = useState([]);
  const [type, setType] = useState("text");
  const [placeholder, setPlaceholder] = useState("");

  const inputTypes = [
    "text",
    "password",
    "email",
    "number",
    "date",
    "checkbox",
    "radio",
    "file",
    "color",
    "submit",
  ];

  const addField = () => {
    if (!type) return;
    setFields([...fields, { type, placeholder }]);
    setPlaceholder("");
    setType("text");
  };

  const generateInlineHTML = () => {
    return fields
      .map(({ type, placeholder }) => {
        const commonStyle =
          "padding: 8px; margin: 6px 0; border: 1px solid #ccc; border-radius: 4px;";
        if (type === "submit") {
          return `<input type="submit" value="${
            placeholder || "Submit"
          }" style="${commonStyle} background-color: #4CAF50; color: white; cursor: pointer;" />`;
        }
        return `<input type="${type}" placeholder="${placeholder}" style="${commonStyle}" />`;
      })
      .join("\n");
  };

  const generateFullHTMLPage = () => {
    const formFields = fields
      .map(({ type, placeholder }) => {
        const commonStyle =
          "padding: 8px; margin: 6px 0; border: 1px solid #ccc; border-radius: 4px;";
        if (type === "submit") {
          return `<input type="submit" value="${
            placeholder || "Submit"
          }" style="${commonStyle} background-color: #4CAF50; color: white; cursor: pointer;" />`;
        }
        return `<input type="${type}" placeholder="${placeholder}" style="${commonStyle}" />`;
      })
      .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated Form</title>
</head>
<body style="font-family: sans-serif; padding: 2rem; background-color: #f9f9f9;">
  <h2 style="margin-bottom: 1rem;">Generated Form</h2>
  <form onsubmit="handleSubmit(event)">
    ${formFields}
  </form>

  <script>
    function handleSubmit(e) {
      e.preventDefault();
      alert("Form submitted!");
      // You can add more JS logic here
    }
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
      style={{ paddingTop: "30px" }}
    >
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          color: theme === "dark" ? "white" : "black",
        }}
      >
        Input Form Generator
      </h1>

      <div
        className="flex flex-wrap justify-evenly items-center"
        style={{ padding: "10px" }}
      >
        {/* Section 1: Add Field */}
        <div
          style={{
            ...cardBaseStyle,
            ...(theme === "dark" ? cardDark : cardLight),
            width: "400px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            🧱 Add Form Fields
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
            >
              {inputTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Placeholder or Label"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
            />

            <button
              onClick={addField}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ➕ Add Field
            </button>
          </div>
        </div>

        {/* Section 2: Generated HTML */}
        <div
          style={{
            ...cardBaseStyle,
            ...(theme === "dark" ? cardDark : cardLight),
            width: "500px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            🧾 Generated Inline HTML
          </h2>
          <button
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
            {/* Line Numbers */}

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
