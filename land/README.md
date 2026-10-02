# Toli Land

An illustrated, responsive version of toli.me: a whole world, a capital of favorites, seven kingdoms, and 54 places to discover.

## Run locally

Use Node 22.19+ and npm.

```sh
cd land
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173. The app requires no accounts, secrets, database, or external image/font requests.

```sh
npm run build
npm test
npm run test:sites
npm run build-storybook
```

The build must precede the tests because the packaging checks inspect `dist`. `npm run storybook` starts the component gallery on port 6006. Fourteen stories cover maps, camera restoration, reduced motion, project chapters, the atlas, search, and the introduction.

## Explore

- Enter a kingdom from the world map. Start in the Capital for the four featured projects.
- Drag to pan; pinch, wheel, or use the zoom buttons to zoom. The fit button shows the entire map; the compass returns to its starting view.
- Tap the actual illustrated landmark to open its explanation. The departure camera is restored when returning.
- In the Frontend Infra Book, turn the pages of its introduction, then open the complete book.
- Use **The atlas** for search, category filtering, direct travel, and a random detour. After-hours entries are an optional search filter; their neutral illustrated landmarks remain on their home maps.
- Keyboard: Tab through landmarks and controls, Enter to open, arrow keys to pan the focused map, +/- to zoom, Home to fit. Dialogs support Escape and restore focus. Motion follows the system's reduced-motion preference.

## Content and artwork

`src/content.js` defines kingdoms, normalized landmark hit areas, and the four Capital favorites. Each project has one content record and may appear in both its home kingdom and the Capital.

- `docs/content-inventory.json`: all 54 entries and the original destinations collected from the existing site.
- `docs/site-copy.json`: concise presentation copy for the site.
- `docs/featured-detail-copy.json`: the four featured stories, chapter text, and primary sources.
- `docs/landmark-brainstorm.json`: the literal illustration idea for each entry.
- `public/assets`: 13 optimized WebP illustrations, about 8.8 MB total. Maps load as visited; only the current map is needed initially.
- `docs/artwork-source`: original generated PNGs, kept outside the production asset directory.
- `docs/references` and `docs/qa`: concept art, before/after evidence, and browser screenshots.
- `design-qa.md`: comparison results, interaction checks, and limitations.

The previous PickleJS domain did not resolve during research, so its main button opens the maintained HOVER origin story. Original source URLs remain in the inventory. Interests without an original destination offer a contact route rather than an invented link.

## Architecture

React 19 and Vite. Map math and URL parsing are independent modules with Node tests. Hash routes allow direct project links and browser history on a static host without a server rewrite rule. The maps use semantic HTML buttons over raster art; all navigation, tooltips, dialog controls, stories, and links are real UI. Fonts are self-hosted and icons use Phosphor.

`dist/client` is the static production site. The included starter also produces a worker in `dist/server` with the existing Sites packaging contract. The Netlify beta deployment uses `beta.toli.me`; the legacy Jekyll site and its deployment workflow remain separate.

## Review scope

This lives in an isolated `codex/toli-land` worktree of the toli.me repository. It does not modify the unrelated human-crm project. The capital currently features PickleJS, Frontend Infra Book, NYC LeetCode Squad, and Easter Creatures; update `featuredIds` and the capital artwork together when changing the curation.

## Netlify beta release

- Site: `toli-land-beta`
- Site ID: `bc4a1b57-c973-49eb-b3f0-e7cb69a11925`
- Custom domain: https://beta.toli.me
- Netlify URL: https://toli-land-beta.netlify.app
- Dashboard: https://app.netlify.com/projects/toli-land-beta

From this directory, build, verify, and deploy the static client:

```sh
npm run build
npm test
netlify deploy --prod --no-build --dir dist/client --site bc4a1b57-c973-49eb-b3f0-e7cb69a11925
```

Only `dist/client` is published. The original artwork, design notes, QA captures, source inventory, and worker packaging stay outside the public deployment. `netlify.toml` records the build output, while the local Netlify link is gitignored. Beta uses the existing Netlify DNS zone; the apex `toli.me` DNS record is unaffected.
