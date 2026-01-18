Locofy Guide — Prepare Figma For Clean React + Tailwind Exports

Purpose

- This guide helps you prepare a Figma file so the Locofy plugin exports clean, usable React + Tailwind code that plugs into the `study-timetable-planner` project.

High-level flow

1. Create Figma frames for each breakpoint (Desktop / Laptop / Tablet / Mobile).
2. Convert repeated UI into Components + Variants (Header, TimetableGrid, DayColumn, HourRow, Cell states, EditorAside, Buttons).
3. Create and apply Figma Styles (colors, text styles, spacing) matching tokens in `tailwind.config.cjs`.
4. Run the Locofy plugin and export using the React + Tailwind target.
5. Download the export and integrate the generated files into `src/` (I can help with wiring dynamic behavior afterwards).

Frame sizes (create a frame per breakpoint)

- Desktop (Large): 1440 × 900 — full workspace, wide sidebar visible.
- Laptop (Medium): 1024 × 768 — two-column layout, sidebar collapsible.
- Tablet: 768 × 1024 — stacked layout, grid may scroll horizontally.
- Mobile: 375 × 812 — single-column; use a bottom sheet for Add/Edit.

Recommended Figma structure & naming (important for Locofy mapping)

- Pages: `Design` (main frames), `Components` (atomic components & variants), `Tokens` (styles).
- Top-level frames: `Home / Desktop`, `Home / Laptop`, `Home / Tablet`, `Home / Mobile`.
- Component names (use PascalCase):
  - `Header`
  - `TimetableGrid`
  - `DayColumn`
  - `HourRow`
  - `Cell` (create variants: `Default`, `Selected`, `Occupied`)
  - `EditorAside`
  - `SubjectPill`
  - `PrimaryButton`, `SecondaryButton`
- Use Auto Layout for all containers; prefer consistent spacing tokens (4 / 8 / 12 / 16 / 24 / 32).
- Use Frames inside components (not groups) so Locofy can target them reliably.

Variants & states

- `Cell` variants: `Empty` (default), `Hover` (optional), `Selected`, `Occupied` (show emoji + pill).
- `Header` variants: `Default`, `Collapsed` (for mobile/tablet).
- `EditorAside` variant: `Sidebar` (desktop), `BottomSheet` (mobile).

Design tokens (map to `tailwind.config.cjs`)

- Colors (create Figma Color Styles):
  - `Primary` -> `#0f172a`
  - `Accent` -> `#7c3aed`
  - `StudentBlue` -> `#3b82f6`
  - `StudentPink` -> `#fb7185`
  - `StudentYellow` -> `#f59e0b`
  - `StudentGreen` -> `#10b981`
  - `Surface` -> `#f8fafc`
- Text styles: create `H1`, `H2`, `Body`, `Caption` matching the scale in `figma-design.md`.
- Corner radius: `Card` 8px, `Button` 6px.

Auto Layout & constraints

- Use Auto Layout for rows/columns; set padding on the parent, fixed height for hour rows (e.g., 48px) so grid aligns.
- For responsive frames, set component resizing behavior: horizontal resizing -> Fill container; vertical -> Hug contents where appropriate.
- Constrain sidebars to left/right edges; allow main content to stretch.

Assets & icons

- Prefer SVGs for icons; put them as vector layers and export as SVG.
- For small images (stickers), export PNG 2x only if necessary.

Locofy plugin settings (recommended)

- Target: `React` (JSX)
- Styling: `Tailwind` (choose the Tailwind version compatible with the project; we use Tailwind v3)
- Component output: `Functional components` (JSX)
- File structure: Group components under a `components/` folder
- Export assets: `Export as web-friendly` (SVGs in `assets/icons`)
- Naming: Keep `PascalCase` for components and `kebab-case` for CSS classes if available.

Locofy mapping best-practices

- Map Figma Components to React Components exactly using the Component names above.
- For repeating lists (e.g., `DayColumn` containing `HourRow`), mark the repeating layer in Locofy so it exports a loop-friendly structure (Locofy calls this a "List").
- Mark dynamic text areas (like a cell title) as Text Content in Locofy so they become props.
- For subject pills/emoji, make the pill a component with a text property and a color style so Locofy exports it as a component with props.

Export checklist (Figma owner / designer)

1. Confirm all components have consistent naming and are in `Components` page.
2. Ensure Figma Color/Text Styles match the tokens listed above.
3. Set Auto Layout on all containers and verify resizing behaviors for each breakpoint.
4. Run Locofy plugin:
   - Select the `Home / Desktop` frame (and other frames if you want multi-breakpoint export).
   - In Locofy: map components to React components (use the PascalCase names above).
   - Mark `DayColumn` as a List (repeating structure) and `HourRow` as list item.
   - Choose `React` + `Tailwind`, JSX, Functional Components.
   - Export and download the ZIP.

Integrating Locofy export into this repo (post-export)

- Unzip Locofy export. You will find folders like `components/`, `assets/`, and an `index.html` (if static preview).
- Copy `components/*` into this repo's `src/components/`. Prefer merging exported components into the existing `TimetablePlanner.jsx` structure or replace with new components and then wire state.
- Copy `assets/*` into `public/assets` or `src/assets` (update imports accordingly).
- Replace static lists with the project state: e.g., replace exported `DayColumn` props with the `grid` state in `src/components/TimetablePlanner.jsx`.
- Update imports to point to local assets if the exported paths differ.

Quick mapping examples (how to wire dynamic pieces)

- Exported static cell markup (example) -> replace with dynamic rendering:
  - Static: `<div className="cell">Math homework</div>`
  - Replace in React: `{cell && <SubjectPill emoji={cell.emoji} color={cell.color} text={cell.title} />}`
- For lists: Locofy might export a `DayColumn` component; import it and call:
  - `{grid.map((col, idx) => <DayColumn key={col.day} day={col.day} slots={col.slots} />)}`

Notes about manual wiring I can help with

- Locofy exports static markup. I will integrate that exported markup with React state/hooks, localStorage saving, and event handlers (Add / Clear). If you prefer, you can run Locofy, upload the exported ZIP here, and I will integrate it into `src/` and wire dynamic interactions.

Troubleshooting tips

- If classes look different after export: Locofy may choose utility class variations — minor manual tidy-up may be needed.
- If responsive breakpoints don't match exactly: export each breakpoint frame separately, or use Locofy's responsive settings to generate variants.

Deliverables I can create next (pick any)

- A Figma-ready .md spec with exact frame-by-frame layout (I can auto-generate a checklist for each frame).
- `data-locofy` annotations inside `src/components/*` to make merging exported components easier.
- Full integration: you run Locofy, provide the ZIP, and I integrate the exported components and wire them to the timetable state.

If you'd like me to generate a short example mapping file that shows exact component prop names and a small integration snippet for `DayColumn` -> `TimetablePlanner`, say "integrate after export" and I'll produce it and add to the repo.
