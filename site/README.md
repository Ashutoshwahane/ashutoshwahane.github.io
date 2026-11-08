# ashutoshwahane.dev (Astro)

The site: handheld homepage, `/work`, and `/blog`.

## Run locally

```
cd site
npm install
npm run dev
```

Open http://localhost:4321/. Drafts (posts or products with `draft: true`) only show here, never in the built site.

## Add a post

Create `src/content/blog/<slug>.md`:

```
---
title: Your title
description: One or two sentences for the list and link previews.
date: 2026-11-20
category: story   # story | ai | android
product: glasspad # optional: links the post to a product page
draft: true       # set to false to publish
---
Your post in Markdown. Use ## headings; they build the table of contents.
```

## Add or edit a product

Edit `src/content/work/<slug>.md`. `featured: true` puts it in the big cards; others appear under "In the workshop".

## Build

`npm run build` writes the static site to `dist/`. `.github/workflows/deploy.yml` (repo root) builds `site/` and deploys it to GitHub Pages once the repo's Pages source is set to "GitHub Actions".
