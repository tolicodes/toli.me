# Dating Bounty destination correction — October 3, 2026

Toli requested directing the previous `toli.love` destination to `love.toli.me`. The featured Dating Bounty image and button now link directly to https://love.toli.me/. This changes the Personal Index destination only; no domain registration, DNS change, or domain-level redirect was performed. Public DNS returned NXDOMAIN for `toli.love`, and its authoritative registry RDAP reported it available for registration. The existing `love.toli.me` site returns HTTPS 200.

Implementation commit `a10a359` was published to the existing production Netlify site as deploy `6ac1abf4cee16bf03d5710e9`, shared by toli.me and beta.toli.me. Production build and all 24 tests passed. No new component or interaction state was introduced. The apex index, JavaScript and CSS returned HTTPS 200 and exactly matched the local build with normal TLS verification and the known Netlify address. The live homepage's image and button both use the corrected URL; clicking the button opened the Meet Toli page at love.toli.me.

`release.json` records the checks and hashes. Before/after screenshots were captured on the beta alias at 1024 × 900, light theme, top scroll; appearance is unchanged. The beta alias avoids the previous cutover's stale local apex DNS cache. Historical inventories and prior release receipts retain their original links as evidence.
