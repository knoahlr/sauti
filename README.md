# Sauti — YouthVoices Civic Platform

Sauti is the dedicated fork of Mastodon that powers the YouthVoices civic platform advancing democratic principles. It blends social timelines with structured civic rooms so Kenyan youth (18–40) can coordinate discussions, run advisory polls, and surface county-to-national issues in real time.

## Vision & Roadmap Alignment
- Deliver a mobile-friendly civic commons with text, audio, and video rooms (Phase 2) built on Mastodon’s reliable Rails + React foundation.
- Layer Decidim-inspired polling and deliberation workflows (Phase 3) while preserving strong moderation, safety, and transparency guarantees.
- Maintain upstream compatibility for security patches while tailoring features, branding, and governance for YouthVoices.

## Project Structure
- `app/` — Rails domain logic (models, controllers, services, workers) plus ActivityPub federation flows.
- `app/javascript/` — React + TypeScript front end bundled with Vite; Redux state lives under `mastodon/`.
- `streaming/` — Node.js WebSocket service delivering live timelines and future civic room events.
- `spec/` — RSpec test suites grouped by layer (models, controllers, system, etc.).
- `docs/` — YouthVoices-specific guidance (`structure.md`, `fork_roadmap.md`, `phase0_status.md`).
- `config/` — Environment configs, Sidekiq, ActivityPub, and theme settings.

For a deeper architecture overview, read `docs/structure.md`.

## Quick Start (Local Development)
1. Clone the fork and install dependencies:
   ```bash
   git clone git@github.com:knoahlr/sauti.git
   cd sauti
   bundle install
   yarn install --frozen-lockfile
   ```
2. Provision databases, Redis, and assets:
   ```bash
   RAILS_ENV=development bin/setup
   ```
3. Launch the full stack (Puma, Sidekiq, streaming, Vite):
   ```bash
   bin/dev
   ```
4. Visit `http://localhost:3000` and sign in with the seeded admin account from `bin/setup` (`admin@mastodon.local` / `mastodonadmin`).

**Docker option:** `docker compose -f .devcontainer/compose.yaml up -d` then `docker compose -f .devcontainer/compose.yaml exec app bin/dev`.

## Development Commands
```bash
bin/rails db:migrate          # Apply database changes
bundle exec rspec             # Rails/Ruby test suites
yarn test                     # Lint + typecheck + Vitest (UI)
yarn lint                     # ESLint + Stylelint
yarn format:check             # Prettier verification
yarn build:development        # Build front-end assets (dev profile)
```

## Core Features
- **Federated social layer:** ActivityPub timelines, boosts, media attachments, and notifications.
- **Moderation toolkit:** Reporting, trust & safety workflows, domain blocks, and community-led policies.
- **Geographic organization:** Foundations for county, constituency, and ward segmentation across feeds and rooms.
- **Real-time updates:** WebSocket streaming for timelines and upcoming civic room presence/events.
- **Security baseline:** MFA-ready authentication, rate limiting, Sidekiq job isolation, and audit logging hooks.

Planned enhancements (see `docs/fork_roadmap.md`): WebRTC civic rooms, advisory polling engine, Decidim-style participatory flows, and richer analytics dashboards.

## Documentation Index
- `docs/fork_roadmap.md` — Phase-by-phase plan for the YouthVoices fork.
- `docs/phase0_status.md` & `docs/phase0_checklist.md` — Current setup status and pending tasks.
- `docs/structure.md` — Detailed description of the codebase layout and technologies.
- `docs/DEVELOPMENT.md` — Upstream Mastodon development guide (still relevant for environment setup).

## Contributing & Governance
1. Create feature branches from `main` (fork canonical branch).
2. Run `bundle exec rspec` and `yarn test` before opening a pull request.
3. Document architectural decisions through ADRs (see Phase 0 checklist).
4. Because Sauti remains AGPLv3, any deployed instance must provide source access for all changes (plan distribution accordingly).

Moderation, security, and community policies are being defined in `docs/phase0_checklist.md` — contributions should respect the YouthVoices mission and community guidelines.

## Support & Contact
- Operational issues: open a ticket in this repository or contact the YouthVoices platform team.
- Security disclosures: follow the process outlined in the future `SECURITY.md` addendum (Phase 1 deliverable).

## License
Sauti retains Mastodon’s **GNU Affero General Public License v3**. See [`LICENSE`](LICENSE) for details.

---
**YouthVoices — Empowering civic engagement through technology 🇰🇪**
