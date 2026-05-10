# Design Tokens — Warm Editorial Craftsman

Committed aesthetic direction for Mateusz's portfolio. All future sessions must respect these choices.

## Aesthetic Direction

**Name:** Warm Editorial Craftsman  
**Tone:** Warm, personal, quietly confident — like a well-designed book, not a SaaS landing page.  
**Inspiration:** Editorial personal sites, thoughtful indie designers, refined craftsman portfolios.

## Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display / Headings | Syne | 400, 500, 600, 700 | Geometric sans-serif, distinctive at large sizes. Self-hosted via `@fontsource/syne` |
| Body / UI text | DM Sans | 400, 400 italic, 500 | Clean, warm sans-serif. Self-hosted via `@fontsource/dm-sans` |

**Tailwind keys:** `font-display`, `font-body`

**Note:** `@fontsource/fraunces` and `@fontsource/source-serif-4` remain in `package.json` as unused dependencies — can be removed.

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `parchment` | `#FAF7F2` | Page background |
| `parchment-dark` | `#F5F0E8` | Surface / card background |
| `ink` | `#1C1814` | Primary text, headings |
| `ink-muted` | `#6B5E52` | Secondary text, nav links |
| `ink-faint` | `#9C8E84` | Tertiary text, footnotes |
| `terracotta` | `#C4622D` | Accent — CTAs, active states, eyebrow labels |
| `terracotta-light` | `#E8D5C4` | Accent backgrounds, Coming Soon badges |
| `terracotta-hover` | `#A84E22` | Accent hover state |
| `rule` | `#E2D9CE` | Borders, dividers, ruled lines |

## Spacing & Layout

- Container max-width: `72rem` (class: `container-content`)
- Section vertical padding: `clamp(4rem, 8vw, 7rem)` (var: `--space-section`)
- Body font size: `17px` (1.0625rem)
- Body line-height: `1.65`

## Breakpoints (Tailwind defaults)

| Name | Min-width |
|---|---|
| Mobile (default) | < 640px |
| sm (tablet) | ≥ 640px |
| md (desktop) | ≥ 768px |
| lg (wide) | ≥ 1024px |

## Motion

| Variable | Value |
|---|---|
| `--ease-craft` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--duration-fast` | `150ms` |
| `--duration-base` | `250ms` |
| `--duration-slow` | `400ms` |

- Scroll fade-up: `fade-up` class + IntersectionObserver in `Layout.tsx`
- Link hover: underline slide-in (`link-underline` utility class)
- All transitions respect `prefers-reduced-motion`

## Texture

Subtle noise grain via SVG filter applied as a fixed `body::before` layer (3% opacity). Adds paper-like warmth without weight.

## Hard Rules (from CLAUDE.md)

- No dark mode
- No Inter, Roboto, Arial, system fonts
- No purple gradients, neon, glassmorphism
- No scroll-jacking or animated hero backgrounds
- No emojis in UI copy
- Warm light aesthetic only
