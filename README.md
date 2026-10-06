# Earlier personal index prototype

This checkout contains the React/Vite ledger prototype in `src/App.jsx` and a travel page. `npm run build` produces `dist`. The GitHub Pages workflow in `.github/workflows/deploy.yml` builds and publishes on pushes to `main`.

As inspected October 6, 2026, the public `toli.me` homepage is the selected Personal Index served by Netlify site `toli-land-beta` (`bc4a1b57-c973-49eb-b3f0-e7cb69a11925`). Its maintained source is `/Users/toli/Documents/GitHub/toli-land/land`, whose README records the current architecture and explicit production publishing command. GitHub Pages still has `toli.me` configured as its custom domain; that setting alone does not identify the currently served source.

The October 6 source correction changes this prototype's Frontend Infra Book link to `https://feinfra.toli.me/`, preserving the root path while `feinfra.com` is set to expire. Its free Vite build passed. It is committed on a task branch and is not a deployment or a promotion of this prototype. The selected production Personal Index has no old Feinfra link; its live JS/CSS matched the separately verified Netlify build. Historical generated `_site` output and resume binaries remain untouched.

Verification and source/publication evidence: `/Users/toli/Documents/domain-migration/2026-10-06/toli-personal-link-migration-receipt.json` and `toli-personal-netlify-production-source.json` in the same directory.
