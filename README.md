# CWA – Frontend Functions (Assignment 1)

This Next.js app delivers the required **UI features** and **HTML generator** for MOODLE/LMS.

## Core Functions

- **App Shell**

  - **Header / Menu**: responsive Hamburger/Kebab menu with breadcrumbs.
  - **Footer**: copyright + Student Name + Student Number + Date on every page.
  - **Pages**: Home, About, Escape Room, Coding Races, Court Room (stubs allowed).

- **Theme System**

  - **Dark/Light mode** with OS fallback (`prefers-color-scheme`).
  - Persisted via `localStorage`; toggles `html.dark` for global styling.
  - All tones (text, border, surfaces) adapt to theme.

- **Navigation Persistence**

  - **Cookies** remember the last selected menu/tab, restoring state on reload.

- **Accessibility**

  - Tabs and panels use **ARIA roles** (`tablist`, `tab`, `tabpanel`) and labels.
  - Focus rings, readable contrast, and semantic HTML across components.

- **About Page**

  - Shows **Your Name** + **Student Number**.
  - **16:9 video** walkthrough embed (YouTube iframe) or direct `<video>`.

- **Home: Code Generator**
  - **Tabs Generator** builds tabs + matching panels.
  - Outputs **HTML5 + inline CSS + JS** (no CSS classes) suitable for MOODLE.
  - **Live preview** + **Copy to Clipboard** for a single-file export (`Hello.html` ready).
  - Optional middle editor to update **Name / Title / Content** per tab.

## Notes for LMS

- Output is plain **HTML + inline CSS + JS** only—drop-in compatible with MOODLE blocks.
- No external stylesheets required.
