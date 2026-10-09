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
- `#/travels`: World / United States map views. The U.S. view fills 18 selected states plus D.C. and includes 26 clustered places; the default world view remains above 18 countries grouped geographically: the original 14-country archive plus Spain, Mexico, Switzerland and Kenya. Approved places show photo/video capture months and counts; these do not imply complete trip dates or a lifetime count.
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

## Compact main projects and Creative rows — October 7, 2026

Toli requested the three main projects first, compactly, then Creative in the same thumbnail-left/name/description format as Writing. Home order is now introduction → Main projects (Drawn, Neurodiverse Guide, Dating Bounty) → Creative → Writing → Life in pictures → exploration. The main trio uses a three-column row on wide desktops and three compact rows below 1000px; all project artwork, descriptions, direct links and the guide's YouTube subtitle are retained. The old large guide/bounty features are removed from Home. Drawn is not repeated in Home Creative, but remains in the five-item Creative collection. Both Creative placements share the same row component. Artwork fits inside its thumbnail; Spa Date and parody videos use decorative library icons where original cover art is unavailable. No new image generation or invented video thumbnail is used.

The existing Obscure Parody Videos link is visible in both Creative placements. Its actual YouTube page is marked Private in the authenticated session, so the listing states that status; no video privacy setting is changed and no private artwork/title is republished. A request for additional public video/playlist links remains pending. The linked channel's visible collections did not establish a parody playlist. This is not a verified watchable public video collection.

Existing content/privacy/navigation/packaging tests, production and Storybook builds, hosted phone/desktop visual checks, original portrait separation and row-image sizing are verified before the established Netlify publication. Compact-main-project, Creative-row and mobile Creative stories cover the new presentation. Matched light-theme, top-scroll 430×844/1280×900 screenshots and a source/deployment receipt are retained in `/Users/toli/Documents/toli-compact-projects-2026-10-07/`; publication is recorded separately from implementation.

## Approved travel additions — October 7, 2026

October 8 design-only follow-up: Toli requested a drawing of the suggested About/Now additions. The committed `docs/home-context-concepts-2026-10-08/brief.json` freezes three image concepts, current style/portrait references and draft-copy boundaries before image generation. These are unselected proposals; application code, production behavior and deployment are unchanged. Generation and visual review evidence stay separate from the frozen brief.

Three built-in Image Gen results are retained as unselected 1024×1536 concepts in displayed order. `docs/home-context-concepts-2026-10-08/receipt.json` records the exact frozen brief commit, runtime, render hashes and keep-as-proposals decision. Their palette, portrait placement and main-project/Creative hierarchy are visually reviewed; generated photo strips, writing thumbnails and the second concept's attributed quotation are placeholders, not approved assets or words. Replace those with verified source media/copy before any implementation. No live page or runtime code changed.

Implemented: the maintained U.S. selection now contains 17 states plus D.C. and 23 places. D.C. uses the existing complete district boundary and is counted separately from states. The original eight-state selection is preserved; additions are Portland, Fort Worth, Springdale/Zion, Jersey City, New Haven, Philadelphia, Pontoon Beach, Killington, Charlotte and Washington, D.C. Pins use approximate public place centers, not private photo GPS. Existing Leaflet selection, keyboard controls, reset, zoom and Hawaii inset remain shared.

World now highlights 18 countries and lists Tulum under Mexico, Zürich under Switzerland and Pridelands under Kenya. Toli explicitly approved these additions and excluded London. Charlotte is included by his selection despite incomplete receipt evidence. The private metadata/email research remains partial; public selections do not imply exhaustive travel history. No private photo, receipt, message, visit date or research link enters the app.

Verified for this candidate: production build, all 33 local tests and Storybook build pass. Geographic tests check every pin inside its complete state/district boundary, original country import preservation and exclusion of the United Kingdom. Desktop 1024×900 and phone 390×844 show 18 fills, 23 pins and no page overflow; D.C./Charlotte selection and reset pass. The world list also has no overflow at 320px. Matched before/after screenshots stay in the private evidence directory. Production publication and remote-byte verification are recorded separately in the private travel-additions evidence receipt and Toli Wiki.

## Mobile homepage drawings — October 8, 2026

Toli requested mobile versions of the three unselected desktop concepts. `docs/home-context-concepts-2026-10-08/mobile-brief.json` freezes their prompts before rendering: narrow single-column scroll pages, stacked compact main projects before Creative thumbnail rows, preserved original portrait and draft About/Now copy. The desktop sidebar becomes lower full-width About/Now content on phones. Original article art replaces illustrative draft thumbnails; invented quotations/photo strips are omitted. Drawings are proposals, not implemented or functionally verified responsive layouts. Runtime and live deployment remain unchanged.

Three phone renders are retained in desktop-corresponding order as unselected proposals. `docs/home-context-concepts-2026-10-08/mobile-receipt.json` records frozen source, exact output dimensions/hashes and visual review. The generated portrait does not visibly overlap text; main projects and Creative remain stacked thumbnail rows. Concept 2 puts About/Now below Writing, and concept 3 uses a handwritten Now note. Added copy is draft, and thumbnail/asset fidelity is not production-verified. No functional responsive check or deployment occurred.

## Rejection article cartoon — October 8, 2026

Toli requested a cartoon image for Rejection, Breakups, Vulnerability, and BDSM. `docs/rejection-thumbnail-2026-10-08/brief.json` freezes the exact built-in generation prompt and cleaned comic reference hashes before rendering. The wordless cracked-heart illustration is an editorial metaphor drawn from the essay, not a factual depiction of a partner or breakup. The full master style prompt is preserved; the page structure is adapted to a single thumbnail. Generation, visual review, consuming artwork changes and publication are recorded separately.

## Source thumbnails — October 8, 2026

Implemented: the rejection essay now uses Toli’s requested wordless cartoon, replacing its author-portrait fallback on Home and Writing. One built-in generation ran against clean frozen source `0f3f6f4a60181bb8d94f4ad523a8c27414fe1bdc`; `docs/rejection-thumbnail-2026-10-08/receipt.json` retains exact prompt/reference provenance, output hashes, separate style/content review and keep decision. Spa Date uses its existing public jacuzzi illustration, and Obscure Parody Videos uses the requested actual screenshot at approximately 0:30. Both Creative placements share those assets. The video remains private, with the existing status subtitle and generic public listing title.

Original files are preserved beside full-frame, metadata-stripped WebPs (maximum 960px, no upscaling, quality 87). Provenance is in the existing writing/artwork source records. Layout, hero portrait, routes and the six-plus-eight public gallery remain unchanged. Apple Photos review produced a separate private 12-photo proposal limited to the first 1,620 photos; selection and high-resolution source retrieval remain pending. Thumbnail-copy review does not establish original-resolution suitability. Build/tests and matched desktop/phone browser QA precede production publication; deployment evidence is recorded separately.

Free checks completed for the thumbnail candidate: production build, all 33 existing tests, Storybook build and whitespace checks pass. No new interaction state or layout contract was introduced. Hosted visual verification and production bytes remain separate from these local checks.

## Approved Life in pictures — October 8, 2026

Toli approved the exact pictured 12-photo Apple Photos shortlist. The initial six are the laughing portrait, Acro balance, Las Chicas art-making, dogs, red-rock friends and paddleboarding; the remaining six are under the existing native More disclosure. The count changes from 14 (six plus eight) to 12 (six plus six). The hero portrait stays unchanged. Ten selected images come from Photos’ supported Export Unmodified Original; the laughing portrait and Promise portrait reuse larger existing public WebPs. Photos’ ordinary Full Size export returned a 320px review rendition for Acro, while unmodified export yielded 720×960. The original exports range up to a 9181×3445 panorama. Original photos and Live Photo companions remain private.

Public WebPs are auto-oriented, stripped of metadata and bounded to 1600px without upscaling. Gallery images now contain the whole frame inside the existing grid cells, preserving group members and Acro limbs; the panorama spans all columns at its natural ratio. No crop, generative editing, GPS, dates, filenames or video components are published. The exact selection, source method and hashes are recorded in `docs/life-pictures-2026-10-08.json`. The earlier private-selection pending status is superseded. Existing gallery stories cover collapsed/expanded states; local checks and matched desktop/phone visual QA precede publication, recorded separately in the private release receipt.

Free verification for this gallery candidate: production build, all 33 existing tests, Storybook build and whitespace checks pass. All 12 selected assets are distinct, match their recorded dimensions and contain no EXIF/XMP metadata. Browser checks validate the actual contain framing, expanded disclosure and wide panorama separately from these checks.


## Approved Apple travel details and Leaflet clustering — October 8, 2026

Implemented: Toli approved the eight locations in the Apple findings table and requested their data plus Leaflet grouping. `src/travel-place-details.js` contains public place centers, recorded capture months and photo/video counts for Goleta, Cabo San Lucas, Santa Barbara area (Mission Canyon cluster), Granada/Nicaragua, Kiwengwa/Zanzibar, Rising Sun area/Maryland, San Juan del Sur and Granada/Spain. Distinct geographic IDs keep the two Granadas separate. Multi-month records list separate months rather than claiming a continuous stay. The displayed evidence is archive media, not a complete itinerary; raw photos, filenames, precise capture coordinates, export/session files and research links remain private.

The U.S. selection is now 18 states plus D.C. / 26 places, including complete Maryland fill and three new U.S. pins. World keeps all 18 maintained countries and adds the eight dated places. Both views lazily load Leaflet 1.9.4 and `leaflet.markercluster` 1.5.3 through a shared marker helper. Clusters display place counts, expand on activation and spiderfy at maximum zoom; list buttons reveal the exact marker and dated popup. Reset restores the full map; world/mainland/Hawaii component cleanup supports switching views. Popups have bounded widths for phones; native buttons provide keyboard alternatives to map gestures. No external tiles, geocoder or API key is needed.

World is now a zoomable Leaflet view of the same Natural Earth/world-atlas 2.0.2 countries, replacing the static SVG at the display boundary. `scripts/generate-travel-geography.mjs` preserves the historical projected SVG data and additionally generates `world-geography.json`. It unwraps longitude and uses the build-only `polygon-clipping` 0.15.7 package to split dateline-crossing polygons; Leaflet otherwise draws erroneous horizontal fills across other countries. Geometry regression checks guard this observed failure. Existing state geometry and source licenses are preserved. Public centers derive from GeoNames city data (CC BY 4.0); they never reproduce private photo GPS.

Verified locally: all eight month/count summaries match private source grouping; production and Storybook builds and all 34 free tests pass. Matched 1024×900 and 390×844 screenshots, cluster expansion, all eight world popups, Maryland keyboard selection and mobile popup/close-control bounds at 320px pass. Private `/Users/toli/Documents/toli-apple-travel-map-2026-10-08/` receipts preserve evidence. Publication and deployed-byte checks are separate statuses; the release receipt identifies the exact deployed commit after publishing.

## Main-branch integration and closeout — October 8, 2026

Toli requested merging and closing the personal-site task. The published Personal Index, gallery and clustered travel maps are integrated with the existing main branch; its separate root application and GitHub Pages workflow are preserved. Netlify production continues to use `land/`; this merge does not republish or replace the verified October 8 production deployment. Verified integration: all 34 land tests, its production and Storybook builds, the preserved root app build, and whitespace checks pass before PR merge. The root app dependency install reports six existing audit findings (two moderate/four high); dependencies are unchanged by this integration. Private research exports remain outside Git. The Google Photos audit remains unfinished (0/336 parsed); the last reported successful download has not yielded a Takeout file in Downloads at closeout. No temporary ZIP was available to delete, and original libraries are preserved.
