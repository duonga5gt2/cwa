"use client";
import React from "react";

export default function PreviewPage() {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    const s = sessionStorage.getItem("lambdaPreviewHtml");
    setHtml(s);
  }, []);

  return (
    <div style={{ height: "100vh", display: "grid", gridTemplateRows: "auto 1fr" }}>
      <div style={{ padding: 10, borderBottom: "1px solid #e5e7eb", display: "flex", gap: 8 }}>
        <button
          onClick={() => history.back()}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" }}
        >
          ← Back
        </button>
        <div style={{ alignSelf: "center", opacity: 0.7 }}>
          Lambda HTML Preview (sandboxed)
        </div>
      </div>

      {!html ? (
        <div style={{ padding: 20, color: "#64748b" }}>
          No preview HTML found. Generate from the Tabs page again.
        </div>
      ) : (
        <iframe
          // srcDoc renders straight from the returned HTML (no server roundtrip)
          srcDoc={html}
          // sandbox keeps it safe but lets your inline scripts run
          sandbox="allow-scripts allow-modals"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      )}
    </div>
  );
}
