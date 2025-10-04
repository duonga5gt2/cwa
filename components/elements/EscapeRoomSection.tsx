import { useEffect, useState } from "react";
import Timer from "./Timer";
export default function EscapeRoom() {
    const [miliseconds, setMiliseconds] = useState<number>(300000)
    const [isCountingDown, setIsCountingDown] = useState<boolean>(false)
    
   
    
    const add = (delta: number) => setMiliseconds((m) => Math.max(0, m + delta));

    return <>
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        background: "#111827",
        color: "#e5e7eb",
        border: "1px solid #1f2937",
        borderRadius: 12,
        padding: 10,
        width: 220,
        boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
          <div
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 28,
          textAlign: "center",
          background: "#0b1224",
          border: "1px solid #1f2937",
          borderRadius: 8,
          padding: "6px 8px",
          marginBottom: 8,
        }}
      >
        <Timer duration={miliseconds} isCountingDown={isCountingDown} />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        {!isCountingDown ? (
          <button
            onClick={() => setIsCountingDown(true)}
            style={btnStyle(true)}
          >
            Start
          </button>
        ) : (
          <button onClick={() => setIsCountingDown(false)} style={btnStyle()}>
            Pause
          </button>
        )}
        

         <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
        <button onClick={() => add(-10_000)} style={btnStyle()}>
          −10s
        </button>
        <button onClick={() => add(+10_000)} style={btnStyle()}>
          +10s
        </button>
      </div>
      </div>
      </div>
    </>
}



function btnStyle(accent = false): React.CSSProperties {
  return {
    flex: 1,
    padding: "6px 8px",
    fontSize: 12,
    borderRadius: 8,
    border: `1px solid ${accent ? "#7d1416" : "#1f2937"}`,
    background: "#0f172a",
    color: "#e5e7eb",
    cursor: "pointer",
  };
}