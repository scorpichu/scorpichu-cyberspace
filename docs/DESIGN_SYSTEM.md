# Design System & Visual Guidelines - Naomi's Cyberspace

> **For AI Agents (Claude Code, GitHub Copilot, etc.)**
> This document is the single source of truth for the visual design of this project.
> When writing CSS, HTML structure, or component code, follow these rules exactly.
> **DO NOT reinterpret or modernize the design. Port it faithfully.**

---

## 1. Design Identity

### Aesthetic Classification
- **Primary**: Y2K / Heisei-era retrofuturism (late 1990s-early 2000s Japanese web)
- **Secondary**: Neocities personal homepage, early web nostalgia
- **Mood**: Calm, personal, cozy digital hideout — NOT corporate, NOT minimalist, NOT "modern"
- **Influences**: Frutiger Aero, cybercore, retro Japanese web portals, Geocities/Neocities culture

### Design Philosophy
This is a **personal homepage** in the spirit of Neocities/Geocities. It should feel hand-crafted, warm, and a little quirky. Key traits:
- Blinkies (animated GIF badges) are a CORE identity element
- Three-column layout mimicking classic personal sites
- Visual-only music player (no audio) as decoration
- Profile section with online status badge
- Gradient navbar/footer as signature design elements
- Teal sidebars contrasting with white main content

### What This Site Is NOT
- NOT a SaaS landing page
- NOT a Material Design / shadcn/ui app
- NOT a minimalist portfolio
- NOT a blog template with hero sections
- NEVER use CSS Grid for the main layout (use Flexbox)
- NEVER use circular profile images (use square with 8px radius)
- NEVER use overlays on the header image
- NEVER use light/white navbar or footer backgrounds

---

## 2. Color Palette

### Core Colors
| Token              | Hex       | Usage                                           |
|--------------------|-----------|--------------------------------------------------|
| `--blue`           | `#3182ce` | Primary blue, links, buttons, borders, gradients |
| `--light-blue`     | `#63b3ed` | Gradient endpoints, accent borders               |
| `--dark-blue`      | `#2c5282` | Headings, hover states, dark text emphasis        |
| `--bg`             | `#ebf8ff` | Body background (very pale blue)                 |
| `--white`          | `#ffffff` | Main content area background                     |

### Surface Colors
| Surface            | Hex                         | Usage                                |
|--------------------|-----------------------------|--------------------------------------|
| Box background     | `#f0f9ff`                   | `.box` class, profile section, cards |
| Sidebar background | `#e6fffa`                   | `<aside>` elements (teal)            |
| Sidebar border     | `#b2f5ea`                   | `<aside>` border (teal)             |
| Image area bg      | `rgba(255, 255, 255, 0.7)`  | Right sidebar image sections         |
| Form background    | `#f7fafc`                   | Input backgrounds                    |
| Blog form bg       | `#ffffff`                   | New post form                        |

### Text Colors
| Text Level         | Hex       | Usage                    |
|--------------------|-----------|--------------------------|
| Primary            | `#2d3748` | Body text                |
| Secondary          | `#4a5568` | Subtitles, descriptions  |
| Muted              | `#718096` | Dates, hints, counts     |
| Heading            | `#2c5282` | All h1/h2/h3 elements   |
| Link               | `#3182ce` | All anchor tags          |
| Link hover         | `#2c5282` | Anchor hover state       |
| Strong             | `#3182ce` | `<strong>` elements      |

### Border Colors
| Border             | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| Box border         | `#90cdf4` | `.box`, blog posts, form borders   |
| Light border       | `#e2e8f0` | Main content area, subtle dividers |
| Accent border      | `#bee3f8` | Profile status badge, blinkies     |
| Dashed border      | `#cbd5e0` | Form sections, separators          |
| Image border       | `#bee3f8` | Right sidebar images               |

### Semantic Colors
| Semantic           | Hex       | Usage                    |
|--------------------|-----------|--------------------------|
| Success/Online     | `#38a169` | Status dot               |
| Error/Delete       | `#f56565` | Delete hover, error text |
| Warning            | `#ed8936` | Character count warning  |

### Gradient Definitions
```css
/* Navbar and Footer — THE signature gradient */
background: linear-gradient(90deg, #3182ce, #63b3ed);

/* Buttons (submit, set-user) */
background: linear-gradient(135deg, #3182ce, #63b3ed);

/* Hover highlight (navbar links) */
background-color: rgba(255, 255, 255, 0.2);
```

---

## 3. Typography

### Font Stack
| Role        | Font Family                                | CSS Variable      |
|-------------|--------------------------------------------|--------------------|
| Headings    | `'VT323', monospace`                       | `--font-heading`   |
| Body        | `'Share Tech Mono', 'Courier New', monospace` | `--font-body`  |
| Navigation  | `'DotGothic16', sans-serif`                | `--font-nav`       |

### Font Assignment Rules
```
h1, h2, h3              → VT323 (pixel/retro monospace)
body, paragraphs         → Share Tech Mono
nav links, footer        → DotGothic16
.player-btn              → DotGothic16
.playlist-item           → Share Tech Mono
.song-title, .song-info  → Share Tech Mono
.post-date, .post-author → DotGothic16
.tag                     → DotGothic16
.submit-btn              → DotGothic16
.recent-post-date        → DotGothic16
.recent-post-tag         → DotGothic16
.status-text             → DotGothic16
```

### Type Scale
| Element  | Size      | Weight | Letter-spacing |
|----------|-----------|--------|----------------|
| h1       | `25px`    | normal | `1px`          |
| h2       | `2rem`    | normal | `1px`          |
| h3       | `1.5rem`  | normal | `1px`          |
| body     | default   | normal | `0.5px`        |
| sidebar  | `smaller` | normal | inherited      |

### Loading Fonts
Fonts are loaded via Google Fonts `@import url(...)` in `globals.css`, NOT via `next/font`.
```css
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=VT323&family=Share+Tech+Mono&display=swap');
```

---

## 4. Layout System

### Container
```css
#container {
  max-width: 900px;  /* Home page */
  margin: 0 auto;
}
/* Blog page container is 1100px */
```

### Page Structure (Home)
```
┌─────────────────────────────────────────┐
│  #header (150px, background-image)      │
├─────────────────────────────────────────┤
│  #navbar (40px, gradient blue→light)    │
├─────────────────────────────────────────┤
│  #profile-section (.box)                │
├────────┬────────────────────┬───────────┤
│ aside  │      <main>        │   aside   │
│ #left  │   (white bg)       │  #right   │
│ Sidebar│   flex: 1          │  Sidebar  │
│ 200px  │   order: 2         │  200px    │
│ teal   │                    │  teal     │
│ order:1│                    │  order:3  │
├────────┴────────────────────┴───────────┤
│  <footer> (40px, gradient blue→light)   │
└─────────────────────────────────────────┘
```

### Three-Column Layout Rules
```css
#flex { display: flex; }           /* NEVER use CSS Grid here */
aside { width: 200px; }           /* Fixed width, NOT percentage */
main { flex: 1; order: 2; }       /* Takes remaining space */
#leftSidebar { order: 1; margin-right: 10px; }
#rightSidebar { order: 3; margin-left: 10px; }
```

### Page Structure (Blog)
```
┌─────────────────────────────────────────┐
│  #header + #navbar (same as home)       │
├──────────┬──────────────────────────────┤
│  aside   │         <main>               │
│  Blog    │   Blog form + posts          │
│  Index   │                              │
│  220px   │                              │
├──────────┴──────────────────────────────┤
│  <footer> (same as home)                │
└─────────────────────────────────────────┘
```

### Responsive Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| `> 800px`  | Full three-column layout |
| `<= 800px` | Single column, main first (order:1), left sidebar second (order:2), right sidebar third (order:3) |
| `<= 480px` | Smaller buttons, reduced text, vertical nav |

---

## 5. Component Specifications

### Header (`#header`)
- Height: `150px` (fixed, no padding)
- Background: CSS variable `--header-image` (Pinterest image)
- `background-size: cover; background-position: center;`
- Fallback background-color: `#3182ce`
- **NO overlay, NO text, NO content inside**

### Navbar (`#navbar`)
- Height: `40px`
- Background: `linear-gradient(90deg, #3182ce, #63b3ed)`
- Links: **WHITE text** (`#ffffff`), font-weight 800, DotGothic16
- Hover: `background-color: rgba(255, 255, 255, 0.2)` — NO underline, text stays white
- `justify-content: space-evenly`
- Margin-bottom: `10px`

### Footer (`<footer>`)
- Height: `40px`
- Background: `linear-gradient(90deg, #3182ce, #63b3ed)` (SAME as navbar)
- Color: **WHITE** text
- Font: DotGothic16
- Layout: `display: flex; justify-content: space-between; align-items: center;`
- Left: Player status (music icon + song name)
- Right: Credit text ("started by naomi, Feb 2026")
- Border-radius: `4px`
- Margin-top: `10px`

### Profile Section (`#profile-section`)
- Background: `#f0f9ff` with `1px solid #90cdf4` border
- Profile image: **150x150px, SQUARE** (`border-radius: 8px`), 3px blue border
- Status badge: **absolute positioned** (bottom: 10px, right: -5px), pill shape
- Status dot: 8px green circle for "online"
- Name: h2, `1.8rem`, with `2px solid #bee3f8` bottom border
- Tagline: italic, `#4a5568`, `0.9rem`

### Sidebar (`<aside>`)
- Background: `#e6fffa` (teal)
- Width: `200px` (fixed)
- Border: `1px solid #b2f5ea`
- Border-radius: `8px`
- Padding: `20px`
- Font-size: `smaller`

### Main Content (`<main>`)
- Background: `#ffffff` (white)
- Border: `1px solid #e2e8f0`
- Border-radius: `8px`
- Padding: `20px`
- Box-shadow: `0 2px 4px rgba(0, 0, 0, 0.05)`

### Box (`.box`)
- Background: `#f0f9ff`
- Border: `1px solid #90cdf4`
- Padding: `10px`
- Border-radius: `6px`
- Margin-bottom: `15px`

### Music Player (`.music-player`)
- Nested inside `.box`
- Player controls: 40px circular blue buttons with Font Awesome icons
- Progress bar: 6px height, `#cbd5e0` track, `#3182ce` fill
- Volume: flex row with icon + range slider
- Playlist: items with `01`-padded numbers, "Artist - Title" format
- Active item: `#bee3f8` background

### Blinkies (`.blinky-gallery`)
- Display: `flex; flex-direction: column` (desktop), row-wrap (mobile)
- Image height: `31px` fixed
- `image-rendering: pixelated`
- Border: `1px solid #bee3f8`
- Hover: `scale(1.05)` + blue box-shadow

### Blog Post (`.blog-post`)
- Border-bottom: `2px dotted #cbd5e0` (NOT solid)
- Delete button: absolute top-right, transparent bg, red on hover
- Date: DotGothic16, `#718096`
- Author: DotGothic16, `#3182ce`, bold
- Tags: pill-shaped (`border-radius: 20px`), `#bee3f8` bg, DotGothic16

### Blog Form (`.new-post-form`)
- Border: `2px solid #63b3ed`
- Border-radius: `12px`
- Submit button: gradient, `border-radius: 25px` (pill), DotGothic16
- Inputs: `2px solid #cbd5e0`, `border-radius: 8px`, Share Tech Mono
- Character counts: right-aligned, `#718096`

### Image Areas (`.image-area`)
- Background: `rgba(255, 255, 255, 0.7)` (semi-transparent)
- Images: `height: 120px; object-fit: cover;`
- Heading (h4): centered, `#2c5282`, dashed bottom border
- Caption: `0.8rem`, `#4a5568`, centered

### Album Art (`.album-art`)
- Size: `80x80px`
- Border-radius: `8px`
- Border: `2px solid #3182ce`
- Centered with `margin: 0 auto 10px`

### Recent Posts (`.recent-post`)
- Background: `#f0f9ff`
- Border: `1px solid #90cdf4`
- Hover: `translateY(-2px)` + box-shadow
- "Read Full Post" button: blue bg, white text, `border-radius: 4px`
- Tags: smaller pills (`.recent-post-tag`), `border-radius: 12px`

---

## 6. Interaction & Animation Patterns

### Transitions
- **Default duration**: `0.2s` to `0.3s`
- **Easing**: `ease` or no easing specified (browser default)

### Hover Effects
| Element          | Effect                                             |
|------------------|----------------------------------------------------|
| Navbar links     | `background-color: rgba(255, 255, 255, 0.2)`      |
| Cards/posts      | `translateY(-2px)` + box-shadow                    |
| Blinkies         | `scale(1.05)` + `box-shadow: 0 2px 8px blue`      |
| Blog index items | `background: #edf2f7` + `border-left-color: blue` |
| Submit buttons   | `translateY(-2px)` + `box-shadow: 0 4px 12px`     |
| Player buttons   | `background-color: #2c5282`                        |
| Delete buttons   | `color: #f56565` + subtle red background           |

### Animations
```css
/* New post fade-in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 7. Icon System

- **Library**: Font Awesome 6.4.0 (CDN)
- **Style**: Solid (`fas`) and Regular (`far`) only
- **Common icons used**:
  - `fa-music` — footer player status
  - `fa-backward`, `fa-play`, `fa-pause`, `fa-forward` — music player
  - `fa-volume-up` — volume control
  - `fa-arrow-right` — blinkies "frequently updated"
  - `fa-calendar` — post dates (regular style: `far`)
  - `fa-user` — post authors
  - `fa-trash`, `fa-times` — delete buttons
  - `fa-pen-fancy`, `fa-heading`, `fa-edit` — blog form
  - `fa-images`, `fa-cloud-upload-alt`, `fa-plus` — image upload
  - `fa-tags` — tag input
  - `fa-paper-plane` — publish button
  - `fa-check` — confirm/set buttons

---

## 8. Spacing Rules

### Consistent Values
| Token     | Value  | Usage                                  |
|-----------|--------|----------------------------------------|
| Section   | `15px` | Margin between boxes/sections          |
| Box pad   | `10px` | Internal `.box` padding                |
| Form pad  | `20px` | Form and profile section padding       |
| Sidebar   | `20px` | `<aside>` padding                      |
| Main      | `20px` | `<main>` padding                       |
| Gap       | `10px` | Margin between sidebar and main        |
| Gallery   | `8px`  | Gap between blinkies                   |
| Playlist  | `8px`  | Playlist item padding                  |
| Controls  | `15px` | Gap between player buttons             |

### Border Radius Scale
| Size  | Value  | Usage                               |
|-------|--------|--------------------------------------|
| Small | `3px`  | Blinkie images, progress bar         |
| Base  | `4px`  | Navbar links, footer, read-more btn  |
| Card  | `6px`  | `.box`, recent posts, blog index     |
| Large | `8px`  | Sidebars, main, profile image, forms |
| XL    | `12px` | Blog form, user info, status badge   |
| Pill  | `20px` | Tags                                 |
| Full  | `25px` | Submit buttons                       |
| Circle| `50%`  | Player buttons, status dot, icons    |

---

## 9. Image Guidelines

### Profile Image
- Dimensions: 150x150px
- Shape: **SQUARE** with `border-radius: 8px` — NEVER circular
- Border: `3px solid #3182ce`
- Shadow: `0 4px 8px rgba(49, 130, 206, 0.2)`

### Sidebar Images (mood/yuri)
- Full width of sidebar
- Height: `120px` fixed
- `object-fit: cover`
- Border: `2px solid #bee3f8`
- Border-radius: `6px`

### Blog Images
- Single: `.blog-image` class, max-width 700px, centered
- Multiple: `.image-grid`, `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`
- Border: `2px-3px solid #63b3ed`

### Blinkies
- Height: `31px` (width auto)
- `image-rendering: pixelated` (preserves pixel art)
- Use standard `<img>` tags, NOT `next/image` (animated GIFs)

### General Rules
- Use `<img>` tags for animated GIFs and sidebar images
- Use `next/image` only where optimization matters (profile photo, album art)
- All images in `public/images/` directory

---

## 10. Do's and Don'ts

### DO
- Use the exact hex values from this guide
- Use Flexbox for the three-column layout
- Use ID selectors for unique layout elements (#container, #header, #navbar, #flex)
- Use class selectors for reusable patterns (.box, .tag, .blog-post)
- Keep the gradient navbar and footer as the visual signature
- Keep profile images square (8px radius)
- Keep blinkies at 31px height with pixelated rendering
- Use Font Awesome icons consistently
- Use DotGothic16 for UI labels, nav, dates
- Use VT323 for all headings
- Use Share Tech Mono for body text and content

### DON'T
- Don't use CSS Grid for the main page layout
- Don't make the profile image circular
- Don't add overlays to the header image
- Don't change the navbar/footer to light backgrounds
- Don't use "modern" design patterns (cards with large shadows, hero sections, gradients on cards)
- Don't introduce new colors not in the palette
- Don't use sans-serif fonts (everything is monospace or pixel)
- Don't remove the blinkies section
- Don't make the music player functional (it's visual only)
- Don't add a hamburger menu (nav wraps naturally on mobile)
- Don't add dark mode
- Don't use Tailwind utility classes for core layout — use the custom CSS in globals.css
- Don't reorganize the sidebar content order without explicit instruction

---

## 11. Date Formatting

All dates follow this exact format:
```
Month Day, Year at H:MM AM/PM
```
Examples:
- `February 10, 2026 at 2:00 AM`
- `January 15, 2026 at 11:30 PM`

Blog index uses abbreviated format:
```
Mon Day, Year
```
Example: `Feb 10, 2026`

---

## 12. Component HTML Patterns

### Standard Box
```html
<div class="box">
  <p><strong>Title</strong></p>
  <p>Content here</p>
</div>
```

### Image Area (Sidebar)
```html
<div class="image-area">
  <h4>Section Title</h4>
  <img src="/images/example.jpg" alt="Description" />
  <p style="font-size: 0.8rem; color: #4a5568; text-align: center;">Caption</p>
</div>
```

### Blog Post
```html
<article class="blog-post" id="post-{id}">
  <button class="delete-post-btn">x</button>
  <h2>Post Title</h2>
  <div class="post-date"><i class="far fa-calendar"></i> Date</div>
  <span class="post-author"><i class="fas fa-user"></i> Posted by: author</span>
  <div class="post-content"><p>Content</p></div>
  <div class="tags"><span class="tag">tag1</span></div>
</article>
```

### Playlist Item
```html
<div class="playlist-item active">
  <span class="song-number">01</span>
  <span class="song-title">Artist - Song Title</span>
</div>
```

---

*Last updated: February 2026*
*Based on original static HTML design by Naomi (git commit 655a1d1)*
