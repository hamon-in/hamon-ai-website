# Introduction

This is the website for Hamon Technologies. An AI transformation
services company. Hosted at https://alpha.hamon.in and deployed via
GitHub Actions (scp to 24.199.99.226:/var/www/alpha/).

# Branding & Look/Feel

## Aesthetic
Cyberpunk / dark cyborg interface — think Ghost in the Shell. The site
should feel like an AI operations console, not a generic SaaS landing
page. Key atmospheric effects: CRT vignette, subtle scanlines with
flicker, neon glow on interactive elements.

## Colors
- **Background**: near-black (`#060a10`), with surface (`#0c1219`) and elevated (`#111a24`) layers
- **Brand green**: `#009245` (primary), `#00c45a` (bright/accent), `#004d25` (dim)
- **Text**: light blue-grey (`#d8e2ec`), muted (`#4a5d72`), dim (`#2a3a4a`)
- Green is the only accent color. No other hues except in subtle atmospheric effects.

## Typography
- **Display/headings**: Syne (bold, punchy, geometric)
- **Body**: DM Sans (clean, readable)
- **Mono/UI labels**: IBM Plex Mono (terminal feel for tags, status indicators, nav)
- Section tags use `// PREFIX` pattern with mono font, uppercase, wide letter-spacing

## Tone
Copy uses operational/military metaphors: "agents", "protocol",
"mission log", "transmissions", "deploy", "interface". Avoid
corporate buzzwords. Keep it terse and confident.

## Visual Elements
- Neural brain SVG in hero with a glowing orchestrator node at center
- Cards use subtle green border glow on hover
- Loading states use spinning ring animation with orbiting katakana glyphs
- Reveal-on-scroll animations (fade up) for all sections

## Content Architecture
- Case studies are driven by `cases.md` (--- delimited blocks)
- Blog posts are driven by `posts.md` (--- delimited blocks)
- No build step — edit markdown, push to master, auto-deploys

