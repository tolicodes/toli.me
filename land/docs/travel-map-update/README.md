# Travels map — October 5, 2026

Toli requested a map at the top of Travels. The responsive world map now sits between the heading and existing country groups, highlighting exactly the maintained 15-country archive, including Spain. No places, trip dates or city locations were added.

The map uses real country boundaries from [world-atlas 2.0.2](https://github.com/topojson/world-atlas), which redistributes Natural Earth 4.1.0 at 1:110m. [Natural Earth data is public domain](https://www.naturalearthdata.com/about/terms-of-use/); the redistribution license is preserved alongside this note. The Natural Earth 1 projection is generated at build time with d3-geo 3.1.1 and topojson-client 3.1.0; the app ships only projected paths. Antarctica is excluded to give the inhabited continents more space. This is a country-level archive overview; small countries remain small at world scale. The accessible SVG description and original text list name every country.

Regenerate with `node scripts/generate-travel-geography.mjs`. Highlights derive from `travelArchive`, joined through ISO numeric identifiers in `src/travel-map.js`. Adding countries requires maintaining that identifier table; a test fails on missing or incorrect mappings. This avoids the generated drawing’s earlier neighboring-country fill mistakes.

Verification: production build, all 25 tests and Storybook build pass. Browser checks verify 15 filled countries, the same 15 list entries, and no console errors or horizontal overflow at 1024 × 900 and 390 × 844 CSS pixels. Screenshots use light theme and top scroll, with actual viewport dimensions inspected after the browser zoom/viewport settings settled.

- [Before desktop](before-desktop.jpg) / [after desktop](after-desktop.jpg)
- [Before phone](before-phone.jpg) / [after phone](after-phone.jpg)

Deployment status and source revision are recorded separately in `release.json` after publishing. The October 3 generated drawing remains a historical concept and is not the map used by the application.
