# Crafter Research Website

Public website for [research.crafter.ing](https://research.crafter.ing).

The site presents Crafter Research as a public-interest lab for inspectable corpora, evaluation runs, agent interfaces, and civic evidence systems.

## Visual System

- Theme-aware lab images: `public/gen/research-lab-{dark,light}.png`
- Local glyph favicon: `public/favicon.svg`
- Global tokens and shared components: `src/styles/global.css`

## Local Development

```bash
bun install
bun run dev
bun run build
```

## Content

- Home page: `src/components/HomePage.astro`
- Research log: `src/content/research/{en,es}/`
- Research routes: `src/pages/research/` and `src/pages/es/research/`
- Global visual system: `src/styles/global.css`

## Research Log Standard

Research log entries should state:

- The claim.
- The artifact that supports it.
- What changed from the previous belief.
- What is still weak or unverified.

Public claims should link to a repo, corpus, live interface, benchmark, or specific research artifact.
