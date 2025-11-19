# Phase 1 — Core Platform Adaptation

## Current Status (2025-10-24)

- ✅ Updated default site metadata (`config/settings.yml`) to reflect the Sauti brand and mission.
- ✅ Refreshed key English locale strings with Sauti-centric messaging (`app/javascript/mastodon/locales/en.json`).
- ✅ Reimagined the `/about` landing page with Sauti-focused hero, features, and CTAs (`app/javascript/mastodon/features/about/index.jsx`).
- ✅ Embedded the interactive Kenya counties map to route visitors into civic timelines (`app/javascript/mastodon/features/about/components/kenya_counties_map.jsx`).
- ✅ Root routing now serves the Sauti landing page to unauthenticated visitors while signed-in users continue to hit their home timeline (`config/routes.rb`).
- ✅ Passing selected counties into the Explore feed with visible context banners (`app/javascript/mastodon/features/explore/index.tsx`, `app/javascript/mastodon/features/explore/statuses.jsx`).
- ⬜ Implement themed UI assets (logos, colors, landing-page content).
- ⬜ Model county/constituency/ward segmentation for accounts and timelines.
- ⬜ Define National ID + MFA integration approach for authentication hardening.
- ✅ Publish public-facing mission/landing content within the app shell.

## Immediate Next Steps

1. Inventory Mastodon assets (SVGs, favicons, hero images) to replace with Sauti visuals.
2. Draft data model updates for geographic taxonomy (accounts, lists, filters).
3. Select identity verification provider/API and capture requirements in an ADR.
4. Back the new county filter with scoped API queries so Explore and other timelines retrieve localized content.

## Notes

- Phase 0 checklist items deferred remain pending but should be revisited when CI and governance bandwidth allows.
- Consider creating locale override bundles for Swahili and English once copy is finalized.
