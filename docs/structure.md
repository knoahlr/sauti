# Mastodon Project Structure

## Technologies Used
### Core Platform
- Ruby on Rails 8 powers the REST API, web views, and server-side federation logic within `app/` and `lib/`.
- PostgreSQL 14+ is the primary datastore, configured via `config/database.yml` and migrations under `db/migrate/`.
- Sidekiq executes asynchronous jobs from `app/workers/`, backed by Redis 7+ (`config/sidekiq.yml`).
- Chewy integrates Elasticsearch/OpenSearch for full-text search indices declared in `app/chewy/`.

### Front-End Stack
- React 18 with Redux Toolkit drives the single-page UI housed in `app/javascript/mastodon/`.
- TypeScript configuration (`tsconfig.json`) and Vitest (`vitest.config.mts`) provide type safety and unit testing.
- Vite (`vite.config.mts`) handles asset bundling, while Storybook (`.storybook/`) documents interactive components.
- Styling relies on SCSS modules linted by Stylelint (`stylelint.config.js`) and formatted through Prettier.

### Streaming & Tooling
- A dedicated Node.js workspace in `streaming/` exposes the WebSocket streaming API and ActivityPub push endpoints.
- Yarn 4 workspaces orchestrate JavaScript dependencies, with scripts defined in `package.json`.
- Foreman/Overmind launch the local stack through `Procfile.dev` and the `bin/dev` wrapper.
- Docker and Dev Container configurations (`Dockerfile`, `.devcontainer/`, `docker-compose.yml`) cover containerized development.

## Features Offered
- **Federated timelines:** ActivityPub federation (`app/lib/activitypub/`) synchronizes posts, boosts, and follows across servers.
- **Real-time updates:** The streaming service publishes live timelines and notifications over WebSockets to the React client.
- **Rich media pipeline:** Background jobs in `app/workers/` process uploads with `ruby-vips`, generate previews, and manage remote storage (S3/OpenStack/Azure).
- **Safety and moderation:** Admin controllers in `app/controllers/admin/`, policies in `app/policies/`, and Sidekiq jobs support reporting, account moderation, and domain-level blocks.
- **OAuth2 REST API:** Doorkeeper-based OAuth (`config/initializers/doorkeeper.rb`) secures the public API, supporting third-party apps and mobile clients.
- **Internationalization:** Extensive locale packs in `config/locales/` and i18n tooling (`config/i18n-tasks.yml`, `app/javascript/mastodon/locales/`) deliver a multilingual experience.
- **Accessibility & customization:** Theme settings in `config/themes.yml`, content warnings, and filter lists are surfaced via front-end state modules.

## Design Architecture
### Layered Rails Monolith
- HTTP requests enter via `config/routes.rb`, flow through controllers (`app/controllers/`), policies (`app/policies/`), and service objects (`app/services/`) before serializing responses with ActiveModel Serializers (`app/serializers/`).
- Business logic leans on POROs in `app/lib/` and domain models in `app/models/`, keeping controllers thin while encapsulating federation, delivery, and verification workflows.
- Sidekiq workers offload expensive tasks such as fan-out delivery, media processing, and search indexing; Redis also caches timelines and configuration.

### Front-End Composition
- The SPA bootstraps through `app/javascript/entrypoints/application.ts`, which loads the main React tree from `app/javascript/mastodon/main.tsx` and shared polyfills/state initialization.
- Global state is organized with Redux Toolkit slices in `app/javascript/mastodon/store/` and feature-specific modules under `app/javascript/mastodon/features/`.
- Vite serves local assets in development and produces hashed bundles for Rails to mount via `app/views/layouts/`.
- Shared UI primitives (icons, buttons, modals) live under `app/javascript/mastodon/components/`, with Storybook ensuring visual parity.

### Real-Time & External Interfaces
- The Node streaming service consumes the same PostgreSQL and Redis instances, pushing events to clients and handling the streaming API endpoints under `/api/v1/streaming`.
- Fediverse delivery relies on ActivityPub jobs (`app/workers/activitypub/`) and WebFinger (`app/services/webfinger_helper.rb`) to discover and interact with remote instances.
- Background CLI tasks (`bin/tootctl`) expose maintenance routines for search, media, and federation queues, integrating with Rails engines.

### Configuration & Testing
- Environment-specific settings reside in `config/environments/` and `config/settings.yml`, with secrets loaded via `.env.*` files or platform variables.
- Comprehensive automated tests use RSpec in `spec/`, categorized by layer (controllers, models, system). Front-end behavior is verified with Vitest and Testing Library, colocated in `__tests__/` directories alongside features within `app/javascript/mastodon/`.
- Continuous integration leverages GitHub Actions workflows (see `.github/workflows/`) and Chromatic for UI regressions, ensuring parity across environments.
