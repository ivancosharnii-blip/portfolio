# Portfolio — Ivan

Next.js App Router + TypeScript + Tailwind portfolio site.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- three + @react-three/fiber (hero DotWave shader field)
- next-intl (EN / RU / RO via `/[locale]`)

## Design tokens
- **Fonts:** Oswald 700 (display, Cyrillic-ready via `--font-anton`), Space Grotesk (sans), IBM Plex Mono (mono)
- **Colors (monochrome):** bg `#0A0A0A`, primary `#FFFFFF`, muted `rgba(255,255,255,0.45)` — no accent; contrast via outlined vs solid type
- **Selection:** white bg / black text
- **Locales:** `en` (default), `ru`, `ro` — messages in `messages/*.json`

## Structure
- `src/i18n/` — routing, request config, navigation helpers
- `src/middleware.ts` — next-intl locale routing
- `src/app/[locale]/` — localized pages
- `src/components/nav.tsx` — fixed nav + locale switcher + mobile overlay
- `src/components/scramble-text.tsx` — cycling scramble (latin/cyrillic pool)
- `src/components/typewriter.tsx` — char fade-in bio
- `src/components/DotWave.tsx` — R3F GPU dot-wave field (dynamic, ssr: false)
- `src/components/hero.tsx` — portfolio hero composition
- `src/components/LoadProof.tsx` — live FCP ms from Performance API
- `src/components/work.tsx` — Selected Work (`#work`), typography-only cases
- `src/components/about.tsx` — About section (`#about`)
- `src/components/contact.tsx` — Contact section (`#contact`)
- `src/components/site-footer.tsx` — marquee + info bar
- `messages/{en,ru,ro}.json` — locale strings (UTF-8)

No Framer Motion. DotWave only in hero. No images in Work. LoadProof never fakes timing.
