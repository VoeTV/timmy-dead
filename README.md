# Timmie · A life in the North Pacific

An interactive, premium visualisation of the full life of **Timmie**, a fictional
humpback whale (*Megaptera novaeangliae*) — from his birth under a Maui moon in
2003 to his final breath in Monterey Bay 22 years later.

The app threads three things together:

- a **dark, glassmorphic UI** with Inter / Poppins typography and Framer Motion
  micro-animations,
- an **interactive Leaflet map** showing the full migration polyline plus the
  whale's animated current position,
- and a **synchronised timeline** with autoplay, a 0.5×–8× speed control and
  a per-event "scientific vs storytelling" narration toggle.

It is a real, working Next.js 14 app — no pseudo-code.

## Highlights

- 26 hand-crafted life events across 22 years and ~30,000 km of ocean.
- Interpolated biological & environmental signals (age, length, weight, health,
  water temperature, dive depth, speed) — every value glides smoothly between
  events as the timeline plays.
- "Live playback" mode that animates the whale's marker along the route in real
  time at 0.5× / 1× / 2× / 4× / 8× speed.
- Toggleable activity heatmap.
- One-click **JSON export** of the entire dataset.
- Two narrative modes per event:
  - *Storytelling* — evocative prose,
  - *Scientific* — log-style observations.
- Cinematic intro overlay with an Autoplay shortcut.
- Responsive, mobile through wide-desktop.

## Tech stack

| Layer       | Library                                  |
|-------------|------------------------------------------|
| Framework   | Next.js 14 (App Router) + React 18       |
| Language    | TypeScript                               |
| Styling     | Tailwind CSS 3 + custom design tokens    |
| Animation   | Framer Motion 11                         |
| Maps        | Leaflet 1.9 + React-Leaflet 4            |
| Tiles       | CARTO dark basemap (free, attributed)    |
| Fonts       | Inter + Poppins (next/font)              |

## Folder structure

```
timmy-dead/
├── app/
│   ├── globals.css        # Tailwind + dark theme + Leaflet overrides
│   ├── layout.tsx         # Root layout, fonts, metadata, viewport
│   └── page.tsx           # Renders <AppShell />
├── components/
│   ├── AppShell.tsx       # Top-level orchestration (header, map, panels, intro)
│   ├── MapView.tsx        # Leaflet map, polyline, markers, animated whale
│   ├── Timeline.tsx       # Slider, speed, prev/next, event chips
│   ├── EventCard.tsx      # Per-event narrative card (story/scientific toggle)
│   ├── WhaleStatsPanel.tsx# Live biological & environmental dashboard
│   └── Icons.tsx          # Inline SVG icon set (stroke-based, no deps)
├── hooks/
│   └── useLifePlayback.ts # rAF-driven playback state machine
├── lib/
│   ├── types.ts           # Domain types (LifeEvent, WhaleProfile, ...)
│   ├── utils.ts           # Date math, interpolation, haversine, formatters
│   └── data.ts            # Timmie's life — 26 events with full bio/env data
├── public/                # (empty — fonts via next/font, tiles via CDN)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Architecture in 30 seconds

1. `lib/data.ts` exports a strictly-typed `LifeStory` containing the whale's
   profile and an ordered list of `LifeEvent`s.
2. `useLifePlayback` is a single, focused hook that owns the playback state:
   `currentMs`, `isPlaying`, `speed`, `currentIndex`, plus imperative
   `play / pause / jumpToEvent / setSpeed` controls. It uses
   `requestAnimationFrame` for buttery-smooth advancement.
3. `lib/utils.ts` provides pure functions: linear interpolation along the
   polyline (`interpolatePosition`) and across any biological/environmental
   field (`interpolateValue`).
4. `AppShell` composes `MapView`, `WhaleStatsPanel`, `EventCard` and `Timeline`,
   passing the same playback state — so the map, stats and narration are always
   in lock-step.
5. `MapView` is loaded via `next/dynamic({ ssr: false })` because Leaflet
   requires `window`.

## Getting started

Requirements: **Node 18+** (tested on Node 22 / 24).

```bash
# 1. install
npm install

# 2. start the dev server
npm run dev

# 3. open
# http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # next.js eslint
npm run typecheck  # tsc --noEmit
```

## Deploying to Cloudflare Pages

The app exports a fully-static `./out/` directory — no server required.

### Option A — Git integration (recommended, auto-deploys on push)

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages) → **Create a project** → **Connect to Git**.
2. Select the repository `VoeTV/timmy-dead`, branch `main`.
3. Configure the build:

   | Setting | Value |
   |---------|-------|
   | Framework preset | **Next.js (Static HTML Export)** |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Root directory | *(leave blank)* |

4. Add one environment variable:

   | Variable | Value |
   |----------|-------|
   | `NODE_VERSION` | `20` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` *(your custom domain, without trailing slash)* |

5. Click **Save and Deploy**. Done — every `git push` to `main` will redeploy automatically.

### Option B — Manual deploy with Wrangler

```bash
npm install
npm run build
npx wrangler pages deploy out --project-name=timmy-dead
```

### Connecting a custom domain

1. In the **Cloudflare Pages** project, go to **Custom domains** → **Set up a custom domain**.
2. Enter your domain (e.g. `timmie.example.com`).
3. Cloudflare will show you a **CNAME** record to add:

   | Type | Name | Content |
   |------|------|---------|
   | `CNAME` | `timmie` (or `@` for apex) | `timmy-dead.pages.dev` |

4. If the domain is **already on Cloudflare** (orange-clouded), the DNS record is added automatically — just confirm.
5. If the domain is **external**, add the CNAME at your registrar, then come back and click **Verify**.
6. Cloudflare automatically provisions a free SSL certificate (edge + origin). HTTPS is enforced by the `_headers` file (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).

For an **apex domain** (`example.com` without subdomain): Cloudflare requires the domain's NS to point to Cloudflare. Transfer or add the domain in the Cloudflare dashboard first, then add an `A`-flattened `CNAME` record.

### Production environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NODE_VERSION` | Yes | Ensures build uses Node 20+ |
| `NEXT_PUBLIC_SITE_URL` | Yes | Used for canonical URL, OG tags (`https://timmie.example.com`) |

### What the deploy includes

- **Security headers** (`_headers`): HSTS preload, X-Frame-Options DENY, nosniff, strict referrer, Permissions-Policy.
- **Cache rules**: `/_next/static/*` cached forever (immutable, content-hashed filenames); HTML always revalidates.
- **SEO**: OpenGraph + Twitter Card meta, canonical, robots.txt, JSON-LD-ready layout.
- **PWA stub**: `site.webmanifest` for mobile home-screen installs (add icons as needed).
- **404**: Custom Next.js 404 page (static).

## Customising the story

All of Timmie's life is defined in `lib/data.ts`. Each event is a typed
`LifeEvent` — add, remove, or rewrite them and the map, timeline, dashboard and
narration will all update automatically. Use `interactions`, `bio` and `env` to
shape the dashboard for any moment in his life.

## Credits

- Tile imagery: [CARTO](https://carto.com/attributions) /
  [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- Biology references: humpback growth curves, Hawaii–Alaska migration corridors,
  bubble-net foraging, song cultural transmission. Timmie himself is fictional;
  every other detail is grounded in real humpback science.
