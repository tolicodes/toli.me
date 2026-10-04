# Personal Index design QA — October 3, 2026

final result: passed

## Source and scope

Selected visual: `docs/normal-site-concepts/03-personal-index.png` (option 3, 1024 × 1536). The user requested implementation, replacement of the incorrect Easter Creatures and Las Chicas images, and copying visited places into the site. Dating Bounty remains featured instead of Principles. Earlier map QA is preserved at `docs/qa/toli-land-design-qa-archived.md`.

The homepage preserves the cream/forest palette, serif introduction, oval portrait, three horizontal illustrated feature rows, Writing/More to explore columns, and contact footer. Original public artwork replaces generated stand-ins. Internal Creative, Publications, Writing, and Travels pages extend the design; Work goes directly to tolicodes.com. There are 15 unique personal destinations. All six original essays link directly to Medium.

## Evidence

- Matched before/after homepage: `docs/normal-site-qa/before-desktop.jpg` / `after-desktop.jpg` at 1024 × 900; `before-mobile.jpg` / `after-mobile.jpg` at 390 × 844. Same light theme and top scroll position. Before is the implemented map; after is Personal Index.
- Source and implementation inspected side by side in the same image input: `comparison-first.png`, then `comparison-final.png`. Both panels retain 1024px width; source height is 1536px and rendered page is 1611px. The additional height reflects real text wrapping/spacing rather than scaling the screenshot.
- Captured from the running application at http://127.0.0.1:4175/. `after-desktop-full.jpg` shows the complete homepage; `creative-mobile.jpg` shows original project images; `travels-mobile.jpg` shows all 14 countries.
- Provenance: `docs/personal-artwork-sources.json`, `docs/personal-character-assets.json`, `docs/personal-character-originals/`, and `docs/travel-import/`.

## Findings and corrections

No actionable P0/P1/P2 findings remain in the checked surfaces.

1. The first comparison showed undersized guide/envelope characters. Increased their size within the existing rows; final comparison preserves the featured hierarchy.
2. Meaningful project image descriptions were hidden with duplicate links. Alternative text is now exposed; duplicate image links remain outside the keyboard tab sequence.
3. Route focus ran before the new page committed. It now runs after render, updates the title, focuses main, and resets scroll. Browser verified Travels focus at scroll zero.
4. The mobile-menu story reset its open state on mount. Removed that reset and remount the header on route changes. Actual 390px iframe stories exercise responsive CSS without another addon.

## Verification

- Typography/layout: Cormorant Garamond headings, serif body, clear underlined links, separators, phone stacking. Guide title wraps at 320px. No horizontal overflow on checked 390px pages or the 320px Publications view.
- Images/color: cream paper and forest ink; transparent book/envelope characters; original Easter Creatures line drawing and Las Chicas workshop photograph; unaltered public portrait; real Drawn comic preview. Every homepage image loaded.
- Interactions: all four internal collections, all six writing destinations, native Travels, menu toggle, Escape dismissal, browser Back, title/focus/scroll updates checked. Work is external. Skip-to-content and visible keyboard focus are implemented.
- Travel: 14 countries copied from the explicit source list and cross-checked with the original map permalink. Geographic grouping is editorial. It is labeled an archive, not a verified lifetime total. Ambiguous Hawaii/template text, dates, and unverified location photos are excluded.
- Checks: 24/24 tests pass; production and Storybook builds pass; 29 total stories, 11 Personal Index examples. Built mobile-navigation story opened and visually checked. No local app console warnings/errors. Diff whitespace check passed before commit.

Real-device Safari/Firefox and physical screen-reader testing were not performed. Original artwork corrections take precedence over generated concept imagery; small decorative details differ without changing the hierarchy.

## Release

Verified locally. Netlify beta publication and live verification will be recorded in `docs/normal-site-qa/release.json` after deployment.
