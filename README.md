# Mateusz Kozinski — Portfolio

Personal portfolio site for Mateusz Kozinski, an AI implementation specialist based in London. Showcases 7 projects spanning production Django apps, full-stack platforms, and AI integrations. Features a GPT-4o contextual chatbot running on a Cloudflare Worker with streaming SSE responses.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 with CSS custom properties |
| Routing | React Router v6 |
| Syntax highlighting | prism-react-renderer |
| Fonts | Syne (display), DM Sans (body) — self-hosted via `@fontsource` |
| Hosting | Cloudflare Pages |
| Chatbot backend | Cloudflare Pages Functions (Worker) |
| Chatbot AI | OpenAI GPT-4o (streaming) |

## Design System

**Aesthetic:** Warm Editorial Craftsman — editorial personal sites, refined craftsman portfolios.

**Palette:** Neutral ground (`#F5F6F5` parchment, `#1A1C1B` ink) with a muted jade-teal accent (`#3E7A74`). All colours live in CSS custom properties.

**Typography:** Syne for headings, DM Sans for body. Both self-hosted via `@fontsource`.

**Signature interactions:**
- Cursor spotlight: radial gradient tracking mouse, clipped to homepage hero section only
- Arrow animations: `→` and `↗` translate on hover
- Sticky mobile section labels: backdrop-blur pills per section
- Floating chat suggestions: per-page rotating questions near the chat bubble

---

## Local Development

Requires Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:5173 (Vite only — no /api/chat)
npm run build     # type-check + production build
npm run preview   # preview production build
```

### Dev with chatbot (requires OpenAI API key)

The chatbot backend is a Cloudflare Pages Function in `functions/api/chat.ts`. To test it locally:

```bash
# Terminal 1 — Vite dev server
npm run dev

# Terminal 2 — Wrangler proxy (serves Worker at :8788, proxies static to :5173)
npx wrangler pages dev --proxy 5173
```

Then open `http://localhost:8788`. Vite is configured to proxy `/api` requests to `:8788` when running on `:5173` as well.

Create `.dev.vars` (gitignored) with your key:
```
OPENAI_API_KEY=sk-...
```

---

## Project Structure

```
Portfolio-main/
├── functions/
│   └── api/
│       └── chat.ts              # Cloudflare Pages Function — chatbot backend
├── public/
│   ├── _redirects               # SPA routing: /* /index.html 200
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx           # App shell with ChatbotProvider
│   │   │   ├── Nav.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx      # Standard + wide variant
│   │   │   ├── JointProjectCard.tsx # 2-col split card for Waste Audit pair
│   │   │   ├── ProjectsGrid.tsx     # Shared grid used on homepage and /projects
│   │   │   ├── ProjectHero.tsx      # Project page hero
│   │   │   ├── ProjectPageLayout.tsx# Full project page template
│   │   │   ├── ContactCards.tsx
│   │   │   ├── TechTag.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── CodeSnippet.tsx
│   │   │   ├── ScreenshotGallery.tsx
│   │   │   └── ...
│   │   └── chatbot/
│   │       ├── ChatBubble.tsx       # Floating trigger button + ChatSuggestions
│   │       ├── ChatWindow.tsx       # Chat interface (desktop panel / mobile fullscreen)
│   │       ├── ChatMessage.tsx      # Individual message bubble with markdown rendering
│   │       ├── ChatInput.tsx        # Textarea with char counter + send button
│   │       ├── ChatPrompt.tsx       # Hero inline input (auto-opens chat at 20 chars)
│   │       ├── ChatSuggestions.tsx  # Rotating per-page question bubbles near chat button
│   │       └── useChatbot.ts        # Context + hook: state, streaming, prefill
│   ├── content/                     # Single source of truth — edit here, not in components
│   │   ├── projects.ts              # All 7 projects, typed
│   │   ├── about.ts                 # Career narrative
│   │   ├── skills.ts                # Grouped skill lists
│   │   ├── timeline.ts              # Career timeline entries
│   │   ├── values.ts                # "How I work" values
│   │   ├── contact.ts               # Contact info
│   │   └── chatbot-context.ts       # Assembled knowledge base for the chatbot system prompt
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── projects/
│   │       ├── WasteAuditPage.tsx
│   │       ├── WasteAuditAiPage.tsx
│   │       ├── DiscordBotPage.tsx
│   │       ├── BlanccoParserPage.tsx
│   │       ├── HddScannerPage.tsx
│   │       ├── RebootPage.tsx
│   │       └── PortfolioPage.tsx
│   └── utils/
│       ├── useMeta.ts               # Per-page <title> + OG/Twitter meta tags hook
│       └── techIcons.ts             # react-icons map for tech stack tags
└── content.md                       # Site content master file
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Homepage (hero, full projects grid, timeline, values, contact CTA) |
| `/projects` | Projects index |
| `/projects/waste-audit` | Waste Audit Tool |
| `/projects/waste-audit-ai` | Waste Audit AI Enhanced |
| `/projects/discord-bot` | GPT Knowledge Base Discord Bot |
| `/projects/blancco-parser` | Blancco XML to Pandas Parser |
| `/projects/hdd-scanner` | HDD/SSD Label Scanner |
| `/projects/reboot` | Reboot Project |
| `/projects/portfolio` | Portfolio & AI Chatbot |
| `/about` | About |
| `/contact` | Contact |

---

## Projects Grid Layout

Both `/` and `/projects` use the shared `ProjectsGrid` component:

```
Row 1: [Reboot Project ── wide 2-col ──────────────────] [HDD Scanner]
Row 2: [Blancco Parser] [Waste Audit ── joint 2-col ──────────────────]
Row 3: [Portfolio ── wide 2-col (jade card) ───────────] [Discord Bot]
```

The Waste Audit joint card (`JointProjectCard`) renders both the original and AI-enhanced versions side by side, linked to their respective pages. The Portfolio card uses a custom jade gradient accent.

---

## Chatbot Architecture

```
Browser (React)                    Cloudflare Worker              OpenAI
┌─────────────────┐               ┌──────────────────┐          ┌─────────┐
│ ChatBubble      │               │                  │          │         │
│ ChatPrompt      │──POST /api/──▶│ 1. Rate limit    │          │         │
│ ChatSuggestions │   chat        │ 2. Validate      │──GPT-4o──▶│ OpenAI  │
│ ChatWindow      │               │ 3. Build prompt  │◀─stream──│  API    │
│                 │◀──SSE stream──│ 4. Stream back   │          │         │
└─────────────────┘               └──────────────────┘          └─────────┘
```

- **Rate limiting:** 20 messages/IP/hour (in-memory, per Worker isolate)
- **Streaming:** OpenAI SSE → Worker transformer → `data: {"delta":"..."}` events
- **Knowledge base:** `chatbot-context.ts` assembled at bundle time from the same content files that power the site (single source of truth)
- **Context injection:** Worker injects `currentPage` and `projectSlug` per request so the bot leads with relevant project info
- **Guardrails:** System prompt resists prompt injection, off-topic requests, and system prompt extraction attempts

---

## Deployment (Cloudflare Pages)

```
Build command:    npm run build
Output directory: dist
Node version:     20.x
```

Set the `OPENAI_API_KEY` environment variable in Cloudflare Pages → Settings → Environment Variables (Production).

`public/_redirects` handles SPA routing:
```
/* /index.html 200
```

---

## Content Updates

All written content lives in `src/content/`. To update:
1. Edit the relevant file in `src/content/`
2. The chatbot knowledge base auto-updates — `chatbot-context.ts` imports from the same files
3. No separate chatbot content to maintain
