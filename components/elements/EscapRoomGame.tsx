// EscapeRoomGame.tsx (no hotspot)
import React from "react";

type Level =
  | { type: "format"; id: string; prompt: string; input: string; target: string; hint?: string }
  | { type: "code-array"; id: string; prompt: string; funcName: string; validator: (out: any) => boolean; hint?: string }
  | { type: "code-convert"; id: string; prompt: string; funcName: string; inputCSV: string; validator: (out: any) => boolean; hint?: string };

export default function EscapeRoomGame({
  title = "Cloud Lab: Escape Room",
  theme = "dark",
}: {
  title?: string;
  theme?: "dark" | "light";
}) {
  const c = theme === "dark"
    ? {
        bg: "#0f1115", surface: "#111317", text: "#e6e7ea", sub: "#a6adbb",
        border: "#2a2f3a", codeBg: "#0b1224", codeBorder: "#1f2937",
        btnBg: "#0f172a", btnBorder: "#334155", success: "#22c55e", danger: "#f43f5e",
      }
    : {
        bg: "#ffffff", surface: "#ffffff", text: "#0f172a", sub: "#475569",
        border: "#e2e8f0", codeBg: "#f8fafc", codeBorder: "#e2e8f0",
        btnBg: "#f1f5f9", btnBorder: "#d0d7e1", success: "#16a34a", danger: "#dc2626",
      };

  const levels: Level[] = [
    {
      type: "format",
      id: "format-code",
      prompt: "Format this EXACTLY:",
      input: "function add(a,b){return a+b}",
      target: `function add(a, b) {\n  return a + b;\n};`,
      hint: "Spaces after commas, space before {, newline before return, semicolon.",
    },
    {
      type: "code-array",
      id: "zero-to-thousand",
      prompt: "Write function list() that returns [0..1000] inclusive.",
      funcName: "list",
      validator: (out) => Array.isArray(out) && out.length === 1001 && out[0] === 0 && out[1000] === 1000,
      hint: "Use a loop or Array.from({length:1001}, (_, i) => i).",
    },
    {
      type: "code-convert",
      id: "csv-to-json",
      prompt: "Write function convert(csv) that returns an array of objects with numeric fields.",
      funcName: "convert",
      inputCSV: `id,name,score\n1,Alice,12\n2,Bob,9\n`,
      validator: (out) =>
        Array.isArray(out) && out.length === 2 && out[0].id === 1 && out[0].name === "Alice" && out[0].score === 12,
      hint: "Split lines, parse headers, map rows; Number() for numerics.",
    },
  ];

  const [levelIdx, setLevelIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [toast, setToast] = React.useState("");

  const level = levels[levelIdx];

  function advance(msg = "Door unlocked!") {
    setScore((s) => s + 25);
    setToast(msg);
    setTimeout(() => {
      setToast("");
      setLevelIdx((i) => Math.min(i + 1, levels.length - 1));
    }, 600);
  }

  const panel: React.CSSProperties = {
    width: 680,
    maxWidth: "95vw",
    border: `1px solid ${c.border}`,
    borderRadius: 12,
    padding: 12,
    background: c.surface,
    boxShadow: "0 8px 24px rgba(0,0,0,.25)",
    display: "grid",
    gap: 12,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    color: c.text,
  };

  return (
    <div style={{ display: "grid", placeItems: "center", padding: 12, background: c.bg }}>
      {/* Title */}
      <div style={{ width: panel.width, maxWidth: panel.maxWidth as string, marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: ".2px", color: c.text }}>
          {title}
        </h1>
        <div style={{ color: c.sub, fontSize: 13 }}>
          Room {levelIdx + 1} / {levels.length} • Score: {score}
        </div>
      </div>

      {/* Panel */}
      <div style={panel}>
        {level.type === "format" && (
          <FormatLevel c={c} level={level} onSuccess={() => advance("Nicely formatted!")} />
        )}

        {level.type === "code-array" && (
          <CodeLevel
            c={c}
            prompt={level.prompt}
            funcName={level.funcName}
            hint={level.hint}
            onRun={(src) =>
              runAndValidate(src, level.funcName, () => advance("Correct!"), level.validator)
            }
          />
        )}

        {level.type === "code-convert" && (
          <CodeLevel
            c={c}
            prompt={`${level.prompt}\n\nInput:\n${level.inputCSV}`}
            funcName={level.funcName}
            hint={level.hint}
            onRun={(src) =>
              runAndValidate(
                src,
                level.funcName,
                () => advance("✅ Converted!"),
                (out) => level.validator(out),
                level.inputCSV
              )
            }
          />
        )}

        <div style={{ color: c.sub, minHeight: 16 }}>{toast}</div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function runAndValidate(
  src: string,
  exportName: string,
  onPass: () => void,
  validator: (out: any) => boolean,
  arg?: any
) {
  try {
    // No `let ${exportName};` here.
    const wrapper =
      `"use strict";\n` +
      src +
      `\n;return (typeof ${exportName} !== "undefined") ? ${exportName} : undefined;`;

    // Compile user's code and get the named export (function or value)
    // eslint-disable-next-line no-new-func
    const exported = new Function(wrapper)();

    // If it's a function, call it (pass csv for the convert level)
    const out = typeof exported === "function" ? exported(arg) : undefined;

    if (validator(out)) {
      onPass();
      return "Correct!";
    }
    return "❌ Not correct yet.";
  } catch (e: any) {
    return `💥 ${e.message}`;
  }
}


/* ---------- sub-views ---------- */
function FormatLevel({
  c,
  level,
  onSuccess,
}: {
  c: any;
  level: Extract<Level, { type: "format" }>;
  onSuccess: () => void;
}) {
  const [value, setValue] = React.useState(level.input);
  const [fb, setFb] = React.useState("");

  function check() {
    if (value.trim() === level.target.trim()) { setFb("✅ Perfect"); onSuccess(); }
    else setFb("❌ Not exact yet. Follow the style precisely.");
  }

  const mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ color: c.sub }}>{level.prompt}</div>
      <pre style={{ background: c.codeBg, border: `1px solid ${c.codeBorder}`, padding: 8, borderRadius: 8, margin: 0, fontFamily: mono }}>
{level.input}
      </pre>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        style={{ border: `1px solid ${c.btnBorder}`, background: c.codeBg, color: c.text, borderRadius: 10, padding: 10, fontFamily: mono }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button style={btn(c)} onClick={check}>Check</button>
        <button style={btn(c)} onClick={() => setValue(level.target)}>Auto-format</button>
      </div>
      <div style={{ color: c.sub }}>{fb || level.hint}</div>
    </div>
  );
}

function CodeLevel({
  c, prompt, funcName, onRun, hint,
}: {
  c: any; prompt: string; funcName: string; onRun: (source: string) => string; hint?: string;
}) {
  const [src, setSrc] = React.useState(`// define ${funcName} here\nfunction ${funcName}(){\n  // ...\n}\n`);
  const [out, setOut] = React.useState("");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ color: c.sub, whiteSpace: "pre-wrap" }}>{prompt}</div>
      <textarea
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        rows={8}
        style={{
          border: `1px solid ${c.btnBorder}`,
          background: c.codeBg,
          color: c.text,
          borderRadius: 10,
          padding: 10,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          style={btn(c)}
          onClick={() => setOut(onRun(src))}
        >
          Run & Check
        </button>
        {hint && <span style={{ color: c.sub, fontSize: 13 }}>💡 {hint}</span>}
      </div>
      <div style={{ color: out.startsWith("✅") ? c.success : out.startsWith("❌") ? c.danger : c.sub }}>{out}</div>
    </div>
  );
}

function btn(c: any): React.CSSProperties {
  return {
    border: `1px solid ${c.btnBorder}`,
    background: c.btnBg,
    color: c.text,
    borderRadius: 10,
    padding: "8px 12px",
    cursor: "pointer",
  };
}
