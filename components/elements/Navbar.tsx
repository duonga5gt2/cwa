// @ts-nocheck

"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { useTheme } from "../../contexts/ThemeContext";
import Link from "next/link";
import GradientText from "../nurui/gradient-text";
import useMediaQuery from "@mui/material/useMediaQuery";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      elevation={theme === "dark" ? 0 : 3}
      color="transparent"
      sx={{
        boxShadow:
          theme === "dark"
            ? "0 10px 30px rgba(0,0,0,.35)"
            : "0 8px 24px rgba(15,23,42,.12)",
        bgcolor:
          theme === "dark" ? "rgba(12,14,20,0.75)" : "rgba(248,250,252,0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: theme === "dark" ? "#e5e7eb" : "#0f172a",
        borderBottom: `1px solid ${
          theme === "dark" ? "rgba(148,163,184,.18)" : "rgba(2,6,23,.08)"
        }`,
        p: 0,
        transition:
          "background 300ms ease, color 300ms ease, box-shadow 300ms ease",
      }}
    >
      <span
        style={{
          color: theme === "dark" ? "#e5e7eb" : "#0f172a",
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)"
              : "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
          padding: "3px 10px",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.6,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          boxShadow:
            theme === "dark"
              ? "0 6px 18px rgba(14,165,233,.35)"
              : "0 6px 18px rgba(34,197,94,.25)",
          display: "inline-block",
        }}
      >
        @21626838
      </span>

      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            flex: 2,
            fontWeight: 900,
            letterSpacing: 1.2,
            textAlign: "left",
            display: "inline-block",
          }}
        >
          <div
            style={{
              fontSize: "1.75rem", // ~28px
              fontWeight: 800,
              letterSpacing: "1px",

              lineHeight: 1.2,
              textShadow:
                theme === "dark"
                  ? "0 1px 2px rgba(255,255,255,0.6)"
                  : "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            Cloud-Based Web Applications
          </div>
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          {/* Desktop Nav */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              {navLinks.map((link) => (
                <Link href={link.href} passHref legacyBehavior key={link.href}>
                  <Button
                    component="a"
                    variant="text"
                    sx={{
                      minWidth: 0,
                      px: 1,
                      color: theme === "dark" ? "#e5e7eb" : "#0f172a",
                      fontWeight: 600,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      position: "relative",
                      letterSpacing: 0.2,
                      "&:hover": {
                        bgcolor:
                          theme === "dark"
                            ? "rgba(148,163,184,0.10)"
                            : "rgba(2,6,23,0.06)",
                        color: theme === "dark" ? "#7dd3fc" : "#2563eb",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 6,
                        right: 6,
                        bottom: 6,
                        height: 2,
                        borderRadius: 2,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 200ms ease",
                        background:
                          theme === "dark"
                            ? "linear-gradient(90deg, #22d3ee, #a78bfa)"
                            : "linear-gradient(90deg, #06b6d4, #6366f1)",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* Mobile Nav: Hamburger */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                sx={{
                  ml: 1,
                  "&:hover": {
                    bgcolor:
                      theme === "dark"
                        ? "rgba(148,163,184,0.12)"
                        : "rgba(2,6,23,0.06)",
                  },
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{
                    width: 240,
                    bgcolor: theme === "dark" ? "#0b1020" : "#ffffff",
                    height: "100%",
                    color: theme === "dark" ? "#e5e7eb" : "#0f172a",
                    borderLeft: `1px solid ${
                      theme === "dark"
                        ? "rgba(148,163,184,.18)"
                        : "rgba(2,6,23,.08)"
                    }`,
                    boxShadow:
                      theme === "dark"
                        ? "0 8px 28px rgba(0,0,0,.5)"
                        : "0 10px 30px rgba(15,23,42,.12)",
                  }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <List sx={{ py: 1 }}>
                    {navLinks.map((link) => (
                      <ListItem key={link.href} disablePadding>
                        <Link href={link.href} passHref legacyBehavior>
                          <ListItemButton
                            component="a"
                            sx={{
                              px: 2,
                              py: 1.2,
                              borderRadius: 1.5,
                              mx: 1,
                              my: 0.5,
                              "&:hover": {
                                bgcolor:
                                  theme === "dark"
                                    ? "rgba(125,211,252,0.10)"
                                    : "rgba(37,99,235,0.08)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={link.label}
                              primaryTypographyProps={{
                                fontWeight: 600,
                                letterSpacing: 0.2,
                              }}
                              style={{
                                color: theme === "dark" ? "#e5e7eb" : "#0f172a",
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}

          {/* Theme Switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              color="default"
              sx={{
                "& .MuiSwitch-switchBase": {
                  "&.Mui-checked": {
                    color: theme === "dark" ? "#22d3ee" : "#2563eb",
                    "& + .MuiSwitch-track": {
                      background:
                        theme === "dark"
                          ? "linear-gradient(90deg, #22d3ee, #a78bfa)"
                          : "linear-gradient(90deg, #06b6d4, #6366f1)",
                      opacity: 1,
                    },
                  },
                },
                "& .MuiSwitch-track": {
                  borderRadius: 22,
                  opacity: 1,
                  background:
                    theme === "dark"
                      ? "rgba(148,163,184,.25)"
                      : "rgba(2,6,23,.15)",
                },
                "& .MuiSwitch-thumb": {
                  boxShadow:
                    theme === "dark"
                      ? "0 2px 8px rgba(0,0,0,.45)"
                      : "0 2px 8px rgba(15,23,42,.18)",
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                letterSpacing: 0.3,
                color: theme === "dark" ? "#cbd5e1" : "#334155",
              }}
            >
              {theme === "dark" ? "Dark" : "Light"} Mode
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
