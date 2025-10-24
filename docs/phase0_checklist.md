# Phase 0 Checklist — Fork Preparation & Governance

## Repository & Sync
- [x] Set `origin` → `git@github.com:knoahlr/sauti.git`.
- [x] Preserve upstream remote as `upstream` → `git@github.com:mastodon/mastodon.git`.
- [ ] Define upstream sync cadence (owner, frequency, alerting).
- [ ] Document conflict-resolution workflow and escalation path.

## CI/CD & Quality Gates
- [ ] Enable GitHub Actions for the fork (confirm required workflows).
- [ ] Decide on additional scanners (Brakeman, bundler-audit, Snyk) and secrets detection.
- [ ] Configure CodeQL, lint, and test workflows to run on PRs targeting mainline branches.
- [ ] Establish artifact storage for build outputs (containers, static assets) if needed.

## Governance & Documentation
- [ ] Draft YouthVoices addendum to `CONTRIBUTING.md` covering branching, PR review, and security disclosure.
- [ ] Create initial Architecture Decision Records (ADR-000) outlining fork rationale.
- [ ] Publish moderation policy summary and staffing plan for MVP pilots.
- [ ] Define AGPL source distribution process for production deployments.

## Security & Access
- [ ] Inventory secrets (ENV, OAuth, SFU credentials) and assign vault solution.
- [ ] Set up least-privilege access to repository, CI, and deployment environments.
- [ ] Prepare incident response checklist (contacts, triage steps, communication).

## Next Actions
1. Assign owners for each checklist category.
2. Schedule upstream sync rehearsal to validate workflow.
3. Spin up CI in dry-run mode to baseline runtime and flake rate.
