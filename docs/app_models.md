# App Models (Conversation & Discovery)

This guide summarizes the models and service objects that back Sauti’s conversational surfaces (timelines, Explore, direct messaging, and public feeds). Each entry lists key attributes, responsibilities, and where the code is consumed today.

## Timeline & Trending Statuses

### Status (`app/models/status.rb`)

- **Key fields:** `id`, `text`, `visibility`, `language`, `account_id`, `conversation_id`, `ordered_media_attachment_ids[]`, `trendable`, `deleted_at`, `quote_approval_policy`.
- **Role:** Canonical post object used for timelines, Explore, ActivityPub federation, and conversations (including direct messages when `visibility` is `direct`).
- **Current usage:** Queried by controllers such as `StatusesController`, serialized via `REST::StatusSerializer`, indexed in Elasticsearch collections (`statuses`, `public_statuses`), and hydrated in the Explore “Posts” column. Trend calculations, notifications, and feeds all hinge on this table. No geographic field exists yet; county-level filtering would require schema changes.

### StatusTrend (`app/models/status_trend.rb`)

- **Key fields:** `status_id`, `account_id`, `score`, `rank`, `allowed`, `language`.
- **Role:** Stores computed popularity signals for each status that qualifies for discovery.
- **Current usage:** Read by `Trends::Statuses` queries and exposed through `/api/v1/trends/statuses`. Moderation tooling toggles the `allowed` flag to hide specific items.

### Trends::Statuses (`app/models/trends/statuses.rb`)

- **Type:** Service object powering the status trend pipeline.
- **Role:** Recomputes `StatusTrend` scores, decays outdated posts, and exposes a query interface that applies language/account filters.
- **Current usage:** Scheduled jobs invoke `refresh`, while the API controller (`app/controllers/api/v1/trends/statuses_controller.rb`) calls `query.allowed` to build Explore responses.

## Hashtag Discovery

### Tag (`app/models/tag.rb`)

- **Key fields:** `name`, `usable`, `trendable`, `listable`, `last_status_at`, `max_score`, `display_name`.
- **Role:** Represents hashtags attached to statuses and maintains usage metadata.
- **Current usage:** Associated with `Status` via HABTM joins, returned in search, and surfaced on Explore’s “Hashtags” tab. County support would require linking tag usage back to county-aware statuses.

### TagTrend (`app/models/tag_trend.rb`)

- **Key fields:** `tag_id`, `score`, `rank`, `allowed`, `language`.
- **Role:** Stores trend scores for tags.
- **Current usage:** Consumed by `Trends::Tags` to construct `/api/v1/trends/tags` responses and moderator review queues.

### Trends::Tags (`app/models/trends/tags.rb`)

- **Type:** Service object.
- **Role:** Aggregates tag history, computes trending scores with decay, and exposes a language-aware query.
- **Current usage:** Called by `Api::V1::Trends::TagsController` and background jobs. Extending for counties requires additional filtering logic once status geography is available.

## Link & Story Discovery

### PreviewCard (`app/models/preview_card.rb`)

- **Key fields:** `url`, `title`, `description`, `image_*`, `provider_name`, `language`, `max_score`, `trendable`, `author_account_id`.
- **Role:** Rich preview metadata for shared links; used to render cards and aggregate link popularity.
- **Current usage:** Joined from statuses through `PreviewCardsStatus`, displayed in timelines, and fed into link trends.

### PreviewCardTrend (`app/models/preview_card_trend.rb`)

- **Key fields:** `preview_card_id`, `score`, `rank`, `allowed`, `language`.
- **Role:** Tracks popularity scores for preview cards.
- **Current usage:** Queried by `Trends::Links` for Explore’s “News” column and admin moderation tools.

### Trends::Links (`app/models/trends/links.rb`)

- **Type:** Service object.
- **Role:** Aggregates link history, applies decay to trending scores, and offers a query interface similar to statuses/tags.
- **Current usage:** `Api::V1::Trends::LinksController` uses this to fetch Explore stories. Future county filtering will need per-status or per-preview-card geography.

## Conversations & Direct Messaging

### Conversation (`app/models/conversation.rb`)

- **Key fields:** `uri`, `parent_account_id`, `parent_status_id`.
- **Role:** Represents a federated thread root for direct/private discussions.
- **Current usage:** Associated with statuses to group DM threads, used when rendering inboxes and ActivityPub payloads. County data is absent; differentiation relies solely on participants.

### AccountConversation (`app/models/account_conversation.rb`)

- **Key fields:** `account_id`, `conversation_id`, `participant_account_ids[]`, `status_ids[]`, `last_status_id`, `unread`.
- **Role:** Per-account cache of a conversation; tracks which statuses belong to the thread and unread state.
- **Current usage:** Drives the `/api/v1/conversations` endpoint, streaming updates (via `PushConversationWorker`), and pagination for messaging clients. Updates whenever a direct-message status is added or removed.

### ConversationMute (`app/models/conversation_mute.rb`)

- **Key fields:** `account_id`, `conversation_id`.
- **Role:** Stores muted conversations per account to suppress notifications.
- **Current usage:** Checked when delivering DM notifications and timeline updates.

## Feed Aggregation

### PublicFeed (`app/models/public_feed.rb`)

- **Type:** Service object constructing timelines.
- **Inputs:** Account context and flags such as `with_replies`, `with_reblogs`, `local`, `remote`, `only_media`.
- **Role:** Builds the public timeline scope by combining status visibility rules, account filters, language preferences, and feed access settings.
- **Current usage:** Used by controllers serving `/api/v1/timelines/public` and streaming endpoints. Also underpins the unauthenticated landing page feed when Explore falls back to global content.

## People Suggestions

### AccountSuggestions (`app/models/account_suggestions.rb`)

- **Key fields:** (service object; persistence via cache, not a DB table).
- **Role:** Aggregates recommended accounts for the Explore “People” tab using sources such as shared follows and similarity.
- **Current usage:** Exposed by `Api::V1::SuggestionsController`. Upcoming county-aware discovery would require enhancing its sources with location signals.

---

**County-readiness summary:** None of the persisted models above currently store explicit county or geographic attributes. Implementing county-specific timelines or recommendations will require adding new columns (e.g., `statuses.county_id`), backfilling existing records, and updating each query path (`StatusTrend`, `TagTrend`, `PreviewCardTrend`, `PublicFeed`, `AccountConversation`) to respect the new filters.
