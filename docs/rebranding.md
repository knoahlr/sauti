# Sauti Rebranding Scope

## Current Mastodon Footprint

- `rg` scan finds ≈7.4k string matches across 744 files that still reference “Mastodon”.
- Biggest clusters: `config/**` (310 locale/config files), `app/**` Ruby & React sources (277 files), `spec/**` expectations (64 files), `lib/mastodon/**` helpers (43 files).
- Core namespace remains `Mastodon::` in `config/application.rb` and cascades through middleware, services, jobs, and background CLI tooling.
- Frontend still mounts `Mastodon` containers, IDs, and asset alt text (`app/javascript/mastodon/main.tsx`, `app/views/shared/_web_app.html.haml`).
- English strings plus ~200 translation files reference Mastodon branding (`config/locales/en.yml`, `app/javascript/mastodon/locales/*.json`).
- Build metadata, Docker manifests, and package descriptors advertise the upstream name (`package.json`, `app.json`, `Dockerfile`, `streaming/package.json`).

## Workstreams & Effort

- **Namespace & APIs (XL):** Decide whether to rename `Mastodon::` to `Sauti::` or retain it for compatibility. Renaming ripples through Zeitwerk autoloading, Sidekiq queues, custom errors, tootctl, and ActivityPub services.
- **Frontend & UX (L):** Update React imports, DOM mount IDs, favicon/logo references, and HAML layouts/emails while keeping asset pipeline paths consistent.
- **Copy & Locales (XL):** Rewrite English master copy, then either refresh or temporarily flag all translated strings; automation may be needed to manage 300+ locale files.
- **Docs & Templates (M):** Refresh SECURITY, federation, deployment docs, and policy templates so they speak about Sauti while crediting the upstream project.
- **Build & Tooling (M):** Adjust package scopes, repository URLs, Docker labels, and user-agent strings; confirm which `MASTODON_*` env vars must remain for ecosystem compatibility.
- **Tests & Fixtures (M):** Update fixture text and expectations in RSpec, Vitest, and serialized snapshots after copy changes to avoid CI regressions.

## Risks & Dependencies

- ActivityPub identifiers, WebFinger responses, and HTTP signature headers may require the literal `mastodon` token for interoperability; each change demands protocol validation.
- Namespace renaming is high-risk without migration scripts and thorough regression testing (API clients, Sidekiq workers, admin CLI).
- Locale overhaul will create substantial translation debt if we diverge from upstream strings.
- Prior `sudo` installs left permissions-sensitive directories (e.g., `.yarn`, `node_modules`); avoid future root-owned artifacts when regenerating assets.

## Recommended Sequence

1. Confirm policy on what may keep the Mastodon label (env vars, protocol identifiers) versus user-facing strings.
2. Refresh English-language UI copy, emails, and docs; stub TODOs for non-English locales.
3. Align frontend components and assets with new branding (logos, DOM IDs, package metadata).
4. Tackle namespace refactor (if approved) in a dedicated effort with scripted replacements and full test passes.
5. After code changes, update tests/fixtures, rerun `bundle exec rspec` and `yarn test`, and publish revised operator documentation.

## Open Questions

- Should we preserve `Mastodon::Version` and the AGPL notice verbatim for licensing clarity?
- Are external clients relying on the current `Mastodon/` user agent string?
- What is the translation strategy for non-English locales post-rebrand?
