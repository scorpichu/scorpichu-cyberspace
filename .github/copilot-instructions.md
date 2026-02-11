# Copilot Instructions - Naomi's Cyberspace

## Project Overview
A retro Y2K personal website built with Next.js 16 App Router + Tailwind CSS v4 + Supabase.

## Tech Stack
- Next.js 16 with App Router and TypeScript
- Tailwind CSS v4 (configured via `@theme` in globals.css, NOT tailwind.config.ts)
- Supabase for blog post storage
- Font Awesome 6 for icons

## Conventions
- Use `"use client"` only for components with React hooks or browser APIs
- Import types with `import type { ... }` to avoid isolatedModules errors
- Blog post type field names use snake_case (`created_at`, not `createdAt`)
- Supabase client may be `null` - always check before using
- CSS custom properties defined in `@theme` block: `--color-retro-blue`, `--font-heading`, etc.

## Component Patterns
- Server components by default, `"use client"` only when needed
- Props interfaces defined inline in component files
- Blog data fetched via `/api/posts` route handler
- Date formatting: "Month Day, Year at H:MM AM/PM"

## Design Guidelines (Summary)
> **Full guide**: `docs/DESIGN_SYSTEM.md` — read it when working on CSS, layout, or visual components.

- **Aesthetic**: Y2K / Heisei retro, Neocities personal homepage — NOT modern/minimalist
- **Layout**: Three-column Flexbox (`#flex > aside + main + aside`), NEVER CSS Grid
- **Colors**: Blue `#3182ce`, Light blue `#63b3ed`, Body bg `#ebf8ff`, Sidebar teal `#e6fffa`
- **Fonts**: VT323 (headings), Share Tech Mono (body), DotGothic16 (nav/labels)
- **Navbar + Footer**: `linear-gradient(90deg, #3182ce, #63b3ed)`, WHITE text, DotGothic16
- **Profile image**: SQUARE (border-radius: 8px), NEVER circular
- **Blinkies**: 31px height, `image-rendering: pixelated`, standard `<img>` tags
- **No dark mode**, **no hamburger menu**, **no CSS Grid** for main layout
- Use existing CSS classes from globals.css (`.box`, `.blog-post`, `.tag`, etc.)

### Critical Don'ts
- Don't use CSS Grid for the main page layout
- Don't make the profile image circular
- Don't add overlays to the header image
- Don't change navbar/footer to light backgrounds
- Don't use sans-serif fonts (everything is monospace or pixel)
- Don't use Tailwind utility classes for core layout — use custom CSS in globals.css

## File Organization
- Components in `src/components/`
- Utility/lib in `src/lib/`
- Static data in `src/data/`
- API routes in `src/app/api/`
- Design documentation in `docs/`
