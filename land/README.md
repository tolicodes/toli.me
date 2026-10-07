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

The packaging tests inspect the build output, so build before running checks from a fresh checkout. Storybook has 30 examples, including 12 Personal Index page, component, and phone states. `npm run storybook` opens its development server on port 6006. No accounts, secrets, database, or external font/image requests are needed.

## Content and navigation

- Home features Drawn, Neurodiverse Guide, and Dating Bounty.
- `#/publications`: the guide and Principles.
- `#/creative`: Drawn, Easter Creatures, Las Chicas, Spa Date, and Obscure Parody Videos.
- `#/writing`: all six original essays, linked directly to Medium.
- `#/travels`: A world map above 15 countries grouped geographically: the original 14-country archive plus Spain, added at Toli’s request on October 3, 2026. No visit dates or complete lifetime count are inferred.
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
