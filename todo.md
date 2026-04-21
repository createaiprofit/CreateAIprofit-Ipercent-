# 1% Playground — Project TODO

## Phase 1: App Shell & Global Styles
- [ ] Exact ECV theme: #02050A background, #94A3AA silver accent, #E9F2F4 near-white text — matches createaiprofit.com
- [ ] Rajdhani + Cormorant Garamond fonts
- [ ] App routing structure (all pages registered)
- [ ] Persistent bottom navigation (mobile-first)
- [ ] Top header with logo, tier badge, active member count

## Phase 2: Database & Backend
- [ ] Schema: users, feed_posts, comments, wallet_transactions, bot_roster
- [ ] tRPC routers: feed, profile, wallet, botEngine, admin
- [ ] Seed 1,000 enterprise member bot profiles
- [ ] Seed feed posts (wins, tips, crypto, accountability, community)

## Phase 3: Auth & Onboarding
- [ ] Manus OAuth login page
- [ ] Aria Rabbit welcome/onboarding screen
- [ ] Security verification step
- [ ] Terms of service acceptance
- [ ] Profile setup (bio, photo, business info)
- [ ] Tier assignment on signup

## Phase 4: Community Feed
- [ ] TikTok-style vertical scroll feed
- [ ] 1,000 enterprise member bot posts
- [ ] Post types: WIN, REAL ESTATE TIP, CRYPTO TIP, COMMUNITY, ACCOUNTABILITY
- [ ] Comments with member-to-member interactions
- [ ] Like / Share / Comment actions
- [ ] Live active member counter (animated)
- [ ] Enterprise ◆ badge on all members
- [ ] White Gold Diamond checkmark for enterprise bots

## Phase 5: Navigation Tab Pages
- [ ] Feed (home — TikTok-style member feed, members only)
- [ ] Live Feed (WEBSITE nav tab — visitor preview, 15–20 rotating posts, refreshes every 30 min, "Join 10-Day Free Trial" CTA at bottom)
- [ ] Live (app tab — coming soon with live dot indicator)
- [ ] Golden Vault — luxury affiliate store (NOT social feed): $5K suits, $30K watches, $500 ties, $200 cigars, each with direct affiliate checkout link. Uses ClubVault.tsx source.
- [ ] Marketplace
- [ ] Book Club
- [ ] Old Money (55+ content)
- [ ] New Money (25 & Under content)
- [ ] Dating → 25 & Under sub-section
- [ ] Dating → 55+ sub-section
- [ ] DM/Chat
- [ ] Concierge

## Phase 6: Profile, Wallet & Tier Pages
- [ ] Member profile page (tier, stats, activity history)
- [ ] In-app wallet (balance, transactions, tier breakdown)
- [ ] Tier gating enforcement (Basic / Business / Enterprise)
- [ ] Status checkmarks: Silver (Basic), Gold (Business), White Gold Diamond (Enterprise)
- [ ] Host page (baby avatar Machiavelli-style host bots with bios)
- [ ] Staff page (all 11 Syndicate members with roles and bios)

## Phase 7: Admin War Room
- [ ] War Room dashboard
- [ ] Bot Engine panel
- [ ] Toggle bots on/off
- [ ] Seed queue action
- [ ] Launch blitz action
- [ ] Run engagement cycle action
- [ ] Bot roster display with status indicators
- [ ] Admin-only access gating

## Phase 8: QA & Delivery
- [ ] QR code at bottom of every page
- [ ] Vitest tests
- [ ] Checkpoint saved
- [ ] Live URL delivered to user

## Host Bot Distinction — SPEC LOCKED

All 21 host bots (baby avatars) start with a Machiavelli quote.

- **8 Affiliate Host Bots**: After the Machiavelli quote, pivot to promoting a specific Golden Vault luxury product (suits, watches, ties, cigars). CTA = affiliate checkout link.
- **13 General Host Bots**: After the Machiavelli quote, go into general community content (market commentary, motivation, lifestyle). No product promotion.

Both groups follow the same host prompt. The 8 affiliate bots are distinguished only by their CTA assignment, not by a separate label or page.

## IMPORTANT DISTINCTION — Bot Types

- **21 Host Bots** (baby avatars in suits): Host page ONLY. Host bot prompt ONLY. These are The Don, The Chic, The Broker, etc. They are NOT the PostScheduler female bots.
- **PostScheduler female bots** (8 active, scale to 50): These are a separate system for social media posting. They are NOT the 21 host bots.
- Do NOT mix these two groups. They are completely separate.

## Host Bot Final Spec (LOCKED)

All 21 host bots are baby avatars in suits and sunglasses. All follow the same Machiavelli prompt. The 8 affiliate host bots use the affiliate marketing CTA only. The other 13 use the other CTAs. Same look, same prompt, different CTA assignment. No exceptions.

## Mini Series — SPEC LOCKED (FLAGSHIP LAUNCH STRATEGY)

The Mini Series is 21 two-minute mini movies (episodes) — the entire marketing engine for launching the 1% Playground and CreateAIProfit. Each episode is a short film with cast actors (stars + co-stars).

Mini Series bots (cast stars + co-stars) follow the **Mini Series Prompt ONLY**:
- They are actors in a scripted mini movie series, not social media bots
- Purpose: Drive views, create buzz, and convert viewers into app downloads
- They do NOT post to the social feed
- They do NOT do affiliate CTAs
- They do NOT follow the Machiavelli host prompt
- They are completely separate from host bots, staff bots, and user bots
- This is the flagship launch strategy for the owner (CreateAIProfit admin) to successfully launch the 1% Playground
