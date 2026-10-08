# Toli · Personal Index

The selected option 3 redesign of toli.me: a normal scrolling personal site with illustrated features, original creative work, writing, publications, and a native travel archive.

## Run and verify

Use Node 22.19+ and npm. From this directory:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4175
npm run build
npm test
npm run build-storybook
```

The packaging tests inspect the build output, so build before running checks from a fresh checkout. Storybook includes Personal Index page, component, phone, gallery and U.S. travel-map states. `npm run storybook` opens its development server on port 6006. No accounts, secrets, database, or external font/image requests are needed.

## Content and navigation

- Home leads with Creative (all five projects, including Drawn) and three popular essays, followed by Neurodiverse Guide, Dating Bounty and a curated photo gallery.
- `#/publications`: the guide and Principles.
- `#/creative`: Drawn, Easter Creatures, Las Chicas, Spa Date, and Obscure Parody Videos.
- `#/writing`: all six original essays, linked directly to Medium, with thumbnails and short summaries.
- `#/travels`: World / United States map views. The U.S. view fills 8 selected states and pins 13 places; the default world view remains above 15 countries grouped geographically: the original 14-country archive plus Spain, added at Toli’s request on October 3, 2026. No visit dates or complete lifetime count are inferred.
- Work links directly to https://tolicodes.com.

Mobile navigation expands inline and supports Escape. Routes update the document title, focus the new content, reset scroll, and support browser history. Unknown/retired map URLs safely return to home. There is no map interaction required to find the retained content.

## Source and artwork

- `src/PersonalSite.jsx`, `personal-site.css`: page components and responsive styles.
- `src/personal-content.js`, `personal-routing.js`: curated destinations, travel archive, and hash routes.
- `docs/normal-site-concepts/03-personal-index.png`: selected visual reference.
- `docs/personal-artwork-sources.json`: original Easter Creatures drawing, Las Chicas workshop photo, and published Drawn comic provenance.
- `docs/personal-character-assets.json`: generated book/envelope/sprig prompts and original portrait provenance.
- `public/assets/personal/`: optimized WebP artwork and untouched original source copies.
- `src/TravelMap.jsx`, `travel-map.js`, `travel-geography.json`: responsive Natural Earth map with archive-driven highlights. Regenerate the projected boundaries with `node scripts/generate-travel-geography.mjs`; add new archive countries’ ISO numeric identifiers to `travel-map.js`.
- `docs/travel-map-update/`: map data license, matched screenshots, verification and release evidence.
- `docs/travel-import/`: captured source, exact country list, evidence, and excluded ambiguous material.
- `docs/normal-site-qa/`, `design-qa.md`: matched before/after screenshots, reference comparisons, checks, and release receipt.

The old illustrated map components, 54-entry inventory, tests, and artwork remain as historical work and Storybook examples. The app entry point no longer imports that experience. The earlier QA record is preserved at `docs/qa/toli-land-design-qa-archived.md`.

On October 6, 2026, maintained map/Storybook book destinations and chapter links moved to `https://feinfra.toli.me`, preserving their paths, queries, and fragments as `feinfra.com` is set to expire. This includes Scaling Frontend Teams at HOVER. The content loader maps the old host at its display boundary; frozen inventories, evidence URLs, archives, and resume binaries retain their historical URLs. The active Personal Index has no Frontend Infra Book destination; this source correction does not change its production bundle or require a Netlify release. The free build and all 25 existing tests passed; all 35 production files remained byte-identical, and the live JS/CSS matched the build without an old Feinfra URL. The new chapter URL returned trusted HTTPS 200. Verification is recorded in `/Users/toli/Documents/domain-migration/2026-10-06/toli-personal-link-migration-receipt.json`.

## Architecture and publishing

React 19 and Vite; self-hosted fonts and Phosphor icons. Hash routing supports direct section links on static hosting. The build produces the static site in `dist/client` and preserves the Sites worker contract in `dist/server` and `dist/.openai/hosting.json`.

Production is https://toli.me, using the existing Netlify site `toli-land-beta`, ID `bc4a1b57-c973-49eb-b3f0-e7cb69a11925`. `www.toli.me` redirects to the apex; https://beta.toli.me remains an alias of the same production deployment, not an isolated staging environment. Build, test, commit, then publish:

```sh
netlify deploy --prod --no-build --dir dist/client --site bc4a1b57-c973-49eb-b3f0-e7cb69a11925
```

Only `dist/client` is deployed. Design notes, source evidence, QA images, and worker packaging stay outside that output. The authorized October 3 apex cutover keeps the tested deployment unchanged; DNS, HTTPS, asset checks, propagation caveat, and rollback are recorded in `docs/apex-cutover/`. The legacy Jekyll source remains intact. This work lives in the isolated `codex/toli-land` checkout and does not modify human-crm.

The October 6 production inspection confirmed this Netlify site still owns `toli.me`, `www.toli.me`, and `beta.toli.me`, with a ready production deployment and no linked Git build configuration. GitHub Pages retains a `toli.me` custom-domain setting on the earlier repository's `main` branch, but current DNS and the live homepage identify Netlify's Personal Index. A push to this checkout is source backup; publication remains the explicit Netlify command above.

## PostHog session replay trial — October 7, 2026

Implemented with pinned `posthog-js` 1.438.2: `src/analytics.js` loads the SDK after the app starts, only for the site's production apex; localhost, generated preview URLs and aliases do not initialize it. `src/posthog-config.js` accepts only the publishable project token and US ingestion host, never a personal API key. The owner completed PostHog organization setup. Project 651591 (US) is now configured with its publishable token; this committed candidate enables recording on the production apex. Deployment and actual replay receipt are verified separately from source checks.

Hash changes between the public collection pages create pageview events. Anonymous events include a `site` property; no named identities/person profiles or cross-subdomain cookies are enabled. Replay masks form inputs, blocks hidden/file inputs and explicitly private elements, and disables console logs, network headers/bodies and captured network requests. Analytics URL metadata strips query strings, credentials and unknown fragments. This metadata filter is not a claim that every URL embedded in replay snapshots is redacted. Public page text/artwork remains visible in replay; this policy must be revisited before adding authenticated or private content. Do Not Track and Global Privacy Control prevent initialization. Analytics loading failures do not prevent rendering.

Free verification: production build and all 29 tests passed, including host/opt-out boundaries, analytics URL redaction and hash-pageview behavior. Project configuration and deployment are complete. Actual recording receipt is verified separately in the Wiki/rollout evidence. The existing hosting/canonical redirects and site design are preserved.

October 7 deployment verification: Netlify deploy `6ac69700143c29686c92bd74` is live at https://toli.me; trusted HTTPS homepage bytes match the tested build. This documentation commit does not republish application code.

## Replay viewport correction — October 7, 2026

The original network-mask callback returned null for every call. SDK 1.438.2 also invokes it with a URL-only object to mask replay page metadata; dropping that call removed the rrweb Meta event and its viewport dimensions, leaving the playback iframe hidden. Received sessions/full DOM snapshots alone did not verify usable playback; a recorded viewport resize could incidentally make some earlier playback work.

The callback now retains sanitized URL-only metadata and rejects actual network-request records. Headers, bodies, console capture, input masking, production-host/privacy opt-outs and private-context gates retain their contracts. Replay page URLs now use the existing URL sanitizer. A regression invokes the installed SDK's actual URL-mask path and verifies that page metadata survives while request payloads are rejected. Corrected source and checks are committed before publishing; new visual playback and deployment receipts are verified separately. Old recordings lacking viewport metadata are preserved and may remain black.

Viewport correction deployed: runtime source 565fe125ccbb2b438b91e0d8e1e7710e1e5c0af1; Netlify 6ac6d104143c29859092be98. New toli.me playback visibly renders the recorded page. This verifies the corrected shared callback; per-host live source checks do not establish visual playback on every host. Old recordings lacking viewport metadata remain preserved. This documentation follow-up does not rebuild or redeploy runtime code.

## Workplace guide destination — October 7, 2026

The featured and Publications Neurodiverse Guide entry now uses `https://neurodiverse.toli.me/`, replacing the broader ToliOS homepage. Both placements share the same content object; layout and navigation contracts are preserved. Free tests/build and the exact Netlify publication are verified separately in the task release receipt. This is a destination change, with no API or mobile behavior change.

## Personal-site correction and editorial refresh — October 7, 2026

Toli clarified that the portrait, photo-grid, expanded Creative and popular-writing requests belong on toli.me, and explicitly requested undoing the misplaced love.toli.me edits. The previous laughing portrait remains the chosen image; phone layout now places it at the top right alongside the introduction. The later yellow-coat request is superseded by “use the previous photo.”

Home order is introduction → Creative → Writing → Neurodiverse Guide/Dating Bounty → Life in pictures → remaining exploration links. Creative expands to three illustrated projects and two additional project links with original-source descriptions; Drawn appears there instead of repeating a full featured row. The existing featured trio data remains shared with collection/Storybook components. All 15 personal destinations and existing hash/navigation, travel and analytics boundaries remain intact. Both shared guide listings include “(and my YouTube talk)” and retain the dedicated subdomain destination.

Home writing now selects Energy Cords (52 visible Medium claps), Rejection/Breakups (51) and negative focus (22), using the previously inspected 30-story public archive. Claps are not unique people; this is a dated editorial selection, not a live feed or an all-platform claim. All six original titles and links remain on Writing. Each has a thumbnail and short description. Three reuse original article artwork documented in `docs/writing-image-sources.json`; the essays without lead artwork use the existing author portrait, with decorative image alternatives in the adjacent titled link. Summaries describe the author's historical personal perspective, not established scientific guidance.

`src/personal-photos.json` contains 14 previously public, curated portraits/activity/friends/Promise photographs. Optimized WebPs live as `public/assets/personal/profile-photo-*.webp`; original photo files remain in their original repository. Six display initially and native disclosure reveals eight more, with three desktop/two phone columns and full-photo links. Curation is subjective presentation, not permanent deletion. Collapsed and expanded gallery states are available in Storybook. Build, existing content/privacy/route/package checks and matched desktop/phone browser QA precede the explicit Netlify publication; deployment/source matching is recorded separately in the task receipt.

Storybook now disables Vite’s duplicate public-directory copy through `viteFinal` while retaining Storybook `staticDirs`; the two concurrent copy paths caused EEXIST errors. This affects component preview packaging only, not the production Vite/Netlify build.

## United States travel map — October 7, 2026

Implemented: Travels adds a World / United States switch above the map. World remains the default and preserves the 15-country archive. The U.S. view colors all of Toli’s eight explicitly selected states and pins all 13 supplied places; the exact list lives in `src/us-travel.js`. Kauai is labeled as an island. This personal list supersedes the earlier suggested popularity shortlist; no ranking, dates or additional destinations are inferred.

`USTravelMap.jsx` lazily loads pinned Leaflet 1.9.4 and static state GeoJSON generated from us-atlas 3.0.1’s 2017 Census cartographic boundaries at 1:10m scale. Run `node scripts/generate-us-geography.mjs` to regenerate; four-decimal coordinates reduce payload without changing the cartographic scale. No external tiles, geocoder, map account or API key is used. The main viewport contains the lower 48 states and D.C.; Hawaii has its own inset on desktop and panel on phones. Complete Hawaii geometry is filled, including islands without pins. Alaska and territories are outside these views and not selected.

Pins have geographic center coordinates, accessible names, keyboard activation, tooltips and popups. The state/place list also selects and zooms a pin; Reset view fits both maps. Wheel zoom is disabled to preserve page scrolling, with mainland zoom controls at the top right. The Hawaii inset sits below the central mainland area so it does not obscure California or Florida pins. ResizeObserver refits the maps, and unmount disconnects observers/removes Leaflet instances. Map animations are disabled. Dedicated desktop and phone Storybook states cover the new view.

Free verification: production build, all 33 tests and Storybook build pass. New geographic checks verify the exact selection, each pin inside its matching state and mainland bounds excluding remote territories. Browser QA at 1024 × 900 and 390 × 844 checks eight fills, 13 pins, no horizontal overflow, place selection, keyboard activation, reset, zoom and switching/remounting. Visual QA found and corrected an initial viewport failure and remote-territory bounds; element counts alone had not established correct map framing. Matched light-theme, top-scroll before/after screenshots and additional complete-map/island captures live in `docs/us-travel-map/`. Source is ready for the established Netlify publication; deployed bytes are verified separately in its release receipt.

U.S. map published: runtime source `bd124022060177082769adaff34effda122b0189`, Netlify ready/published deploy `6ac705ba71ba3f5e52afa182`. All six HTML/JavaScript/CSS files, including the lazy map bundles, returned trusted HTTPS 200 and matched tested SHA-256 bytes. Live desktop/phone checks confirm eight fills, 13 pins, no page overflow and a working place popup. `docs/us-travel-map/release.json` and live screenshots preserve verification. This evidence commit changes documentation only and does not redeploy runtime code.

## Portrait layout correction — October 7, 2026

Toli's phone screenshot exposed an overlap missed by the earlier 390px check: at 430px the heading fits on one line, so the absolutely positioned 118px-tall portrait extends over the introduction. The photo is unchanged. The hero now uses a two-column CSS grid with an explicit heading/portrait row and a separate full-width introduction row on phones; text determines row height rather than competing with an absolute image. Portrait crops are square circles with no CSS rotation, including tablet/desktop sizing. Phone headings scale with viewport width. Desktop retains text on the left and portrait/greeting on the right. Routes, content and media bytes are unchanged.

Free verification uses the existing 33-test suite, production and Storybook builds, and hosted browser checks at 320, 390, 430, 760 and 1280px widths. Matched 430×844 phone and 1280×900 desktop before/after screenshots, measured element separation, exact source/deploy identity and publication checks are retained outside the public repository in `/Users/toli/Documents/toli-portrait-layout-fix-2026-10-07/`. A preview is verification evidence; production publication is recorded separately in its receipt.
