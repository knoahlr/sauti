# Phase 0 — YouthVoices Fork Setup

## Current Status (2025-10-24)
- ✅ Fork remote set as canonical `origin` → `git@github.com:knoahlr/sauti.git`.
- ✅ Upstream Mastodon remote preserved as `upstream` for future security/feature updates.
- ⏸️ Configure CI/CD pipelines (linting, security scanning, deploy automation). Pending Phase 1 kickoff.
- ⏸️ Draft fork-specific CONTRIBUTING/ADR updates. Pending Phase 1 (see `docs/phase0_checklist.md#governance--documentation`).
- ⏸️ Define moderation staffing model and upstream sync cadence. Pending Phase 1 (see `docs/phase0_checklist.md#repository--sync`).

## Manual Sync Workflow
1. `git fetch upstream` — pull latest Mastodon changes into local refs.
2. Create a staging branch (e.g., `git checkout -b chore/upstream-sync upstream/main`) and resolve conflicts.
3. Run automated checks (RSpec, Vitest, linting) locally or in CI.
4. Merge into YouthVoices mainline and push to fork: `git push origin <branch>:main`.
5. Tag releases from the fork for deployment tracking.

## Privacy & Security Considerations
- Review upstream commits before merging to ensure they align with YouthVoices threats and privacy requirements.
- Keep fork private until public launch, but plan AGPL-compliant source distribution for end users.
- Document any feature removals or hardening decisions in ADRs for auditability.

## Open Questions
- Who owns the upstream sync duty and how often should we schedule pulls (weekly, monthly, security-driven)?
- Which CI tools will run against the fork (GitHub Actions vs. self-hosted runners for privacy)?
- What key management process will secure deploy credentials for the private fork?
