# Naomi's Cyberspace - Project Guide

## Overview
Personal retro Y2K-themed website built with Next.js 16 App Router, Tailwind CSS v4, and Supabase.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS in `globals.css`
- **Database**: Supabase PostgreSQL (blog posts)
- **Deployment**: Vercel

## Project Structure
```
src/
  app/
    layout.tsx          # Root layout (fonts, nav, footer)
    page.tsx            # Home page (/)
    globals.css         # All styles (Tailwind v4 @theme + custom CSS)
    blog/page.tsx       # Blog page (/blog)
    api/posts/route.ts  # Blog CRUD API (GET/POST/DELETE)
    api/mcp-proxy/route.ts  # MCP proxy endpoint
    not-found.tsx       # 404 page
  components/
    Navbar.tsx          # Navigation bar
    Footer.tsx          # Footer with now-playing
    ProfileCard.tsx     # Profile section with avatar + bio
    MusicPlayer.tsx     # Visual-only music player (client)
    BlinkiesGallery.tsx # Blinkie GIFs gallery
    UpdatesBox.tsx      # Updates sidebar section
    RecentPosts.tsx     # Recent posts on homepage (client)
    RightSidebar.tsx    # Obsessions, mood, now playing
    BlogForm.tsx        # Post creation form (client)
    BlogPost.tsx        # Single post display (client)
    BlogIndex.tsx       # Blog sidebar index (client)
  lib/
    supabase.ts         # Server-side Supabase client
    supabase-browser.ts # Browser-side Supabase client
    types.ts            # TypeScript types (BlogPost, Song)
  data/
    songs.ts            # Playlist data
    default-posts.ts    # Default/seed blog posts
docs/
  DESIGN_SYSTEM.md      # Full visual design guidelines (READ WHEN DOING CSS/DESIGN WORK)
public/images/          # Static assets (profile, mood, album, blinkies)
```

## Key Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Decisions
- **Tailwind v4**: Uses `@theme` blocks in CSS, not tailwind.config.ts
- **Client components**: MusicPlayer, BlogForm, BlogPost, BlogIndex, RecentPosts use "use client"
- **Graceful Supabase fallback**: API returns default posts when Supabase is unavailable
- **Blog storage**: Supabase `blog_posts` table (was localStorage)
- **Music player**: Real audio playback using HTML5 Audio API with MP3 files in `public/audio/`
- **Images**: URL-based only (no file upload to Supabase Storage)

## Supabase Schema
```sql
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT,
  author TEXT NOT NULL DEFAULT 'naomi',
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Env Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (public, JWT format)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server only, optional)
- `MCP_SUPABASE_URL` - MCP proxy endpoint (optional)

## Design Guidelines (Summary)
> **Full guide**: `docs/DESIGN_SYSTEM.md` — read it when working on CSS, layout, or visual components.

- **Aesthetic**: Y2K / Heisei retro, Neocities personal homepage — NOT modern/minimalist
- **Layout**: Three-column Flexbox (NOT Grid). `#flex > aside + main + aside`
- **Colors**: Blue `#3182ce`, Light blue `#63b3ed`, Body bg `#ebf8ff`, Sidebar teal `#e6fffa`
- **Fonts**: VT323 (headings), Share Tech Mono (body), DotGothic16 (nav/labels)
- **Navbar/Footer**: `linear-gradient(90deg, #3182ce, #63b3ed)` with WHITE text
- **Profile image**: SQUARE (border-radius: 8px), NEVER circular
- **No CSS Grid** for main layout, **no dark mode**, **no hamburger menu**
