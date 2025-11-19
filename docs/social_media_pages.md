# Social Media Pages Architecture

## Overview

This document catalogs the core social media pages and features in Sauti (Mastodon fork), covering both frontend React components and backend Rails controllers. Understanding this structure is essential for Phase 1 adaptations and future civic engagement features.

---

## Frontend Architecture (React/TypeScript)

All frontend features are located in `app/javascript/mastodon/features/`.

### Explore & Discovery

**Location:** `app/javascript/mastodon/features/explore/`

| File                  | Purpose                      | Sauti Modifications                    |
| --------------------- | ---------------------------- | -------------------------------------- |
| `index.tsx`           | Main explore page with tabs  | ✅ Modified for county filtering       |
| `statuses.jsx`        | Trending/popular posts view  | ✅ Modified for county context banners |
| `tags.jsx`            | Trending hashtags            | Pending county-based filtering         |
| `links.jsx`           | Trending links               | Pending county-based filtering         |
| `suggestions.jsx`     | Suggested accounts to follow | Pending geographic suggestions         |
| `components/card.tsx` | Link preview cards           | -                                      |

**Routes:** `/explore`, `/explore/tags`, `/explore/links`, `/explore/suggestions`

**Related APIs:**

- `GET /api/v1/trends/statuses`
- `GET /api/v1/trends/tags`
- `GET /api/v1/trends/links`

---

### Timeline Pages

| Feature                | File                           | Purpose                                   |
| ---------------------- | ------------------------------ | ----------------------------------------- |
| **Home Timeline**      | `home_timeline/index.jsx`      | Authenticated user's personalized feed    |
| **Public Timeline**    | `public_timeline/index.jsx`    | Federated public posts from all instances |
| **Community Timeline** | `community_timeline/index.jsx` | Local instance posts only                 |
| **Firehose**           | `firehose/index.jsx`           | Combined public timeline view             |
| **Hashtag Timeline**   | `hashtag_timeline/index.jsx`   | Posts filtered by specific hashtag        |
| **List Timeline**      | `list_timeline/index.jsx`      | Custom user-curated list feed             |
| **Link Timeline**      | `link_timeline/index.tsx`      | Posts containing specific links           |

**Routes:**

- `/home` - Home timeline (authenticated)
- `/public` - Public timeline
- `/public/local` - Community timeline
- `/public/remote` - Remote federated posts
- `/tags/:tag` - Hashtag timeline
- `/lists/:id` - List timeline
- `/links/*` - Link timeline

**Related APIs:**

- `GET /api/v1/timelines/home`
- `GET /api/v1/timelines/public`
- `GET /api/v1/timelines/tag/:hashtag`
- `GET /api/v1/timelines/list/:list_id`
- `GET /api/v1/timelines/link`

---

### User Profiles & Social Graphs

| Feature            | File                         | Purpose                      |
| ------------------ | ---------------------------- | ---------------------------- |
| **Profile Page**   | `account/index.tsx`          | User profile overview        |
| **User Timeline**  | `account_timeline/index.jsx` | User's posts and reposts     |
| **Media Gallery**  | `account_gallery/index.tsx`  | User's photos and videos     |
| **Featured Posts** | `account_featured/index.tsx` | User-pinned posts            |
| **Followers List** | `followers/index.jsx`        | Accounts following this user |
| **Following List** | `following/index.jsx`        | Accounts this user follows   |
| **User Directory** | `directory/index.tsx`        | Browse/discover users        |

**Routes:**

- `/@:username` - Profile page
- `/@:username/media` - Media gallery
- `/@:username/with_replies` - Posts with replies
- `/@:username/followers` - Followers
- `/@:username/following` - Following
- `/directory` - User directory

**Related Controllers:**

- `app/controllers/accounts_controller.rb`
- `app/controllers/follower_accounts_controller.rb`
- `app/controllers/following_accounts_controller.rb`
- `app/controllers/api/v1/accounts_controller.rb`
- `app/controllers/api/v1/directories_controller.rb`

---

### Content Interaction Pages

| Feature           | File                            | Purpose                        |
| ----------------- | ------------------------------- | ------------------------------ |
| **Status Detail** | `status/index.jsx`              | Individual post with replies   |
| **Compose**       | `compose/index.tsx`             | Create new post interface      |
| **Notifications** | `notifications_v2/index.tsx`    | Mentions, likes, follows, etc. |
| **Favorites**     | `favourited_statuses/index.tsx` | Posts user has liked           |
| **Bookmarks**     | `bookmarked_statuses/index.tsx` | Posts user has bookmarked      |
| **Quote Posts**   | `quotes/index.tsx`              | Posts quoting another post     |
| **Reblogs**       | `reblogs/index.jsx`             | Users who reblogged a post     |

**Routes:**

- `/@:username/:status_id` - Status detail
- `/publish` - Compose new post
- `/notifications` - Notifications feed
- `/favourites` - Favorites collection
- `/bookmarks` - Bookmarks collection
- `/statuses/*` - Status-related pages

**Related Controllers:**

- `app/controllers/statuses_controller.rb`
- `app/controllers/api/v1/statuses_controller.rb`
- `app/controllers/api/v1/notifications_controller.rb`
- `app/controllers/api/v1/bookmarks_controller.rb`
- `app/controllers/api/v1/favourites_controller.rb`

---

### Search & Discovery

| Feature              | File                      | Purpose                       |
| -------------------- | ------------------------- | ----------------------------- |
| **Search**           | `search/index.tsx`        | Search posts, users, hashtags |
| **Followed Tags**    | `followed_tags/index.tsx` | Hashtags user subscribes to   |
| **Lists Management** | `lists/index.tsx`         | Create/manage custom lists    |

**Routes:**

- `/search` - Search interface
- `/followed_tags` - Followed hashtags
- `/lists` - Lists management

**Related APIs:**

- `GET /api/v2/search`
- `GET /api/v1/followed_tags`
- `GET /api/v1/lists`

---

### Moderation & Privacy

| Feature              | File                        | Purpose                   |
| -------------------- | --------------------------- | ------------------------- |
| **Blocked Accounts** | `blocks/index.jsx`          | Accounts user has blocked |
| **Muted Accounts**   | `mutes/index.jsx`           | Accounts user has muted   |
| **Domain Blocks**    | `domain_blocks/index.tsx`   | Blocked instances/domains |
| **Follow Requests**  | `follow_requests/index.jsx` | Pending follow requests   |
| **Content Filters**  | `filters/index.tsx`         | Keyword/content filters   |

**Routes:**

- `/blocks` - Blocked accounts
- `/mutes` - Muted accounts
- `/domain_blocks` - Blocked domains
- `/follow_requests` - Follow requests
- Settings pages for filters (via `/settings`)

**Related APIs:**

- `GET /api/v1/blocks`
- `GET /api/v1/mutes`
- `GET /api/v1/domain_blocks`
- `GET /api/v1/follow_requests`
- `GET /api/v1/filters`

---

### Landing & Onboarding

| Feature                | File                                      | Purpose                      | Sauti Status                      |
| ---------------------- | ----------------------------------------- | ---------------------------- | --------------------------------- |
| **Landing Page**       | `about/index.jsx`                         | Public homepage              | ✅ Customized with Sauti branding |
| **Kenya Counties Map** | `about/components/kenya_counties_map.jsx` | Interactive county selector  | ✅ Implemented with Leaflet       |
| **Getting Started**    | `getting_started/index.tsx`               | User onboarding guide        | Pending adaptation                |
| **Onboarding Follows** | `onboarding/follows.tsx`                  | Suggested accounts to follow | Pending civic accounts            |

**Routes:**

- `/` (unauthenticated) - Landing page
- `/about` - About page
- `/getting-started` - Getting started
- `/start/*` - Onboarding flow

**Supporting Files:**

- `public/kenya_adm1_full.geojson` - Kenya counties boundary data
- `app/javascript/vendor/leaflet/` - Map library (vendored locally)

---

### Navigation & Layout

| Feature               | File                                     | Purpose                 |
| --------------------- | ---------------------------------------- | ----------------------- |
| **Main UI Container** | `ui/index.jsx`                           | Root layout wrapper     |
| **Navigation Bar**    | `ui/components/navigation_bar.tsx`       | Top navigation          |
| **Async Components**  | `ui/util/async-components.js`            | Lazy loading utilities  |
| **Navigation Panel**  | `navigation_panel/index.tsx`             | Sidebar navigation      |
| **Trends Widget**     | `navigation_panel/components/trends.tsx` | Trending topics sidebar |

---

## Backend Architecture (Rails)

### Web Controllers

Located in `app/controllers/`

| Controller                         | Purpose                                   |
| ---------------------------------- | ----------------------------------------- |
| `home_controller.rb`               | Serves React SPA for authenticated routes |
| `about_controller.rb`              | Landing/about page                        |
| `accounts_controller.rb`           | User profile HTML pages                   |
| `statuses_controller.rb`           | Individual post HTML pages                |
| `tags_controller.rb`               | Hashtag HTML pages                        |
| `follower_accounts_controller.rb`  | Followers list                            |
| `following_accounts_controller.rb` | Following list                            |

### API Controllers (v1)

#### Timeline APIs

Located in `app/controllers/api/v1/timelines/`

| Controller             | Endpoint                              | Purpose                        |
| ---------------------- | ------------------------------------- | ------------------------------ |
| `home_controller.rb`   | `GET /api/v1/timelines/home`          | Authenticated user's home feed |
| `public_controller.rb` | `GET /api/v1/timelines/public`        | Public federated timeline      |
| `tag_controller.rb`    | `GET /api/v1/timelines/tag/:hashtag`  | Hashtag-filtered posts         |
| `list_controller.rb`   | `GET /api/v1/timelines/list/:list_id` | Custom list timeline           |
| `link_controller.rb`   | `GET /api/v1/timelines/link`          | Link-based timeline            |
| `topic_controller.rb`  | `GET /api/v1/timelines/topic`         | Topic-based timeline           |

#### Trends & Discovery APIs

Located in `app/controllers/api/v1/trends/`

| Controller               | Endpoint                      | Purpose           |
| ------------------------ | ----------------------------- | ----------------- |
| `statuses_controller.rb` | `GET /api/v1/trends/statuses` | Trending posts    |
| `tags_controller.rb`     | `GET /api/v1/trends/tags`     | Trending hashtags |
| `links_controller.rb`    | `GET /api/v1/trends/links`    | Trending links    |

#### Core Social APIs

Located in `app/controllers/api/v1/`

| Controller                      | Key Endpoints                                                                                            | Purpose                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------- |
| `statuses_controller.rb`        | `POST /api/v1/statuses`<br>`GET /api/v1/statuses/:id`<br>`DELETE /api/v1/statuses/:id`                   | Create, read, delete posts |
| `accounts_controller.rb`        | `GET /api/v1/accounts/:id`<br>`POST /api/v1/accounts/:id/follow`<br>`POST /api/v1/accounts/:id/unfollow` | Account operations         |
| `suggestions_controller.rb`     | `GET /api/v1/suggestions`                                                                                | Account suggestions        |
| `bookmarks_controller.rb`       | `GET /api/v1/bookmarks`<br>`POST /api/v1/statuses/:id/bookmark`                                          | Bookmarks management       |
| `favourites_controller.rb`      | `GET /api/v1/favourites`<br>`POST /api/v1/statuses/:id/favourite`                                        | Likes/favorites            |
| `notifications_controller.rb`   | `GET /api/v1/notifications`                                                                              | User notifications         |
| `lists_controller.rb`           | `GET /api/v1/lists`<br>`POST /api/v1/lists`                                                              | Custom lists CRUD          |
| `filters_controller.rb`         | `GET /api/v1/filters`<br>`POST /api/v1/filters`                                                          | Content filters            |
| `blocks_controller.rb`          | `GET /api/v1/blocks`<br>`POST /api/v1/accounts/:id/block`                                                | Block management           |
| `mutes_controller.rb`           | `GET /api/v1/mutes`<br>`POST /api/v1/accounts/:id/mute`                                                  | Mute management            |
| `follow_requests_controller.rb` | `GET /api/v1/follow_requests`<br>`POST /api/v1/follow_requests/:id/authorize`                            | Follow requests            |
| `directories_controller.rb`     | `GET /api/v1/directory`                                                                                  | User directory             |
| `tags_controller.rb`            | `GET /api/v1/tags/:id`<br>`POST /api/v1/tags/:id/follow`                                                 | Tag operations             |
| `followed_tags_controller.rb`   | `GET /api/v1/followed_tags`                                                                              | User's followed tags       |

---

## Routing Configuration

### Main Routes

**File:** `config/routes.rb`

```ruby
# Root routing (lines 19-27)
authenticated :user do
  root 'home#index', as: :authenticated_root
end

unauthenticated do
  root 'about#show', as: :unauthenticated_root
end

root to: 'about#show'
```

**Behavior:**

- Authenticated users land on `/home` (home timeline)
- Unauthenticated users land on `/about` (Sauti landing page with Kenya map)

### React SPA Routes

**File:** `config/routes/web_app.rb`

All these paths route to `home#index`, which serves the React SPA:

```
/blocks              /favourites          /notifications_v2/(*any)
/bookmarks           /follow_requests     /pinned
/conversations       /followed_tags       /public
/deck/(*any)         /getting-started     /public/local
/directory           /home                /public/remote
/domain_blocks       /keyboard-shortcuts  /publish
/explore/(*any)      /links/(*any)        /search
                     /lists/(*any)        /start/(*any)
                     /mutes               /statuses/(*any)
```

### API Routes

**File:** `config/routes/api.rb` (drawn via `draw(:api)` in main routes)

All API endpoints are prefixed with `/api/v1/` or `/api/v2/`.

---

## Sauti-Specific Modifications (Phase 1)

### Completed

| File                                                                       | Modification                 | Purpose                                         |
| -------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| `app/javascript/mastodon/features/explore/index.tsx`                       | Added county filter dropdown | Allow users to filter explore content by county |
| `app/javascript/mastodon/features/explore/statuses.jsx`                    | Added county context banner  | Show which county's content is displayed        |
| `app/javascript/mastodon/features/about/index.jsx`                         | Complete redesign            | Sauti branding, mission, civic engagement focus |
| `app/javascript/mastodon/features/about/components/kenya_counties_map.jsx` | New component                | Interactive Leaflet map for county selection    |
| `config/routes.rb`                                                         | Modified root routing        | Unauthenticated users see Sauti landing page    |
| `app/javascript/mastodon/locales/en.json`                                  | Updated strings              | Sauti-specific messaging                        |
| `config/settings.yml`                                                      | Updated metadata             | Site title, description, branding               |
| `public/kenya_adm1_full.geojson`                                           | New file                     | Kenya counties boundary data                    |
| `app/javascript/vendor/leaflet/`                                           | Vendored library             | Map visualization (local hosting)               |

### Pending (Next Steps)

1. **Backend county filtering:**
   - Modify timeline controllers to accept county parameter
   - Filter API responses based on geographic metadata
   - Update `app/controllers/api/v1/timelines/*.rb`
   - Update `app/controllers/api/v1/trends/*.rb`

2. **Account geographic metadata:**
   - Add county/constituency/ward fields to `accounts` table
   - Create migration for geographic taxonomies
   - Update account serializers to expose location data

3. **UI/UX refinements:**
   - Replace Mastodon assets (logos, icons, favicons)
   - Update color scheme in `app/javascript/styles/`
   - Localize for Swahili (create `sw.json` locale file)

4. **Discovery enhancements:**
   - Filter suggestions by county
   - Geographic trending topics
   - County-specific user directory

---

## Data Flow Examples

### Explore Page Flow

1. **User visits `/explore`**
   - Route → `config/routes/web_app.rb` → `home#index`
   - React loads `app/javascript/mastodon/features/explore/index.tsx`

2. **Component fetches trending content**
   - `GET /api/v1/trends/statuses?county=nairobi` (with county param)
   - Controller: `app/controllers/api/v1/trends/statuses_controller.rb`
   - Returns JSON with trending posts

3. **County filter interaction**
   - User selects county from dropdown
   - State updates, new API call with county parameter
   - Context banner displays selected county

### Home Timeline Flow

1. **Authenticated user visits `/home`**
   - Route → `config/routes.rb` (line 20) → `home#index`
   - React loads `app/javascript/mastodon/features/home_timeline/index.jsx`

2. **Component fetches personalized feed**
   - `GET /api/v1/timelines/home`
   - Controller: `app/controllers/api/v1/timelines/home_controller.rb`
   - Returns posts from followed accounts

3. **Real-time updates**
   - WebSocket connection to streaming API
   - Node.js streaming service (`streaming/`) pushes new posts
   - React updates timeline without refresh

### Landing Page Flow (Unauthenticated)

1. **User visits `/`**
   - Route → `config/routes.rb` (line 24) → `about#show`
   - React loads `app/javascript/mastodon/features/about/index.jsx`

2. **Kenya map renders**
   - Component loads `kenya_counties_map.jsx`
   - Fetches GeoJSON from `public/kenya_adm1_full.geojson`
   - Leaflet renders interactive map

3. **County selection**
   - User clicks county on map
   - Redirects to `/explore?county=nairobi`
   - Shows civic content for that county

---

## Key Dependencies

### Frontend

- **React 18** - UI framework
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Leaflet** - Map visualization (vendored in `app/javascript/vendor/`)

### Backend

- **Rails 8** - API and web server
- **PostgreSQL 14+** - Database
- **Sidekiq** - Background jobs
- **Redis 7+** - Caching and job queue
- **ActivityPub** - Federation protocol

---

## Testing

### Frontend Tests

- **Location:** Colocated with features in `__tests__/` directories
- **Framework:** Vitest + Testing Library
- **Run:** `yarn test:js`

### Backend Tests

- **Location:** `spec/` directory
- **Framework:** RSpec
- **Controllers:** `spec/controllers/`
- **System tests:** `spec/system/`
- **Run:** `bundle exec rspec`

---

## Related Documentation

- `docs/structure.md` - Overall project architecture
- `docs/phase1_status.md` - Phase 1 implementation progress
- `docs/fork_roadmap.md` - Long-term feature roadmap
- `docs/rebranding.md` - Mastodon → Sauti rebranding scope
- `AGENTS.md` - Development guidelines and workflows

---

## Notes for Developers

1. **Always preserve ActivityPub compatibility** when modifying social features - federation depends on standard protocols.

2. **Geographic filtering is UI-first** - Backend API filtering is pending implementation. Current county selection affects frontend state only.

3. **All routes to `home#index`** serve the same React SPA - client-side routing (React Router) handles navigation within the app.

4. **Timeline caching** - Redis heavily caches timelines; modifications to timeline logic require cache invalidation strategy.

5. **Real-time features** - The Node.js streaming service (`streaming/`) handles WebSocket connections independently; changes to timeline logic must be reflected there as well.

6. **Locale files** - English strings live in both `config/locales/en.yml` (Rails) and `app/javascript/mastodon/locales/en.json` (React). Keep them synchronized.

7. **County data source** - `public/kenya_adm1_full.geojson` contains 47 counties. Ensure consistency with backend geographic taxonomy when implemented.

---

_Last updated: 2025-10-25 (Phase 1)_
