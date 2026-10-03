# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Toli Land design decisions

- Build a responsive website, not a framed mobile app.
- The world and all seven kingdoms are fully illustrated, zoomable maps.
- The capital is a visually prominent curated introduction; featured projects also belong to their category kingdoms.
- Landmarks are recognizable symbols and characters, not primarily buildings shaped like their subjects: the recognizable plain Pickle Rick character for PickleJS, a walking storybook with arms and legs for Frontend Infra Book, a Dota mage for the Dota essay, and a cracked egg full of creatures for Easter Creatures.
- Keep each character's identity consistent across the world, Capital, category map, and detail page. The FE book has a green cover, smiling face, gold corners, paper arms, ribbon legs, and brown boots. Its silhouette must remain readable when zoomed out and in phone crops.
- Selecting a landmark opens an illustrated page explaining the project with real links and a reliable return to the originating map.
- Latest direction (2026-10-03): a clean symbol map on warm cream paper. Remove city detail, crowds, buildings, scenery, ornate signs, and dense road networks. Use a few thin paths and large recognizable characters/objects; names are real HTML labels below the symbols. Use generated raster artwork and actual icon-library icons, never CSS/SVG substitutes for illustration.
- Keep unknown descriptions modest and factual. The selected featured projects are editorial defaults, configurable in content data.
- Add Storybook stories for components and meaningful interaction states. Verify desktop, phone, keyboard, reduced motion, navigation history, and zoom behavior.
- Keep the legacy site outside this directory intact. Commit only this task's changes.
