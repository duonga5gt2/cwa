"use client";
import { useTheme } from "../../../contexts/ThemeContext";
import clsx from "clsx";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // design tokens (inline)
  const fontSans =
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
  const tone = {
    bg: isDark
      ? "linear-gradient(135deg, #0b1020 0%, #0f172a 45%, #1f1140 100%)"
      : "linear-gradient(135deg, #f8fafc 0%, #eef6ff 45%, #fef3c7 100%)",
    card: isDark ? "rgba(12,18,28,.55)" : "rgba(255,255,255,.9)",
    text: isDark ? "#e6e7ea" : "#0f172a",
    sub: isDark ? "#a8b0bf" : "#475569",
    border: isDark ? "rgba(148,163,184,.25)" : "rgba(2,6,23,.12)",
    shadow: isDark
      ? "0 10px 30px rgba(0,0,0,.5)"
      : "0 12px 36px rgba(15,23,42,.10)",
    accent: isDark
      ? "linear-gradient(90deg, #22d3ee, #818cf8, #f472b6)"
      : "linear-gradient(90deg, #06b6d4, #6366f1, #f59e0b)",
    chipBg: isDark ? "rgba(125,211,252,.08)" : "rgba(2,132,199,.08)",
  };

  const pageStyle = {
    background: tone.bg,
    minHeight: "100vh",
    width: "100vw",
    color: tone.text,
    fontFamily: fontSans,
  };

  const container = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 20px 60px",
  };

  const hero = {
    display: "grid",
    gap: 8,
    marginBottom: 24,
  };

  const title = {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: ".4px",

    lineHeight: 1.15,
    color: theme === "dark" ? "#fff" : "#000",
  };

  const subtitle = {
    margin: 0,
    fontSize: 16.5,
    color: tone.sub,
    lineHeight: 1.6,
  };

  const sectionTitle = {
    margin: "28px 0 12px",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: ".3px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  };

  const card = {
    background: tone.card,
    border: `1px solid ${tone.border}`,
    borderRadius: 14,
    boxShadow: tone.shadow,
    padding: 16,
    transition: "transform .08s ease, box-shadow .2s ease",
  };

  const cardHeading = { margin: "0 0 6px 0", fontSize: 16, fontWeight: 800 };
  const cardText = {
    margin: 0,
    color: tone.sub,
    fontSize: 14,
    lineHeight: 1.55,
  };

  const chipsRow = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 };
  const chip = {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".2px",
    background: tone.chipBg,
    border: `1px solid ${tone.border}`,
  };

  const videoWrap = {
    border: `1px dashed ${tone.border}`,
    background: isDark ? "rgba(2,6,23,.35)" : "rgba(255,255,255,.6)",
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    boxShadow: tone.shadow,
  };

  const videoInner = {
    position: "relative",
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    background: isDark ? "#0b1020" : "#e2e8f0",
    // 16:9 placeholder
    aspectRatio: "16 / 9",
    display: "grid",
    placeItems: "center",
    color: tone.sub,
    fontWeight: 700,
    letterSpacing: ".3px",
  };

  const list = {
    margin: "8px 0 0",
    paddingLeft: 18,
    color: tone.sub,
    fontSize: 14,
    lineHeight: 1.6,
  };

  return (
    <div
      className={clsx(
        "transition-colors duration-300",
        isDark ? "text-white" : "text-black"
      )}
      style={pageStyle}
    >
      <div style={container}>
        {/* Hero */}
        <section style={hero}>
          <h1 style={title}>About the CWA Project</h1>
          <p style={subtitle}>Quy Duong Ngo - 21626838</p>
        </section>

        {/* Features (built so far) */}
        <h2 style={sectionTitle}>Features</h2>
        <div style={grid}>
          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Theme System</h3>
            <p style={cardText}>
              Global dark/light mode via <code>ThemeContext</code>. Colors,
              borders, and shadows adapt automatically to the current theme.
            </p>
            <div style={chipsRow}>
              <span style={chip}>Dark/Light</span>
              <span style={chip}>Context API</span>
              <span style={chip}>No extra deps</span>
            </div>
          </div>

          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Colorful Navbar</h3>
            <p style={cardText}>
              Glassy AppBar with animated underline on hover, gradient title,
              mobile drawer, and a theme switch—without changing your structure.
            </p>
            <div style={chipsRow}>
              <span style={chip}>Glass/Blur</span>
              <span style={chip}>Responsive</span>
              <span style={chip}>Hover Accents</span>
            </div>
          </div>

          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Tabs Generator</h3>
            <p style={cardText}>
              Build accessible tabs + matching panels and export a
              ready-to-paste HTML page. Includes a live code preview with
              theme-aware styles.
            </p>
            <div style={chipsRow}>
              <span style={chip}>ARIA Tabs</span>
              <span style={chip}>HTML Export</span>
              <span style={chip}>Code Preview</span>
            </div>
          </div>

          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Persistent Home Tabs</h3>
            <p style={cardText}>
              The selected tab is remembered with a cookie, so users return to
              where they left off.
            </p>
            <div style={chipsRow}>
              <span style={chip}>Cookie Save</span>
              <span style={chip}>Fast UX</span>
            </div>
          </div>

          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Polished Footer</h3>
            <p style={cardText}>
              Gradient background with soft cards and clear link/icon states,
              tuned for both themes.
            </p>
            <div style={chipsRow}>
              <span style={chip}>Gradient</span>
              <span style={chip}>Accessible</span>
            </div>
          </div>

          <div
            style={card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <h3 style={cardHeading}>Content Stubs</h3>
            <p style={cardText}>
              “Escape Room”, “Coding Races”, and “Court Room” screens are wired
              and theme-aware, ready for content.
            </p>
            <div style={chipsRow}>
              <span style={chip}>Ready to Fill</span>
              <span style={chip}>Consistent UI</span>
            </div>
          </div>
        </div>

        {/* How it’s put together */}

        {/* Video placeholder */}
        <h2 style={sectionTitle}>Project Video</h2>
        <div style={videoWrap}>
          <div style={videoInner}>
            {/* Replace this box: 
                - Option A: drop a <video controls src="/your-video.mp4" style={{width:'100%', height:'100%'}} />
                - Option B: embed YouTube/Vimeo in an iframe below.
            */}
            <span>Place your demo video here (16:9)</span>
          </div>
        </div>

        {/* Optional: Ready-made iframe snippet (commented) */}
        {/*
        <div style={videoWrap}>
          <div style={{ ...videoInner, background: 'transparent' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
              title="CWA Project Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0 }}
            />
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
