// @ts-nocheck

"use client";
import { useTheme } from "../../contexts/ThemeContext";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // --- tokens ---
  const fontSans =
    'Inter, "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif';
  const tone = {
    // colorful but gentle backgrounds
    bg: isDark
      ? "linear-gradient(135deg, #0b1020 0%, #1f1140 55%, #1a2a3a 100%)"
      : "linear-gradient(135deg, #eef6ff 0%, #e9fbf5 55%, #fff6ec 100%)",
    text: isDark ? "#E7EAF0" : "#0F172A",
    sub: isDark ? "#A8B0BF" : "#475569",
    link: isDark ? "#7DD3FC" : "#2563EB",
    linkHover: isDark ? "#60A5FA" : "#1D4ED8",
    border: isDark ? "rgba(148,163,184,.25)" : "rgba(2,6,23,.12)",
    cardBg: isDark ? "rgba(12,18,28,.55)" : "rgba(255,255,255,.85)",
    shadow: isDark
      ? "0 8px 28px rgba(0,0,0,.45)"
      : "0 10px 30px rgba(15,23,42,.12)",
  };

  const styles = {
    footer: {
      background: tone.bg,
      color: tone.text,
      padding: "2.25rem 1rem",
      fontFamily: fontSans,
      borderTop: `1px solid ${tone.border}`,
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "2rem",
    },
    // give each column a soft card feel (no extra wrappers)
    columnBase: {
      flex: "1 1 200px",
      background: tone.cardBg,
      border: `1px solid ${tone.border}`,
      borderRadius: 14,
      boxShadow: tone.shadow,
      padding: "1rem",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
    },
    logo: {},
    links: {},
    social: {},
    title: {
      margin: 0,
      fontSize: "1.125rem",
      fontWeight: 800,
      letterSpacing: "0.3px",
    },
    tagline: {
      margin: "6px 0 0",
      color: tone.sub,
      fontSize: "0.95rem",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    a: {
      color: tone.link,
      textDecoration: "none",
      display: "block",
      marginBottom: "0.55rem",
      fontWeight: 600,
      letterSpacing: "0.15px",
      transition:
        "color .2s ease, transform .08s ease, text-decoration-color .2s",
      textUnderlineOffset: "4px",
    },
    aHover: {
      color: tone.linkHover,
    },
    icon: {
      marginRight: "0.6rem",
      cursor: "pointer",
      transition: "color .2s ease, transform .12s ease",
      verticalAlign: "middle",
    },
    bottom: {
      textAlign: "center",
      marginTop: "2rem",
      borderTop: `1px solid ${tone.border}`,
      paddingTop: "1rem",
      fontSize: "0.9rem",
      color: tone.sub,
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={{ ...styles.columnBase, ...styles.logo }}>
          <h2 style={styles.title}>Quy Duong Ngo</h2>
          <p style={styles.tagline}>I coded this website</p>
        </div>

        <div style={{ ...styles.columnBase, ...styles.links }}>
          <h4 style={styles.title}>Quick Links</h4>
          <ul style={styles.ul}>
            {["Home", "About"].map((item, i) => (
              <li key={i}>
                <a
                  href={
                    item === "Home"
                      ? "/"
                      : "/" + item.toLowerCase().replace(/ /g, "-")
                  }
                  style={styles.a}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = styles.aHover.color;
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = styles.a.color;
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ ...styles.columnBase, ...styles.social }}>
          <h4 style={styles.title}>Follow Us</h4>
          <div>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Icon
                key={i}
                size={24}
                color={tone.text}
                style={styles.icon}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = styles.aHover.color;
                  e.currentTarget.style.transform =
                    "translateY(-1px) scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = tone.text;
                  e.currentTarget.style.transform = "none";
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>&copy; 2025 Quy Duong Ngo - 21626838. All rights reserved.</p>
      </div>
    </footer>
  );
}
