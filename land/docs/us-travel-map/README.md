# U.S. travel map — October 7, 2026

Toli requested complete-state fills and city pins on toli.me. The selected list is personal travel content, not a popularity ranking.

| State | Places |
| --- | --- |
| Florida | Miami, Orlando |
| New York | New York City |
| California | Los Angeles, San Francisco, San Diego, Palm Springs |
| Nevada | Las Vegas |
| Hawaii | Honolulu, Kauai (island) |
| Washington | Seattle |
| Massachusetts | Boston |
| Arizona | Sedona |

8 selected states, 13 pins. Approximate geographic centers are display coordinates, not visit locations or dates. World remains the default view; choose United States above the map.

## Data and interaction

Pinned Leaflet 1.9.4 renders static state polygons; no map tile service or API key. Source: [us-atlas 3.0.1](https://github.com/topojson/us-atlas), 2017 U.S. Census cartographic state boundaries at 1:10m scale; ISC license retained here. The generator rounds coordinates to four decimal places and is reproducible from the pinned package. Mainland bounds contain lower 48 + D.C.; Hawaii is a separate inset/panel. Full selected-state geometry is filled. Alaska/territories are outside these views.

Pins and place buttons are keyboard accessible, open named popups, and permit exploring clustered California pins through zoom. Reset fits both maps; switching views removes and recreates Leaflet instances. Wheel zoom is disabled. Desktop inset placement leaves selected mainland pins visible.

## Verification and evidence

- Production build, all 33 free tests, and Storybook build pass. Tests verify the user list, state identity, pin containment, mainland bounds, and existing app contracts.
- Desktop 1024 × 900 and phone 390 × 844: eight filled states, 13 pins, no horizontal overflow. Place selection, Kauai island popup, keyboard Enter, zoom, reset, and World/U.S. remount verified.
- Matched light-theme, top-scroll screenshots: `before-desktop.jpg` / `after-desktop.jpg`, `before-phone.jpg` / `after-phone.jpg`. Before is existing public World view; after is the new U.S. selection. `desktop-map.jpg` shows the complete map; `phone-hawaii.jpg` shows island interaction.
- Visual inspection caught remote territories expanding mainland bounds despite correct pin/fill counts. Bounds are now independently checked. Initial map center/zoom precedes marker setup to avoid an undefined marker element.
- Publication uses existing Netlify site `bc4a1b57-c973-49eb-b3f0-e7cb69a11925`; production and beta share it. Exact source/deploy/hash evidence is recorded in `release.json` after publication.

Published source `bd124022060177082769adaff34effda122b0189` as ready Netlify `6ac705ba71ba3f5e52afa182`. All six deployed HTML/JS/CSS files match tested hashes; live desktop/phone rendering and Miami popup pass. See `release.json`, `live-desktop.jpg` and `live-phone.jpg`.
