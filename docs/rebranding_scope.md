# Branding Update: Mastodon → Sauti - Effort Scope

## Executive Summary

Rebranding all social media pages from Mastodon to Sauti is a **Large to Extra Large (L-XL) effort** requiring **13-18.5 developer days**. This assessment covers ~1,300+ "Mastodon" references across 300+ files, including visual assets, locale strings, frontend components, backend templates, and configuration.

**Date:** 2025-10-25
**Status:** Planning / Phase 0-1
**Related Docs:** `rebranding.md`, `phase1_status.md`, `social_media_pages.md`

---

## Reference Count Summary

| Area                   | Files     | References  | Source                                    |
| ---------------------- | --------- | ----------- | ----------------------------------------- |
| Frontend Features      | 229       | 1,149       | `app/javascript/mastodon/features/`       |
| Frontend Components    | 70        | 343         | `app/javascript/mastodon/components/`     |
| English Locale (React) | 1         | 29          | `app/javascript/mastodon/locales/en.json` |
| Rails Locale           | 1         | 30+         | `config/locales/en.yml`                   |
| Backend Views          | 37        | ~100        | `app/views/**/*.haml`, `*.erb`            |
| Visual Assets          | 16        | N/A         | `app/javascript/images/`                  |
| **TOTAL**              | **~300+** | **~1,300+** |                                           |

---

## Effort Breakdown by Category

### 1. Visual Assets & Branding

**Effort:** Small-Medium (S-M) / **1-2 days**
**Impact:** HIGH - First impression, brand identity
**Priority:** P0 (Critical)

#### Files to Replace

**Logos & Icons:**

```
app/javascript/images/
├── logo.svg                      # Main Mastodon logo (purple elephant with 'M')
├── logo-symbol-icon.svg          # Icon-only version (elephant head)
├── logo-symbol-wordmark.svg      # Logo with "Mastodon" text
└── app-icon.svg                  # Progressive Web App icon
```

**Mascot Illustrations:**

```
app/javascript/images/
├── elephant_ui_disappointed.svg  # Empty state illustration
├── elephant_ui_conversation.svg  # Conversation empty state
├── elephant_ui_working.svg       # Loading/working state
├── elephant_ui_plane.svg         # Federation/travel illustration
└── elephant_ui_greeting.svg      # Welcome/onboarding illustration
```

**Favicon & App Icons:**

- Referenced in `app/views/layouts/application.html.haml:15-18`
- Multiple sizes: 16x16, 32x32, 48x48, 96x96, 144x144, 192x192, 256x256, 512x512
- Apple touch icons: 57x57, 60x60, 72x72, 76x76, 114x114, 120x120, 144x144, 152x152, 180x180

**Mask Icon:**

- Line 21: `frontend_asset_path('images/logo-symbol-icon.svg')` - Safari pinned tab icon

#### Tasks

1. **Design Phase:**
   - Create Sauti logo suite (full logo, icon-only, wordmark variants)
   - Design civic-themed mascot illustrations (5 scenarios)
   - Ensure accessibility (contrast ratios, recognizability)
   - Export in SVG, PNG (multiple resolutions), ICO formats

2. **Implementation:**
   - Replace all 16 image files
   - Update references in `app/views/layouts/application.html.haml`
   - Generate favicon.ico for browser compatibility
   - Test rendering: Chrome, Firefox, Safari, Edge, mobile browsers

3. **Verification:**
   - PWA icon displays correctly on home screen
   - Favicon appears in browser tabs
   - Safari pinned tab icon renders properly
   - Social media link previews show correct logo

---

### 2. Locale Strings (Internationalization)

**Effort:** Extra Large (XL) / **5-7 days**
**Impact:** HIGH - All user-facing text
**Priority:** P0 (Critical)

#### Frontend Locale (React/JavaScript)

**File:** `app/javascript/mastodon/locales/en.json`
**Size:** 1,045 lines
**Direct "Mastodon" references:** 29 confirmed

**Already Updated (✅):**

- Lines 5-34: About page hero, features, disclaimers (Sauti-specific)
- Line 14: `about.powered_by` - "Civic social platform powered by {mastodon}"
- Lines 359-361: Explore county banner messages

**Still Need Updates:**

| Line(s)   | Key                                                         | Current Text                                        | Action                       |
| --------- | ----------------------------------------------------------- | --------------------------------------------------- | ---------------------------- |
| 180-184   | `closed_registrations_modal.*`                              | "Mastodon is decentralized..."                      | Replace with Sauti branding  |
| 221       | `compose_form.encryption_warning`                           | "Posts on Mastodon are not end-to-end encrypted"    | Update to "Sauti"            |
| 314-316   | `domain_pill.activitypub_*`                                 | "language Mastodon speaks"                          | Keep for federation context  |
| 471-476   | `home.pending_critical_update.*`                            | "update your Mastodon server"                       | Replace with "Sauti server"  |
| 735       | `notifications_permission_banner.how_to_control`            | "when Mastodon isn't open"                          | Replace with "Sauti"         |
| 770, 776  | `privacy.public.long`, `privacy.unlisted.long`              | "Anyone on and off Mastodon"                        | Update to "Sauti" or generic |
| 840, 862  | `report.thanks.take_action`, `search.quick_action.open_url` | "Open URL in Mastodon"                              | Replace with "Sauti"         |
| 884       | `server_banner.is_one_of_many`                              | "part of the Sauti civic network built on Mastodon" | Already updated ✅           |
| 888       | `sign_in_banner.mastodon_is`                                | "Mastodon is the best way..."                       | Replace with "Sauti is..."   |
| 940       | `status.quote_error.pending_approval_popout.body`           | "On Mastodon, you can control..."                   | Update to "Sauti"            |
| 999       | `ui.beforeunload`                                           | "leave Mastodon"                                    | Replace with "Sauti"         |
| 1033-1037 | `visibility_modal.helper.*`                                 | "authored on Mastodon"                              | Update to "Sauti"            |

**Total:** ~25-30 string updates needed

#### Backend Locale (Rails)

**File:** `config/locales/en.yml`
**Direct "Mastodon" references:** 30+

**Sample Updates Needed:**

```yaml
# Line references from grep output:
admin:
  settings:
    branding:
      preamble: "Customize Mastodon's web interface."
      # → "Customize Sauti's web interface."

  dashboard:
    software_updates:
      description: 'Keep your Mastodon installation up to date...'
      # → "Keep your Sauti installation up to date..."

admin_mailer:
  new_critical_software_updates:
    subject: 'Critical Mastodon updates are available...'
    # → "Critical Sauti updates are available..."

auth:
  description:
    prefix_invited_by_user: 'join this server of Mastodon'
    # → "join this server of Sauti"
    suffix: 'With an account, you will be able to follow people...'
    # → Keep generic or update to Sauti context

mail_subscriptions:
  confirmation_html: 'receiving %{type} for Mastodon on %{domain}'
  # → "receiving %{type} for Sauti on %{domain}"
```

#### Other Locale Files

**Status:** 200+ translation files (`config/locales/*.yml`, `app/javascript/mastodon/locales/*.json`)

**Strategy:**

- Update English master (`en.yml`, `en.json`) first
- Mark other locales as outdated (requires community translation)
- Consider automated flagging with `i18n-tasks`
- Prioritize Swahili (`sw.json`) for Phase 1

#### Tasks

1. **Find & Replace (Strategic):**
   - Run `rg -i "mastodon" app/javascript/mastodon/locales/en.json` with context
   - Review each match for appropriate replacement
   - Preserve ActivityPub/federation explanations where needed

2. **Manual Updates:**
   - Rewrite registration/signup flows for Sauti voice
   - Update error messages and system notifications
   - Revise privacy/security explanations
   - Adapt federation/decentralization explainers

3. **Backend Strings:**
   - Update Rails locale `config/locales/en.yml`
   - Update email templates
   - Update admin panel strings
   - Update policy/legal strings

4. **Translation Coordination:**
   - Flag non-English locales for update
   - Create Swahili baseline (`sw.json`) for Kenyan users
   - Document translation workflow in `CONTRIBUTING.md`

---

### 3. Frontend Components

**Effort:** Large (L) / **4-5 days**
**Impact:** MEDIUM-HIGH - In-app experience
**Priority:** P1 (High)

#### Scope

**Files with "mastodon" references:** 229 files, 1,149 matches (from features/)
**Additional files:** 70 component files, 343 matches (from components/)

#### Categories

**1. Import Paths (NO CHANGE NEEDED):**

```javascript
from 'mastodon/components/...'
from 'mastodon/actions/...'
from 'mastodon/features/...'
```

**Rationale:** Internal module path convention; changing would require massive refactor

**2. User-Facing Messages (MUST UPDATE):**

18 files with `defaultMessage` containing "Mastodon":

| File                                                                    | Line(s)    | Message ID                                     | Text                                                        |
| ----------------------------------------------------------------------- | ---------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `features/compose/components/privacy_dropdown.jsx`                      | 19, 21, 27 | `privacy.public.long`, `privacy.unlisted.long` | "Anyone on and off Mastodon", "Hidden from Mastodon search" |
| `features/compose/components/warning.tsx`                               | -          | `compose_form.encryption_warning`              | "Posts on Mastodon are not encrypted"                       |
| `features/closed_registrations_modal/index.jsx`                         | -          | `closed_registrations_modal.*`                 | "Signing up on Mastodon"                                    |
| `features/interaction_modal/index.tsx`                                  | -          | `interaction_modal.action`                     | "whatever Mastodon server you use"                          |
| `features/notifications/components/notifications_permission_banner.tsx` | -          | `notifications_permission_banner.*`            | "when Mastodon isn't open"                                  |
| `features/account/components/domain_pill.tsx`                           | -          | `domain_pill.*`                                | "language Mastodon speaks" (federation context)             |
| `features/navigation_panel/components/sign_in_banner.tsx`               | -          | `sign_in_banner.mastodon_is`                   | "Mastodon is the best way..."                               |
| `features/direct_timeline/index.jsx`                                    | -          | Empty state messages                           | Generic references                                          |
| `features/compose/components/search.tsx`                                | -          | Search placeholders                            | May need update                                             |
| `features/annual_report/index.tsx`                                      | -          | `annual_report.*`                              | "#Wrapstodon" branding                                      |
| `features/ui/components/visibility_modal.tsx`                           | -          | `visibility_modal.*`                           | "authored on Mastodon"                                      |
| `features/ui/components/ignore_notifications_modal.jsx`                 | -          | `ignore_notifications_modal.disclaimer`        | "Mastodon cannot inform users..."                           |
| `features/report/thanks.jsx`                                            | -          | `report.thanks.*`                              | "controlling what you see on Mastodon"                      |
| `features/onboarding/profile.tsx`                                       | -          | `onboarding.profile.discoverable_hint`         | "discoverability on Mastodon"                               |
| `features/home_timeline/components/critical_update_banner.tsx`          | -          | `home.pending_critical_update.*`               | "update your Mastodon server"                               |
| + 3 more files                                                          | -          | Various                                        | Contextual references                                       |

**3. Shared Components (70 files):**

Key files from `app/javascript/mastodon/components/`:

- `logo.tsx` - Renders logo, may have hardcoded alt text
- `server_banner.jsx` - Server description/stats
- `error_boundary.jsx` - Error messages
- `scrollable_list.jsx` - Empty state messages
- `column_header.tsx` - Column titles
- `router.tsx` - Page titles/metadata

#### Tasks

1. **Audit Phase:**
   - Run `rg "defaultMessage.*Mastodon" app/javascript/mastodon/features/ -A 2 -B 2`
   - Catalog each match with file path and line number
   - Determine if update is user-facing or internal

2. **Update Phase:**
   - Update 18 confirmed files with user-facing messages
   - Review shared components for hardcoded strings
   - Update error boundary messages
   - Update empty state illustrations/text

3. **Testing Phase:**
   - Load each affected feature page
   - Verify updated strings render correctly
   - Check for broken layouts due to text length changes
   - Test internationalization (i18n) still works

4. **Edge Cases:**
   - Federation explanations: Keep "Mastodon" in protocol context, add "Sauti uses..."
   - Annual reports: Rebrand "#Wrapstodon" to "#YearInSauti" or similar
   - Privacy warnings: Balance clarity with branding

---

### 4. Backend Views & Templates

**Effort:** Medium (M) / **2-3 days**
**Impact:** MEDIUM - Email, HTML shells, admin UI
**Priority:** P1 (High)

#### Scope

**37 files** with logo/icon/brand references:

**Layouts:**

```
app/views/layouts/
├── application.html.haml     # Main app layout, logo refs (line 48-49)
├── auth.html.haml             # Authentication pages
├── admin.html.haml            # Admin panel layout
├── mailer.html.haml           # Email template wrapper
├── modal.html.haml            # Modal dialogs
└── embedded.html.haml         # Embeds for external sites
```

**Shared Partials:**

```
app/views/shared/
├── _og.html.haml              # Open Graph meta tags (og:site_name, etc.)
└── _web_app.html.haml         # React app mount point
```

**Email Templates:**

```
app/views/notification_mailer/
├── mention.html.haml          # Mention notification email
├── mention.text.erb           # Plain text version
├── follow.html.haml           # Follow notification
├── follow_request.html.haml   # Follow request
├── favourite.html.haml        # Like/favorite notification
├── reblog.html.haml           # Boost notification
├── quote.html.haml            # Quote notification
└── _status.html.haml          # Reusable status partial
```

**Admin Views:**

```
app/views/admin/
├── settings/branding/show.html.haml  # Branding customization UI
├── software_updates/index.html.haml  # Update notifications
├── shared/_status.html.haml          # Admin status display
└── account_warnings/...               # Warning messages
```

**Other:**

```
app/views/
├── oauth/authorizations/new.html.haml  # OAuth consent screen
├── filters/**/*.html.haml               # Content filter UI
├── statuses/embed.html.haml             # Embeddable status widget
└── errors/self_destruct.html.haml       # Server shutdown notice
```

#### Specific Updates

**1. Open Graph Meta Tags (`app/views/shared/_og.html.haml`):**

```haml
# Current:
%meta{ property: 'og:site_name', content: 'Mastodon' }

# Update to:
%meta{ property: 'og:site_name', content: 'Sauti' }
```

**2. Main Layout Logo Resources:**

```haml
# app/views/layouts/application.html.haml:47-49
.logo-resources{ 'tabindex' => '-1', 'inert' => true, 'aria-hidden' => 'true' }
  = inline_svg_tag 'logo-symbol-icon.svg'        # Update SVG content
  = inline_svg_tag 'logo-symbol-wordmark.svg'    # Update SVG content
```

**3. Email Templates:**

```haml
# notification_mailer/*.html.haml headers/footers
# Example from mention.html.haml:
<p>You received this email because someone mentioned you on Mastodon.</p>

# Update to:
<p>You received this email because someone mentioned you on Sauti.</p>
```

**4. Admin Panel:**

```haml
# admin/settings/branding/show.html.haml
<p>Customize Mastodon's web interface.</p>

# Update to:
<p>Customize Sauti's web interface.</p>
```

#### Tasks

1. **Meta Tags & SEO:**
   - Update `og:site_name` to "Sauti"
   - Update page `<title>` templates
   - Update Twitter Card metadata
   - Update PWA manifest references

2. **Email Templates:**
   - Update 8 notification email templates (HTML)
   - Update 8 notification email templates (text)
   - Update mailer layout wrapper
   - Test rendering in Gmail, Outlook, Apple Mail, mobile clients

3. **Admin Panel:**
   - Update branding customization UI
   - Update software update notices
   - Update moderation interface strings
   - Test admin workflows

4. **Embeds & OAuth:**
   - Update embeddable status widget branding
   - Update OAuth authorization screen
   - Test third-party app authorization flow

5. **Testing:**
   - Send test emails to various clients
   - Verify Open Graph previews on Twitter, Facebook, Slack
   - Check embed rendering on external sites
   - Test admin panel functionality

---

### 5. Configuration & Metadata

**Effort:** Small (S) / **1 day**
**Impact:** LOW - Mostly internal/developer-facing
**Priority:** P2 (Medium)

#### Files

**1. Package Metadata:**

```json
// package.json:2,39
{
  "name": "@mastodon/mastodon", // → "@sauti/sauti"
  "repository": {
    "type": "git",
    "url": "https://github.com/mastodon/mastodon.git" // → knoahlr/sauti
  }
}
```

**2. Site Configuration:**

```yaml
# config/settings.yml
# ✅ Already updated per phase1_status.md
site_title: 'Sauti'
site_short_description: 'Kenyan youth civic engagement platform'
```

**3. Environment Variables:**

```bash
# .env.example, documentation
# Review any MASTODON_* variables
# Document if they must remain for compatibility
```

**4. README & Documentation:**

```markdown
# README.md

# Any references to upstream Mastodon project

# Badges, links, installation instructions
```

#### Tasks

1. Update `package.json` name and repository URL
2. Verify `config/settings.yml` completeness
3. Audit `.env` files for branding references
4. Update README with Sauti branding (if public fork)
5. Update `CONTRIBUTING.md` with Sauti-specific guidelines
6. Verify `app.json` (Heroku) and Docker labels

---

### 6. Backend Controllers & Business Logic

**Effort:** Extra Small (XS) / **0.5 days**
**Impact:** VERY LOW - Internal code, not user-facing
**Priority:** P3 (Low)

#### Scope

**40 controller files** scanned - mostly class names and internal logic

**Findings:**

- No user-facing "Mastodon" strings in controller code
- API responses use locale strings (already covered)
- ActivityPub namespaces should remain unchanged (protocol requirement)

#### Examples (NO CHANGE NEEDED):

```ruby
# app/controllers/api/v1/accounts_controller.rb
class Api::V1::AccountsController < Api::BaseController
  # Internal class names, no user-facing branding
end

# app/lib/activitypub/adapter.rb
module ActivityPub
  # Protocol namespace, must remain for federation
end
```

#### Tasks

1. **Audit Pass:**
   - Search `rg "Mastodon" app/controllers/ app/models/ app/services/`
   - Filter for user-facing error messages only
   - Verify no hardcoded brand strings in business logic

2. **API Responses:**
   - Confirm all user-facing text uses i18n (locale files)
   - Verify JSON responses don't hardcode "Mastodon"
   - Check error messages use generic or localized strings

3. **ActivityPub Preservation:**
   - DO NOT change `ActivityPub::` namespaces
   - DO NOT change protocol identifiers in federation code
   - Keep `Mastodon::Version` for upstream compatibility tracking

**Decision:** Minimal work needed; most branding is in views/locales.

---

## Total Effort Summary

| Category                   | Effort   | Days        | Priority    | Status                         |
| -------------------------- | -------- | ----------- | ----------- | ------------------------------ |
| **1. Visual Assets**       | S-M      | 1-2         | P0 Critical | 🔴 Not Started                 |
| **2. Locale Strings**      | XL       | 5-7         | P0 Critical | 🟡 Partially Done (About page) |
| **3. Frontend Components** | L        | 4-5         | P1 High     | 🔴 Not Started                 |
| **4. Backend Templates**   | M        | 2-3         | P1 High     | 🔴 Not Started                 |
| **5. Configuration**       | S        | 1           | P2 Medium   | 🟢 Mostly Done                 |
| **6. Backend Code**        | XS       | 0.5         | P3 Low      | 🟢 No Action Needed            |
| **TOTAL**                  | **L-XL** | **13-18.5** |             | 🔴 **~10% Complete**           |

**Additional Time:**

- Design assets creation: +2-3 days (external to dev effort)
- QA/testing: +2-3 days
- Deployment/rollback planning: +1 day

**Grand Total with Overhead:** **18-27 days**

---

## Risks & Mitigation

### High Priority Risks

**1. ActivityPub/Federation Compatibility**

- **Risk:** Changing protocol identifiers breaks federation with other Mastodon instances
- **Impact:** HIGH - Cannot communicate with fediverse
- **Mitigation:**
  - Preserve all `ActivityPub::*` namespaces
  - Keep `Mastodon` in User-Agent strings for compatibility
  - Test federation thoroughly with remote instances
  - Review WebFinger, HTTP signatures, and nodeinfo responses
  - Consult `docs/rebranding.md:22-24` for protocol considerations

**2. Translation Debt**

- **Risk:** 200+ locale files become outdated/inconsistent
- **Impact:** MEDIUM - Non-English users see mix of Mastodon/Sauti
- **Mitigation:**
  - Update English master files first
  - Use `i18n-tasks` to mark untranslated strings
  - Prioritize Swahili translation (Kenyan audience)
  - Document translation workflow for community contributors
  - Consider automated translation for low-traffic locales

**3. Search/Replace Errors**

- **Risk:** Bulk find/replace changes internal code paths or breaks imports
- **Impact:** HIGH - Application breaks
- **Mitigation:**
  - Never bulk replace without file-by-file review
  - Exclude `from 'mastodon/...'` import paths
  - Use regex with word boundaries: `\bMastodon\b`
  - Test after each batch of changes
  - Comprehensive test suite execution (RSpec + Vitest)

### Medium Priority Risks

**4. Elephant Mascot Removal**

- **Risk:** No replacement illustrations for empty states
- **Impact:** MEDIUM - Generic/boring UX
- **Mitigation:**
  - Design Kenyan civic-themed illustrations early
  - Use abstract/geometric alternatives if design delayed
  - Consider photo-based content for civic engagement
  - Review `app/javascript/images/elephant_*.svg` usage in context

**5. Cache Invalidation**

- **Risk:** Redis/CDN caches old branding after deployment
- **Impact:** MEDIUM - Users see inconsistent branding
- **Mitigation:**
  - Bump asset versions in `config/initializers/assets.rb`
  - Clear Redis cache on deployment
  - Invalidate CDN cache for all assets
  - Use cache-busting query params for images

**6. Email Client Rendering**

- **Risk:** Updated email templates break in Outlook/Gmail
- **Impact:** MEDIUM - Poor email UX, deliverability issues
- **Mitigation:**
  - Test with Litmus or Email on Acid
  - Use table-based layouts (already present)
  - Inline CSS for maximum compatibility
  - Test plain-text versions

### Low Priority Risks

**7. Third-Party App Confusion**

- **Risk:** Mobile apps/clients show "Mastodon" while server says "Sauti"
- **Impact:** LOW - Minor confusion, expected for federated apps
- **Mitigation:**
  - Document in API responses that server is Sauti-based
  - Update server description/about endpoint
  - Consider custom branding in native app (future)

**8. SEO/Link Preview Changes**

- **Risk:** Cached Open Graph previews show old branding
- **Impact:** LOW - Social share previews outdated temporarily
- **Mitigation:**
  - Force re-scrape on Facebook, Twitter, LinkedIn debuggers
  - Update meta tags deployment timing
  - Accept temporary inconsistency (caches expire)

---

## Recommended Phased Approach

### Phase 0: Preparation (2-3 days)

**Goal:** Design assets and planning

- [ ] Finalize Sauti logo suite (full, icon, wordmark)
- [ ] Design 5 civic-themed mascot illustrations
- [ ] Generate favicon/icon assets (all sizes)
- [ ] Create git branch: `feature/phase1-rebrand-mastodon-sauti`
- [ ] Set up staging environment for testing
- [ ] Document rollback procedure

### Phase 1: Critical User-Facing (5-7 days)

**Goal:** Visible branding to users

- [ ] Replace all visual assets (Task 1)
- [ ] Update English frontend locale `en.json` (Task 2)
- [ ] Update English backend locale `en.yml` (Task 2)
- [ ] Update email templates HTML/text (Task 4)
- [ ] Update Open Graph meta tags (Task 4)
- [ ] Test: Signup flow, email delivery, social previews

**Deliverables:**

- New user sees "Sauti" branding throughout
- Emails say "Sauti" instead of "Mastodon"
- Social media previews show Sauti logo

### Phase 2: In-App Experience (4-5 days)

**Goal:** Consistency for existing users

- [ ] Update 18 frontend component messages (Task 3)
- [ ] Update backend HTML templates (Task 4)
- [ ] Update privacy/security explanation strings (Task 3)
- [ ] Update admin panel branding (Task 4)
- [ ] Update embeds and OAuth screens (Task 4)
- [ ] Test: All feature pages, modals, admin workflows

**Deliverables:**

- Zero "Mastodon" in user-visible UI (except federation context)
- Admin panel fully rebranded
- Third-party app authorization shows Sauti

### Phase 3: Metadata & Polish (1-2 days)

**Goal:** Developer/SEO completeness

- [ ] Update `package.json` metadata (Task 5)
- [ ] Update README and documentation (Task 5)
- [ ] Flag non-English locales for translation (Task 2)
- [ ] Create Swahili baseline translation (Task 2)
- [ ] Document translation workflow (Task 2)
- [ ] Verify federation still works (Risk Mitigation)

**Deliverables:**

- Repository metadata reflects Sauti
- Translation contributors have clear guidelines
- Federation compatibility verified

### Phase 4: QA & Deployment (2-3 days)

**Goal:** Production-ready release

- [ ] Run full RSpec test suite: `bundle exec rspec`
- [ ] Run Vitest test suite: `yarn test:js`
- [ ] Manual QA: Signup, login, post, federate, email
- [ ] Test email rendering in 5+ clients
- [ ] Verify social media preview on Twitter, Facebook, Slack
- [ ] Load test (if expecting traffic spike)
- [ ] Deploy to staging, smoke test
- [ ] Deploy to production with cache invalidation
- [ ] Monitor for errors, rollback if critical issues

**Deliverables:**

- Zero regressions in functionality
- Rebranding live in production
- Documentation updated

---

## Success Criteria

### User-Facing Criteria

- [ ] Zero visible "Mastodon" references except in federation/protocol context
- [ ] All logos, icons, favicons show Sauti branding
- [ ] Email notifications say "Sauti" not "Mastodon"
- [ ] Social media previews show Sauti logo and name
- [ ] About/landing page is 100% Sauti-branded (✅ already done)

### Technical Criteria

- [ ] All RSpec tests pass (`bundle exec rspec`)
- [ ] All Vitest tests pass (`yarn test:js`)
- [ ] Linting passes (`yarn lint`)
- [ ] Type checking passes (`yarn typecheck`)
- [ ] Federation with mastodon.social succeeds
- [ ] Email delivery rate unchanged
- [ ] Page load times unchanged (no performance regression)

### Documentation Criteria

- [ ] Translation workflow documented in `CONTRIBUTING.md`
- [ ] Non-English locales flagged for community translation
- [ ] Swahili baseline created for Phase 1
- [ ] README updated with Sauti branding
- [ ] API docs reflect Sauti endpoints/responses

---

## Dependencies

### External Dependencies

1. **Design Team:** Logo, icons, mascot illustrations (2-3 days)
2. **Product/Marketing:** Final approval on messaging/copy
3. **DevOps:** Staging environment, CDN invalidation access
4. **QA Team:** Email client testing, cross-browser testing (optional)

### Internal Dependencies

1. **Phase 0 Complete:** Repository setup, CI/CD, database (see `docs/phase0_status.md`)
2. **Phase 1 Partial:** Landing page already rebranded (see `docs/phase1_status.md`)
3. **No Blocking Features:** Can proceed in parallel with other Phase 1 work

---

## Testing Strategy

### Automated Testing

```bash
# Backend tests
bundle exec rspec                          # All RSpec tests
bundle exec rspec spec/features/           # Feature/system tests
bundle exec rspec spec/controllers/        # Controller tests

# Frontend tests
yarn test:js                               # Vitest unit tests
yarn lint                                  # ESLint
yarn typecheck                             # TypeScript

# Linting
bundle exec rubocop                        # Ruby linting
yarn lint:css                              # Stylelint
```

### Manual Testing Checklist

**Core Flows:**

- [ ] User registration (unauthenticated → authenticated)
- [ ] User login/logout
- [ ] Compose and publish post
- [ ] Follow/unfollow user
- [ ] Like, boost, quote post
- [ ] Receive notification
- [ ] Receive email notification
- [ ] Admin login and moderate content

**Branding Verification:**

- [ ] Logo appears correctly in header
- [ ] Favicon shows in browser tab
- [ ] PWA icon on mobile home screen
- [ ] Empty states show civic illustrations (not elephants)
- [ ] Email footer says "Sauti"
- [ ] OAuth consent screen says "Sauti"
- [ ] Error pages say "Sauti"

**Federation Testing:**

- [ ] Follow user on mastodon.social
- [ ] Receive post from remote instance
- [ ] Send post to remote instance
- [ ] Remote user can see your profile
- [ ] WebFinger lookup succeeds

**Cross-Browser Testing:**

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Email Testing:**

```
Test clients:
- Gmail (web)
- Gmail (Android/iOS app)
- Outlook.com (web)
- Outlook (desktop client)
- Apple Mail (macOS)
- Apple Mail (iOS)
```

---

## Rollback Plan

### Triggers for Rollback

- Federation breaks (cannot communicate with remote instances)
- Critical functionality broken (cannot post, cannot login)
- Mass user confusion/support tickets
- Email delivery failure rate >10%

### Rollback Procedure

1. **Immediate:** Revert git branch to previous commit
2. **Deploy:** Push previous version to production
3. **Cache:** Invalidate CDN cache again (reset to old assets)
4. **Verify:** Smoke test core functionality
5. **Communicate:** Notify users of temporary issue (if visible)

### Post-Rollback

- Analyze root cause in staging
- Fix issue in feature branch
- Re-test thoroughly
- Re-deploy with higher confidence

---

## Open Questions

1. **Elephant Mascot:**
   - Q: Keep elephant with Sauti branding, or replace entirely?
   - A: Decide by end of Phase 0 (affects design timeline)

2. **ActivityPub User-Agent:**
   - Q: Keep "Mastodon/4.x" in HTTP headers for compatibility?
   - A: Test federation with and without; document decision

3. **Translation Priority:**
   - Q: Which non-English locales are most important after Swahili?
   - A: Analytics review (if available) or defer to Phase 2+

4. **Package Namespace:**
   - Q: Rename all internal `from 'mastodon/...'` imports to `from 'sauti/...'`?
   - A: **Recommendation:** Defer to major refactor; not user-facing

5. **Upstream Sync:**
   - Q: How to handle future Mastodon updates with "Mastodon" branding?
   - A: Document merge strategy in `docs/phase0_status.md`

---

## References

### Related Documentation

- `docs/rebranding.md` - Original rebranding scope (7.4k references, 744 files)
- `docs/phase1_status.md` - Current Phase 1 progress (landing page done)
- `docs/social_media_pages.md` - Architecture of social media features
- `docs/structure.md` - Overall project structure
- `AGENTS.md` - Development guidelines

### External Resources

- [Mastodon Branding Guidelines](https://joinmastodon.org/branding) - Understand what we're replacing
- [ActivityPub Specification](https://www.w3.org/TR/activitypub/) - Federation protocol
- [Email Client Compatibility](https://www.caniemail.com/) - Email HTML/CSS support
- [Open Graph Protocol](https://ogp.me/) - Social media previews

---

## Change Log

| Date       | Author | Change                                              |
| ---------- | ------ | --------------------------------------------------- |
| 2025-10-25 | Claude | Initial scope assessment based on codebase analysis |

---

_This document will be updated as rebranding progresses through phases._
