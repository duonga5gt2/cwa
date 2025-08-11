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
  { label: "Escape Room", href: "/escape-room" },
  { label: "Court Room", href: "/court-room" },
  { label: "Coding Races", href: "/coding-races" },
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
        boxShadow: theme === "dark" ? "none" : "0 4px 24px 0 rgba(0,0,0,0.2)",
        bgcolor: theme === "dark" ? "#18181b" : "#f8fafc",
        color: theme === "dark" ? "#fff" : "#22223b",
        p: 0,
        transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
      }}
    >
      <span
        style={{
          color: theme === "dark" ? "#fff" : "#22223b",
          background: theme === "dark" ? "#27272a" : "#e0e7eb",
          padding: "2px 8px",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: 1,
          transition: "background 0.3s, color 0.3s",
          display: "inline-block",
        }}
      >
        @21626838
      </span>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 56,
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
            fontWeight: "bold",
            letterSpacing: 2,
            textAlign: "left",
            background:
              theme === "dark"
                ? "linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)"
                : "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            textShadow:
              theme === "dark"
                ? "0 2px 8px rgba(24,24,27,0.4)"
                : "0 2px 8px rgba(0,0,0,0.08)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          <GradientText
            colors={["#3ca2fa", "#80eeb4", "#3ca2fa", "#80eeb4", "#3ca2fa"]}
            animationSpeed={6}
            showBorder={false}
            className="text-3xl font-black"
          >
            CWA Project
          </GradientText>
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
                      color: theme === "dark" ? "#fff" : "#22223b",
                      fontWeight: 500,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        bgcolor:
                          theme === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "#e0e7ff",
                        color: theme === "dark" ? "#38bdf8" : "#6366f1",
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
                sx={{ ml: 1 }}
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
                    width: 220,
                    bgcolor: theme === "dark" ? "#18181b" : "#f8fafc",
                    height: "100%",
                  }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <List>
                    {navLinks.map((link) => (
                      <ListItem key={link.href} disablePadding>
                        <Link href={link.href} passHref legacyBehavior>
                          <ListItemButton component="a">
                            <ListItemText
                              primary={link.label}
                              style={{
                                color: theme === "dark" ? "white" : "black",
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
            />
            <Typography variant="caption">
              {theme === "dark" ? "Dark" : "Light"} Mode
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
