# YouthVoices Fork Roadmap

## Overview
- **Goal**: Transform Mastodon into the YouthVoices civic polling and discussion platform with synchronous video/audio/text rooms as the MVP.
- **Guiding Principle**: Preserve Mastodon’s social, moderation, and federation strengths while layering Decidim-inspired participatory mechanics for polling in later iterations.
- **Audience**: Core YouthVoices engineering, product, security, and operations teams.

## Foundational Assumptions
- Polling is advisory yet sensitive; data integrity, authentication, and auditability remain high-priority.
- MVP focuses on live civic discourse; polling back-end will mature in parallel, guided by Decidim workflows.
- All roadmap steps inherit existing Mastodon licensing (AGPLv3) and community obligations.

## Phase 0 — Fork Preparation & Governance
- **Tasks**
  - Establish YouthVoices fork repository, branching strategy, and release cadence.
  - Define product charter and moderation policies aligned with mission updates.
  - Audit Mastodon dependencies (Rails, React, Sidekiq, Vite) for compatibility with planned features.
  - Set up CI/CD pipelines, linting, and security scanning tailored to fork (e.g., Snyk, Brakeman, OWASP ZAP).
- **Deliverables**
  - CONTRIBUTING.md addendum describing fork-specific processes (pending).
  - Remote configuration + sync playbook documented in `docs/phase0_status.md`.
  - Architecture decision records (ADRs) for major divergences from upstream (pending).
- **Key Questions**
  - Who owns upstream sync responsibility and how frequently do we pull Mastodon changes?
  - What is the minimal moderation staffing model during MVP pilots?

## Phase 1 — Core Platform Adaptation
- **Tasks**
  - Rebrand UI/UX elements, navigation, and onboarding flows for YouthVoices language.
  - Configure county/constituency/ward taxonomies by extending account metadata and timelines.
  - Harden authentication: confirm National ID integration approach, MFA provider, and rate-limiting.
  - Implement civic landing pages and mission-driven content surfaces.
- **Deliverables**
  - Updated front-end layouts, theming, and copy (tracked in `docs/phase1_status.md`).
  - User segmentation rules and data models for geographic groupings.
- **Key Questions**
  - Which identity provider (IDEMIA, government API, custom KYC) will supply verified youth credentials?
  - How do we handle users outside the 18–40 demographic (observers vs. restricted access)?

## Phase 2 — Real-Time Communication MVP
- **Tasks**
  - Integrate WebRTC services for video and audio rooms (evaluate SFU providers: Jitsi, Janus, LiveKit).
  - Extend Mastodon streaming service to coordinate room presence, invitations, and moderation controls.
  - Build unified room UI blending text chat (existing timelines) with live media panels.
  - Add recording, transcription, and accessibility hooks (captions, language settings).
- **Deliverables**
  - Prototype county-level civic room with video/audio/text parity.
  - Moderator dashboard for participant management, muting, and shared resources.
- **Key Questions**
  - Do we self-host SFU infrastructure or partner with a managed provider for launch?
  - What data retention policy applies to recorded sessions and transcripts?
  - How do we extend Mastodon’s federation model for private/live rooms, if at all?

## Phase 3 — Polling & Deliberation (Decidim Principles)
- **Tasks**
  - Map Decidim participatory flows (assemblies, proposals, surveys) onto YouthVoices domain objects.
  - Design secure poll creation, eligibility rules, and tamper-evident result storage (e.g., append-only logs, cryptographic receipts).
  - Implement participatory budgeting / proposal voting as pilot modules.
  - Expose transparent dashboards with anonymized aggregate metrics and audit exports.
- **Deliverables**
  - MVP polling module with administrative controls.
  - Documentation comparing Decidim feature parity vs. custom implementation scope.
- **Key Questions**
  - Which Decidim governance mechanics are essential for MVP (proposal phases, endorsements, amendments)?
  - What legal/privacy obligations govern storing civic poll data in Kenya (Data Protection Act compliance)?
  - How should vote verifiability balance anonymity vs. accountability in non-official polls?

## Phase 4 — Security, Compliance, and Scaling
- **Tasks**
  - Conduct penetration testing, threat modeling (STRIDE/LINDDUN), and privacy impact assessments.
  - Implement incident response playbooks, audit logging, and observability (Prometheus, Grafana, ELK).
  - Optimize infrastructure for expected load (autoscaling, CDN, bandwidth planning for media).
- **Deliverables**
  - Security audit reports with remediation plans.
  - Scaling benchmarks for concurrent rooms and poll participation.
- **Key Questions**
  - What uptime/SLA targets are acceptable for civic polling events?
  - Which third-party auditors or civic tech partners can validate the platform before public pilots?

## Phase 5 — Pilot Rollout & Feedback Loop
- **Tasks**
  - Run closed pilots with selected counties/organizations; gather UX, performance, and policy feedback.
  - Iterate on accessibility, localization (English/Swahili), and mobile performance improvements.
  - Prepare public documentation, training modules, and community governance guidelines.
- **Deliverables**
  - Pilot report summarizing outcomes, usage analytics, and enhancement backlog.
  - Public YouthVoices civic participation portal.
- **Key Questions**
  - What metrics define pilot success (engagement, retention, satisfaction)?
  - How is feedback prioritized vs. roadmap commitments, especially for polling features?

## Cross-Cutting Workstreams
- **Community & Moderation**: Recruitment, training, escalation paths, and safeguarding policies.
- **Data Governance**: Classification, retention schedules, consent tracking, and anonymization strategies.
- **Interoperability**: Long-term plan for ActivityPub extensions or APIs for civic partners.
- **Funding & Sustainability**: Identify grants, partnerships, and cost models aligned with mission.

## Outstanding Questions & Next Steps
- Confirm organizational ownership for each phase (product lead, engineering lead, security).
- Validate budget and timeline estimates, especially for media infrastructure.
- Schedule discovery workshops to answer unresolved questions noted above.
- Draft Decidim principle mapping document to guide Phase 3 design.
