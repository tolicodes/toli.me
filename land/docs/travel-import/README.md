# Travel import — October 3, 2026

This is the source-grounded import for an **internal** Travels section/page in the selected normal-site redesign. The original source is [Toli Travels](https://travel.tolicodes.com/). No source site was changed.

## Ready to publish

`travel-data.json` contains all **14 countries explicitly declared visited** by the original page, in its original order: Canada, Costa Rica, Nicaragua, United States, Finland, France, Italy, Russia, Tanzania, Israel, Malaysia, Thailand, Vietnam, Australia.

The list is independently corroborated within the same source by its [amCharts permalink](https://www.amcharts.com/visited_countries/#FI,FR,IT,RU,CA,CR,NI,US,TZ,IL,MY,TH,VN,AU), whose fragment has exactly the same 14 ISO country codes. The amCharts URL now redirects to VisitedPlaces; it should not be the new site's principal travel destination.

**Use “14 countries in my travel archive,” not a freshly verified lifetime tally.** The old page has no last-updated date. No exact travel dates, cities, trip notes, routes or photo locations are sufficiently verified to publish as facts. Country groupings in the JSON are editorial organization, not claims copied from Toli's original prose.

## Keep separate from the visited list

- **Hawaii** appears as a heading before “Planned Trips,” but its description is lorem ipsum and its adjacent image shows a printmaking studio. Preserve it as an additional source mention; do not count it as another country or silently publish it as a verified visit.
- **“2020 Jun - Nicaragua”** appears twice: once in the main content and once under “Planned Trips,” with the same template description and byte-identical photo. Nicaragua's visited status is explicit in the country list; **the June 2020 timing is not a verified completed trip**.
- The old “Planned Trips” Nicaragua entry is a historical plan, not a current/upcoming plan and not a second trip.
- Exclude lorem ipsum descriptions, template headings and placeholder social/contact links.

## Source assets

`assets.json` records exact URLs, file sizes and SHA-256 hashes. The source downloads are evidence; they are not all suitable destination illustrations.

| Local file | Source placement | What can safely be said |
| --- | --- | --- |
| `source-image03.jpg` | Country summary at `#image03` | Original static map highlighting visited countries. Could be reused with descriptive alt text, though its controls are baked into the image and must not masquerade as interactive controls. |
| `source-image02.jpg` | Nicaragua card at `#image02` | Two people holding Dropbox Growth prints in an art studio. Location/date unverified. |
| `source-image04.jpg` | Planned Nicaragua card at `#image04` | Byte-identical to `source-image02.jpg`. |
| `source-image01.jpg` | Hawaii card at `#image01` | Sideways photograph of a person at a printmaking table. Location/date unverified. |
| `source-567c3082_original.jpg` | Untitled gallery | Two people and a dog outdoors. Location/date unverified. |

Do not substitute stock destination photography and imply it documents Toli's visits.

## Practical internal page

- Homepage: a travel band with “Places I’ve been,” one small illustration or map, “14 countries in my travel archive,” and **“Explore my travels” linking to an internal route** such as `/travels`.
- Internal page: all 14 countries immediately readable as an alphabetical list or geographic groups. A compact visited-country map can add context, but text remains the useful primary content on phones.
- If a map is implemented, shade countries from `iso2`; do not place markers in invented cities or draw a chronological route. No API or external travel-site embed is needed for the complete country list.
- An understated source link (“From my original travel page”) preserves provenance. Avoid presenting the source's unfinished trip cards, ambiguous photos or lorem ipsum as a polished travel journal.

## Evidence and checks

- `source.html`: exact public HTML retrieved on October 3, 2026.
- `source-extract.json`: semantic source blocks, links, images, retrieval timestamp and raw HTML hash.
- `travel-data.json`: implementation-ready facts plus separate unresolved/ambiguous entries.
- No deeper travel-specific local repository was found among the local repository names or in the cached ToliCodes research. This is **not** a claim that no other travel history exists elsewhere.
- Verification: all 14 imported country names exactly match `#list02`; all 14 ISO codes exactly match the source's amCharts permalink; IDs are unique; completed trip dates and city coordinates are intentionally absent.
