Figma Design & Breakpoint Guide for Study Timetable Planner

Breakpoints (recommended for Figma frames and to match Tailwind):

- Desktop (Large): 1440px — primary high-density workspace. Use for detailed editing and multi-column sidebars.
- Laptop (Medium): 1024px — two-column layout with collapsible sidebar.
- Tablet: 768px — single column stack, grid scroll horizontally if needed.
- Mobile: 375px — stacked content, simplified interactions, bottom sheet for add/edit.

Design tokens:

- Colors: Primary `#0f172a`, Accent `#7c3aed`, Surface `#f8fafc`, Muted `#6b7280`, Danger `#ef4444`.
- Typography: Inter / 16px base; H1 24-30px scale; body 14-16px.
- Spacing: 4 / 8 / 12 / 16 / 24 / 32.
- Corner radius: 8px for cards, 6px for small buttons.

Figma tips for breakpoints:

1. Create a top-level component for `Header`, `TimetableGrid`, and `EditorAside`.
2. Use Auto Layout for the main page layout: set direction horizontal for Desktop, vertical for Mobile. Use component variants for layout states (collapsed/expanded sidebar).
3. For the timetable grid:
   - Use a frame per day column and an auto-layout row for hours.
   - Constrain cells to stretch and set fixed row height for hour rows.
   - Use component instances for a cell: default, selected, occupied, overflow.
4. Prototype interactions:
   - On mobile, show `Add` as bottom sheet (overlay) with ease-in animation.
   - Use hover states on Desktop to reveal quick actions (+, delete).

Accessibility & UX goals:

- Keyboard navigable: ensure focus states on cells and buttons.
- Sufficient color contrast for text and interactive elements.
- Provide affordances: small icons with labels and tooltips on hover.

Export & Handoff:

- Export color tokens and typography styles as a design tokens file.
- Provide component variants (default/active/disabled) and spacing tokens.
- Include an `Interaction` page describing key flows: create event, edit event, repeat patterns.

Breakpoint checklist for implementation:

- For each frame, capture the layout behavior (what hides/collapses, what stacks).
- Provide screenshots for 3 key flows at each breakpoint: view timetable, add event, edit event.
