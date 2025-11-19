# Database Setup for Sauti

Mastodon (and the Sauti fork) expects a PostgreSQL server with a role that matches the credentials in `config/database.yml`. By default, local development connects over the Unix socket using the current OS username.

## Option 1 — Match the Unix User (recommended for quick setup)

If you want Rails to connect as your current user (`$(whoami)`), create a matching PostgreSQL superuser:

```bash
sudo -u postgres createuser -s $(whoami)
```

Then run the standard setup:

```bash
RAILS_ENV=development bin/setup
```

Rails will create the `mastodon_development` and `mastodon_test` databases automatically with that role.

## Option 2 — Custom Role and Database Names

If you need to isolate Sauti from other apps, define explicit credentials in your environment files (`.env.development`, `.env.test`, etc.):

```env
DB_USER=sauti_user
DB_PASS=strongpassword
DB_NAME=sauti_development
```

Create the role and databases manually:

```bash
sudo -u postgres createuser sauti_user --createdb --login --pwprompt
sudo -u postgres createdb sauti_development -O sauti_user
sudo -u postgres createdb sauti_test -O sauti_user
```

Update `.env.test` accordingly (e.g., `DB_NAME=sauti` so the test DB becomes `sauti_test`).

## Inspecting the Schema

All tables are created via Rails migrations. To review what will be generated:

- `db/schema.rb` — current canonical schema
- `db/migrate/` — historical migrations if you need detailed context

No manual table creation is necessary; ensure the configured role owns the database so migrations can run.

## Running Setup & Migrations

After configuring the role:

```bash
RAILS_ENV=development bin/setup   # installs dependencies & prepares the database
bin/rails db:migrate              # apply schema updates (optional if bin/setup already ran)
```

For testing environments:

```bash
RAILS_ENV=test bin/rails db:prepare
```

Always run migrations as the same database user you created above to avoid permission issues.

## Helper Scripts & Environment Files

- `bin/sb` — a thin wrapper that lets you call `sb setup` or `sb dev` from anywhere on your machine. It resolves the repository path automatically (override with `SAUTI_ROOT=/path/to/sauti`). Add `bin/` to your `PATH` or symlink `sb` somewhere convenient.
- `config/sauti_env.example` — sample shell exports for `DB_*` variables. Copy it to `~/.sauti_env`, tweak the values, and `source ~/.sauti_env` (or add it to your shell profile) so `bin/setup`, Sidekiq, and other processes pick up the credentials.

Using these helpers keeps local onboarding consistent, especially on multi-project hosts where the repository might not live under `$HOME/repo/code/sauti`.
