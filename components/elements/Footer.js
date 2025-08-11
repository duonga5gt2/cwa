"use client";
import { useTheme } from "../../contexts/ThemeContext";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const styles = {
    footer: {
      backgroundColor: isDark ? "#121212" : "#f9f9f9",
      color: isDark ? "#e0e0e0" : "#333",
      padding: "2rem 1rem",
      fontFamily: "Segoe UI, sans-serif",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "2rem",
    },
    logo: {
      flex: "1 1 200px",
    },
    links: {
      flex: "1 1 200px",
    },
    social: {
      flex: "1 1 200px",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    a: {
      color: isDark ? "#90caf9" : "#1e88e5",
      textDecoration: "none",
      display: "block",
      marginBottom: "0.5rem",
    },
    aHover: {
      color: isDark ? "#42a5f5" : "#1565c0",
    },
    icon: {
      marginRight: "0.5rem",
      cursor: "pointer",
      transition: "color 0.3s",
    },
    bottom: {
      textAlign: "center",
      marginTop: "2rem",
      borderTop: "1px solid #ccc",
      paddingTop: "1rem",
      fontSize: "0.9rem",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <h2>Quy Duong Ngo</h2>
          <p>I coded this website</p>
        </div>

        <div style={styles.links}>
          <h4>Quick Links</h4>
          <ul style={styles.ul}>
            {["Home", "About", "Coding Races", "Court Room", "Escape Room"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href={
                      item === "Home"
                        ? "/"
                        : "/" + item.toLowerCase().replace(/ /g, "-")
                    }
                    style={styles.a}
                    onMouseOver={(e) =>
                      (e.target.style.color = styles.aHover.color)
                    }
                    onMouseOut={(e) => (e.target.style.color = styles.a.color)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div style={styles.social}>
          <h4>Follow Us</h4>
          <div>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Icon
                key={i}
                size={24}
                color={isDark ? "#e0e0e0" : "#333"}
                style={styles.icon}
                onMouseOver={(e) =>
                  (e.target.style.color = styles.aHover.color)
                }
                onMouseOut={(e) =>
                  (e.target.style.color = isDark ? "#e0e0e0" : "#333")
                }
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
