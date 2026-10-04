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

The packaging tests inspect the build output, so build before running checks from a fresh checkout. Storybook has 29 examples, including 11 Personal Index page, component, and phone states. `npm run storybook` opens its development server on port 6006. No accounts, secrets, database, or external font/image requests are needed.

## Content and navigation

- Home features Drawn, Neurodiverse Guide, and Dating Bounty.
- `#/publications`: the guide and Principles.
- `#/creative`: Drawn, Easter Creatures, Las Chicas, Spa Date, and Obscure Parody Videos.
- `#/writing`: all six original essays, linked directly to Medium.
- `#/travels`: 14 countries copied from the original explicit visited list, grouped geographically. It is an archive, not a verified current lifetime count.
- Work links directly to https://tolicodes.com.

Mobile navigation expands inline and supports Escape. Routes update the document title, focus the new content, reset scroll, and support browser history. Unknown/retired map URLs safely return to home. There is no map interaction required to find the retained content.

## Source and artwork

- `src/PersonalSite.jsx`, `personal-site.css`: page components and responsive styles.
- `src/personal-content.js`, `personal-routing.js`: curated destinations, travel archive, and hash routes.
- `docs/normal-site-concepts/03-personal-index.png`: selected visual reference.
- `docs/personal-artwork-sources.json`: original Easter Creatures drawing, Las Chicas workshop photo, and published Drawn comic provenance.
- `docs/personal-character-assets.json`: generated book/envelope/sprig prompts and original portrait provenance.
- `public/assets/personal/`: optimized WebP artwork and untouched original source copies.
- `docs/travel-import/`: captured source, exact country list, evidence, and excluded ambiguous material.
- `docs/normal-site-qa/`, `design-qa.md`: matched before/after screenshots, reference comparisons, checks, and release receipt.

The old illustrated map components, 54-entry inventory, tests, and artwork remain as historical work and Storybook examples. The app entry point no longer imports that experience. The earlier QA record is preserved at `docs/qa/toli-land-design-qa-archived.md`.

## Architecture and publishing

React 19 and Vite; self-hosted fonts and Phosphor icons. Hash routing supports direct section links on static hosting. The build produces the static site in `dist/client` and preserves the Sites worker contract in `dist/server` and `dist/.openai/hosting.json`.

The Netlify beta uses the existing `toli-land-beta` site, ID `bc4a1b57-c973-49eb-b3f0-e7cb69a11925`, at https://beta.toli.me. Build, test, commit, then publish:

```sh
netlify deploy --prod --no-build --dir dist/client --site bc4a1b57-c973-49eb-b3f0-e7cb69a11925
```

Only `dist/client` is deployed. Design notes, source evidence, QA images, and worker packaging stay outside that output. The apex domain and legacy Jekyll site are managed separately. This work lives in the isolated `codex/toli-land` checkout and does not modify human-crm.
