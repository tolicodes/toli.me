# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Toli Land design decisions

- **Latest scope, October 3, 2026:** Toli now wants to retain only Work (one external link to `https://tolicodes.com`), Publications (Neurodiverse Guide and Principles), Creative (Drawn, Easter Creatures, Las Chicas, Spa Date), all six existing Writing entries, Travels, Dating Bounty, and Obscure Parody Videos. Merge the two existing workplace-guide placements into one. This supersedes the earlier 54-entry/seven-kingdom content requirement; those assets remain historical evidence. The requested scope is 15 personal destinations plus the Work link.
- **Selected and implemented, October 3, 2026:** Toli explicitly chose normal-site option **3, Personal Index**, from the final numbered gallery. `src/PersonalSite.jsx` is now the application entry point. Use ordinary scrolling sections, the three featured rows, and four internal collection pages. Work is external; Obscure Parody Videos belongs in Creative. The earlier smaller-world proposal is superseded.
- Toli also suggested melding actual logos and characters. Source references were gathered, but the subsequent scope change arrived before a hybrid sheet was generated. Apply recognizable source artwork to the retained content; do not continue generating removed engineering-project mascots without a new request.
- Follow-up usability question (October 3): Toli asked whether Toli Land is too gimmicky/hard to explore. The current-beta audit recommends ordinary scrolling sections, visible titles/previews and direct reading links as the default, retaining character artwork and making the map an optional Explore mode. This revises the assistant's recommendation, not the user's approved design. Evidence: `docs/exploration-audit/index.html`. No application changes were made by the audit.
- **Featured correction:** Dating Bounty replaces Principles in the main spot. The featured trio is Drawn, Neurodiverse Guide, Dating Bounty; Principles stays under Publications. The final option 3 image at `docs/normal-site-concepts/03-personal-index.png` is the selected layout source. Generated book/envelope characters are illustrations, not original publication covers. The app uses a real published Drawn comic preview.
- **Original-image correction:** Easter Creatures must use its original creature line drawing; Las Chicas must use the actual Granada workshop photograph. Preserve their provenance in `docs/personal-artwork-sources.json`; do not substitute generic egg creatures or imagined women.
- **Native Travels:** Keep the visited-country archive inside the site. The original explicit list contains 14 countries, verified against its map permalink. Copy that list exactly; do not infer visit dates, claim it is a current lifetime total, or publish ambiguous Hawaii/template content and unrelated photos as travel evidence. Source evidence lives in `docs/travel-import/`.
- **Travel map drawing follow-up (October 3):** Toli requested a map for Travels. The illustrated concept at `docs/travel-map-concept/travel-map.png` uses the site's cream/green palette and 14 named markers. This drawing is not yet integrated or selected for release. Use geographic data and real text overlays for accurate responsive markers if implementing it; generated filled-country variants were unreliable around small neighboring countries.

### Earlier implemented direction and visual preferences

- Build a responsive website, not a framed mobile app.
- The world and all seven kingdoms are fully illustrated, zoomable maps.
- The capital is a visually prominent curated introduction; featured projects also belong to their category kingdoms.
- Landmarks are recognizable symbols and characters, not primarily buildings shaped like their subjects: the recognizable plain Pickle Rick character for PickleJS, a walking storybook with arms and legs for Frontend Infra Book, a Dota mage for the Dota essay, and a cracked egg full of creatures for Easter Creatures.
- Keep each character's identity consistent across the world, Capital, category map, and detail page. The FE book has a green cover, smiling face, gold corners, paper arms, ribbon legs, and brown boots. Its silhouette must remain readable when zoomed out and in phone crops.
- Selecting a landmark opens an illustrated page explaining the project with real links and a reliable return to the originating map.
- Latest direction (2026-10-03): a clean symbol map on warm cream paper. Remove city detail, crowds, buildings, scenery, ornate signs, and dense road networks. Use a few thin paths and large recognizable characters/objects; names are real HTML labels below the symbols. Use generated raster artwork and actual icon-library icons, never CSS/SVG substitutes for illustration.
- Keep unknown descriptions modest and factual. The selected featured projects are editorial defaults, configurable in content data.
- Icon-sheet feedback (2026-10-03): the NYC apple does not communicate LeetCode. Use a coding/problem-solving community symbol for LeetCode and carry the same emblem into its podcast icon. Present the complete icon catalogue grouped into its seven categories. The specific puzzle-team replacement is a proposal until selected.
- Add Storybook stories for components and meaningful interaction states. Verify desktop, phone, keyboard, reduced motion, navigation history, and zoom behavior.
- Keep the legacy site outside this directory intact. Commit only this task's changes.
