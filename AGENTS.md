# Repository Guidelines

## Project Structure & Module Organization
`app/` holds the Rails domain code and background workers; `app/javascript/` hosts the React/TypeScript UI built with Vite. Real-time services live in `streaming/`, shared Ruby helpers in `lib/`, specs in `spec/`, configuration in `config/`, docs in `docs/`, and static assets in `public/`.

## Build, Test, and Development Commands
After cloning, run `RAILS_ENV=development bin/setup` to install gems, node modules, and prep the database. Start the stack with `bin/dev`, which wraps Puma, Sidekiq, streaming, and Vite per `Procfile.dev`. Use `yarn build:development` or `yarn build:production` for asset bundles, and apply schema updates with `bundle exec rails db:migrate`. Container workflows mirror this via `docker compose -f .devcontainer/compose.yaml up -d` followed by `docker compose ... exec app bin/dev`.

## Coding Style & Naming Conventions
Two-space indentation and LF endings are enforced by `.editorconfig`. Ruby must pass `bundle exec rubocop`; follow Rails conventions (PascalCase classes, snake_case files). Front-end code must satisfy ESLint, Stylelint, and Prettier via `yarn lint` and `yarn format:check`; components use PascalCase filenames, and stores export camelCase APIs.

## Testing Guidelines
Run `bundle exec rspec` or target specific paths; system flows stay in `spec/system`, and fabricators live in `spec/fabricators`. Front-end tests use Vitest and Testing Library: `yarn test:js` runs the suite, while `yarn test` includes linting and type-checking. Prepare the test database with `RAILS_ENV=test bin/rails db:prepare`, and request coverage with `yarn test:js -- --coverage` when validating UI-heavy changes.

## Commit & Pull Request Guidelines
Keep commit subjects imperative and reference PR numbers, e.g., `Fix bookmarks export when one status is soft-deleted (#36576)`. PRs should summarize intent, link issues, and attach UI screenshots when visuals change. Run `bundle exec rspec` and `yarn test` before requesting review, and call out skipped scenarios explicitly.

## Security & Configuration Tips
Store secrets in environment variables (`.env.*`, platform configs); never commit credentials. Consult `SECURITY.md` before altering auth, cryptography, or federation code. Document risky configuration changes in `docs/` or `priv-config/` so operators can update safely.
