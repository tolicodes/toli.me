# Toli Land design QA

final result: passed

## Evidence and comparison setup

Source visual truth: `docs/references/world-concept.png`, `capital-concept.png`, and `mobile-pickle-concept.png`. The latest request explicitly extended these concepts with a more creative storybook, literal landmarks, and a complete website. The implementation therefore preserves the world and illustration direction while adding real navigation, original project copy, chapters, and accessible controls.

Implementation: production build at `http://127.0.0.1:4174/`, inspected in the Codex in-app browser. Development checks also used port 4173.

- World reference: 1536 × 1024 pixels. Normalized proportionally to 1080 × 720 and centered on a 1280 × 720 paper canvas. Implementation: 1280 × 720 CSS pixels and screenshot pixels, initial whole-world state, light paper theme, scroll 0. This compares composition, not an exact pixel clone: the final atlas reserves space for real controls.
- Pickle reference: 852 × 1846 pixels, normalized to 390 × 844. Implementation: 390 × 844 CSS and screenshot pixels, initial PickleJS story, light paper theme, scroll 0. Captures have one screenshot pixel per CSS pixel. No device bezel or browser chrome is included.
- Full comparisons inspected with both images in the same input: `docs/qa/world-reference-comparison.jpg` and `docs/qa/pickle-mobile-reference-comparison.png`, reference left and implementation right.
- Focused copy/CTA comparison: `docs/qa/pickle-copy-focused-comparison.png`, the lower 424 pixels of the same normalized pair. The individual full-size mobile comparison also makes the body text and controls readable.
- All kingdoms: `docs/qa/kingdoms-desktop-contact-sheet.jpg` and each kingdom's full-size desktop capture. Additional evidence includes `capital-desktop.jpg`, `capital-mobile.jpg`, `publications-mobile.jpg`, `world-mobile.jpg`, and `book-desktop.jpg`.
- Original live homepage versus redesign: `docs/qa/before-home-desktop.jpg` and `world-desktop.jpg`, both 1280 × 720, initial home state, scroll 0, light theme. This pair records the redesign, rather than evaluating fidelity to the old Carrd layout.

## Findings and iteration history

No actionable P0/P1/P2 findings remain.

1. **P2, mobile starting view:** The original Capital camera centered an empty plaza while clipping the four landmarks. Changed its phone starting position to the PickleJS/NYC neighborhood. `capital-mobile.jpg` shows readable literal landmarks and persistent controls. The fit control still offers the complete composition.
2. **P2, map fit:** The asymmetric phone center was also used by “Show whole map,” cutting off the right edge. `capital-mobile-overview-before-fix.jpg` records the problem. Overview now centers independently and treats equal-width artwork as fitted. `capital-mobile-overview-fixed.jpg` shows all four landmarks. A regression test covers the asymmetric start.
3. **P2, camera and focus:** The departure animation overwrote the saved camera, and dialog rerenders could restore an old zoom. Preserved the pre-flight camera and restored the initial view only on map mount. Browser checks confirmed identical camera transforms before departure/after return, and before/after opening the atlas. Keyboard focus now also reveals vertically offscreen landmarks and returns to the trigger after closing a dialog.
4. **P2, hotspot overlap:** Capital and Curiosity Cove rectangles could select a neighboring place; two speaking signs were outside their targets. Adjusted the areas to the generated landmarks. Source review and browser selection checks confirm corrected destinations.
5. **P2, mobile primary action:** The expanded project chapters pushed the primary external link below the first phone screen. `pickle-mobile-before-cta-fix.jpg` records that state. Moved actions directly after the introduction in both DOM and visual order. The final 390 × 844 `pickle-mobile.jpg` and normalized comparison show the summary, primary action, and return link above the fold; longer chapters continue below.
6. **P2, small text contrast:** Gold text was 3.64:1 against paper. Darkened the text token from #a47628 to #8d661f (4.68:1) and tightened the muted footer/secondary text colors. Final world and Pickle captures were recaptured from the production build and the exact saved frames were visually inspected.
7. **Test correction:** The Storybook empty-search play function raced the native dialog's opening effect. It now awaits the accessible textbox. Rebuilt and executed both empty-search and chapter-navigation play stories in the browser; both reached their asserted outcomes.

Two screenshot attempts captured stale compositor frames immediately after resizing/navigation. They were discarded and overwritten with observed, stable frames. The final comparison files were regenerated and visually inspected after this correction.

## Required fidelity surfaces

- **Fonts and typography:** Self-hosted Cormorant Garamond provides the literary display hierarchy; Nunito Sans supplies clear UI and body text. The concept's chunky, raster lettering was intentionally refined into real, selectable editorial typography. Landmark signs remain part of the illustration. Long headings wrap, and 320-pixel phone, 390-pixel phone, tablet, and desktop checks found no horizontal overflow.
- **Spacing and layout rhythm:** Desktop keeps the full illustrated board visible with separate header/footer navigation. Phones begin at a readable crop and offer full-map fitting. Project pages become a single column with artwork first. The primary project action remains prominent. The matte around the map and chapter structure are deliberate extensions of the selected concept.
- **Colors and tokens:** Warm paper #f7f3e9, forest ink #183e32, restrained gold #8d661f, and the blue/green/gold artwork preserve the concept's palette. Supporting text uses darker accessible colors; focus has a visible gold outline and map landmarks have a highlighted outline and label.
- **Image quality and asset fidelity:** Thirteen genuine imagegen illustrations preserve the selected style. PickleJS is a pickle workshop; the book is an open pop-up city with a smaller storybook; NYC is a community block; Easter Creatures is an egg hatchery. Every kingdom has its own map. WebP compression preserves readable signs and fine details. Secondary detail screens crop the corresponding actual landmark. No CSS or handmade SVG illustration replacements are used. Phosphor supplies only interface icons.
- **Copy and content:** All 54 original entries have destinations or an honest contact route where the source offered no link. The four featured projects have sourced explanations and chapter copy. First-person presentation copy replaces inventory-like descriptions. The nonresolving PickleJS domain is retained in source records while the visible primary action uses its maintained origin story. No fabricated impact metrics were added.

## Functional and responsive checks

- World → all seven kingdoms and Capital; all map images load.
- Literal landmark → project story → originating map; exact saved camera restored.
- Dragging, zoom buttons, fit, reset, wheel handling, and keyboard pan/zoom support checked; pinch math tested independently.
- Book and Pickle chapters advance; previous/next endpoint states work.
- Atlas search, category filtering, no-results recovery, optional after-hours results, and dialog Escape/focus restoration checked.
- Direct project routes and missing-project recovery checked in the production build.
- Contact/external destinations inspected; no messages submitted.
- Responsive viewports: 1280 × 720 desktop, 768 × 1024 tablet, 390 × 844 phone, and 320 × 740 narrow phone. No horizontal overflow in checked map/story/dialog states.
- Production browser console: no errors or warnings captured during the final navigation pass.
- `npm run build`: passed. `npm test`: 16/16 passed. `npm run test:sites`: 4/4 passed. `npm run build-storybook`: passed, 14 stories. Empty-search and book-second-chapter interaction examples also executed successfully in the browser. Storybook emits a nonblocking Node deprecation notice and a development-bundle size notice.

## Implementation checklist

- [x] World, highlighted capital, seven illustrated kingdoms, and 54 discoverable entries
- [x] Literal landmarks, explanatory pages, and storybook chapters
- [x] Mobile navigation, keyboard alternative, and reduced-motion support
- [x] Generated source artwork preserved outside the production bundle
- [x] Matched before/after homepage evidence and normalized concept comparisons
- [x] Relevant builds, tests, and browser interaction checks

## Residual limits

Real-device multitouch and Safari/Firefox were not available in this desktop browser run. Pinch uses standard Pointer Events and its focal-point math has automated coverage. Maximum map zoom naturally reveals the limits of 1536 × 1024 raster art. External destinations may change independently. This is a local, frontend-only site; domain publishing and replacing the existing toli.me deployment are separate release actions.
