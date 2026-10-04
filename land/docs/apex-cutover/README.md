# toli.me production cutover — October 3, 2026

The user authorized “cutover to toli.me.” The existing tested Personal Index deployment now serves the production apex. No app code, package, or deployment content changed. The travel-map drawing remains a concept and is not part of this deployment.

## Final configuration

- Netlify site: `toli-land-beta` (`bc4a1b57-c973-49eb-b3f0-e7cb69a11925`).
- Primary domain: https://toli.me; aliases: `www.toli.me`, `beta.toli.me`.
- Deployment: `6ac1a1735a2b126bc0f0bcd4`; application commit: `735d5c1`.
- Netlify DNS zone: `6a52a77284b0c40590094b69`.
- Apex: `A 75.2.60.5`, TTL 300. This is [Netlify’s documented apex routing address](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).
- `www` and beta use managed `NETLIFY` records pointing to `toli-land-beta.netlify.app`.
- Existing trusted certificate covers `*.toli.me` and `toli.me`, expires December 17, 2026; HTTPS enforcement remains enabled.

**Beta shares the production deployment.** Future `netlify deploy --prod` commands on this site also publish to `toli.me`; beta is not isolated staging.

## Verification

`release.json` contains the exact ten-file hashes, TLS metadata, DNS checks, and cache limitation. All four authoritative nameservers and public resolvers 1.1.1.1 / 8.8.8.8 returned the new apex. HTTPS requests to the apex with `curl --resolve toli.me:443:75.2.60.5` and normal certificate verification returned 200. Index, JS, CSS, and seven WebP files matched the tested build exactly. `www` returned 301 to `https://toli.me/?cutover-verification=1`, preserving the query; beta remained HTTPS 200.

All 36 unrelated original records were compared as complete JSON objects and remained identical, including mail and all other subdomains. Record count is 38 before and after. The repository snapshots include only relevant routing records; the full before/after DNS backups remain locally in `/Users/toli/.codex/backups/toli-me-cutover-2026-10-03/`.

The local Mac resolver still returned the old Carrd/Cloudflare address and cached `www` NXDOMAIN at verification time. Old positive/negative DNS TTLs were 3600 seconds, so a cached old page may remain for about an hour. Public DNS and direct HTTPS are verified; global propagation and local browser refresh are not claimed.

Screenshot evidence uses 1024 × 900, light theme, top scroll: `before-desktop.jpg` captures the old apex; `after-deployment-via-beta-desktop.jpg` captures the same production deployment via beta while the local apex resolver cache is stale. Earlier full interaction/mobile QA remains in `../normal-site-qa/`.

## Migration detail

Setting the site's primary domain and aliases created managed apex and `www` DNS records. Two existing identical Carrd A objects pointed to `172.66.0.70` (IDs recorded in `dns-before.json`). Removing these old objects left the provider's managed apex object present but its authoritative A response empty. Replacing that stale managed apex object with the explicit official Netlify A address restored correct authoritative answers; final DNS and HTTPS were checked after this repair. No unrelated records were edited.

## Rollback, only if requested or a confirmed production fault warrants it

1. Use `site-before.json` to restore primary domain `beta.toli.me` and empty aliases on the existing site. Keep its deployment and HTTPS enforcement unchanged.
2. Remove only the new apex A and `www` routing records identified in `dns-after.json`. Read current DNS first; do not delete newer unrelated records.
3. Restore apex `A 172.66.0.70`, TTL 3600, from `dns-before.json`. The original provider stored two identical objects; one A answer is sufficient for routing. `www` originally had no record.
4. Verify all authoritative answers, apex HTTPS/content, beta, and preservation of unrelated DNS against the backup. Allow for DNS caching. Do not remove the Netlify site or touch mail/subdomains.

API note: Netlify CLI mutations accept the request object under `body`, e.g. `updateSite` with `site_id` and `body`, or `createDnsRecord` with `zone_id` and `body`. Swagger parameter names such as `site` or `dns_record` did not apply the requested changes through the installed CLI. Always read back and verify actual DNS responses after mutation.
