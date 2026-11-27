# Shelsea's Lab

Personal site of Shelsea Saint-Fleur, data engineer in Greater Montréal. English is the default at `/`. French (Québec) lives under `/fr/`.

The site is a static [Astro](https://astro.build) build, published on GitHub Pages from the workflow in `.github/workflows/deploy.yml`.

## Pages source

GitHub Pages has to build with Actions, not from the files on `main`.

**Settings → Pages → Build and deployment → Source: GitHub Actions**

Until that is set, a push to `main` does not publish the built site. The workflow runs on every push to `main`.

## Locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/, including the Pagefind index
npm run preview  # serve dist/
```

Search is client-side [Pagefind](https://pagefind.app). The index is created during `npm run build`, so it is empty in `npm run dev`. Use `npm run build` and `npm run preview` to try it. English search only sees English pages. French search only sees French pages.

There is no analytics, no cookie, and no third-party font or script. A theme choice is kept in `localStorage` under `shelseas-lab-theme` on the device. See the privacy page.

## Add a project

Create one JSON file in `src/content/projects/`. Copy `morning-press.json` for a public repo, or `cest-deja-lenfer.json` for a live site whose source must not be linked.

| Field | Meaning |
| --- | --- |
| `kind` | `product` (live) or `opensource` |
| `order` | Sort order inside that pile. Lower comes first. |
| `featured` | `true` to show it on the home page. |
| `draft` | `true` to hide it. |
| `live` | Public URL. Omit if there is no public site. |
| `repo` | Public GitHub URL. **Omit this for a private repository.** Never paste a private URL. |
| `license` | SPDX id, when the project is public. |
| `tags`, `metrics` | Short labels, with `en` and `fr`. Metrics show as one quiet line, not tiles. |
| `theme` | Open source only. Projects that share `theme.id` are listed together. `theme.order` sorts the groups. Each language has a `title` and a `summary`. |
| `en`, `fr` | `title`, `summary`, `body` (paragraphs), optional `points`. |

The filename, without `.json`, is the URL slug in both languages: `/projects/your-slug/` and `/fr/projets/your-slug/`.

`scripts/check-dist.mjs` fails the build if a page links a GitHub repo other than your profile, `morning-press`, or this site repo. When you publish another public repo, add its name to `allowedRepos` in that script.

## Add a post

Add a pair of Markdown files with the same `translationKey`.

- English: `src/content/blog/en/your-slug.md` → `/blog/your-slug/`
- French: `src/content/blog/fr/votre-slug.md` → `/fr/blogue/votre-slug/`

```md
---
title: Post title
description: One sentence for the index, search, and RSS.
date: 2026-11-26
lang: en
translationKey: shared-id
---
```

`lang` is `en` or `fr`. RSS is `/rss.xml` and `/fr/rss.xml`.

## Fill in the timeline

Edit `src/data/timeline.ts`. The file comments are the full instructions. Short version:

1. Replace each `TODO` with the real fact. Do not guess an employer, a title, or a date.
2. Set `start` to `YYYY-MM-DD`. Use `end: null` and `current: true` when the role is ongoing.
3. Set `placeholder` to `false` once the title, the organization, and the dates are real. Until then the card stays dashed and labelled as incomplete.
4. Write both `en` and `fr`. The array order is the page order, newest first.

What is already known, and already shown above the cards: data engineer, Greater Montréal, B.Eng. in computer engineering. The school and the years are still blank.

## Brand files

Icons and the web manifest that the browser loads live in `public/` (`/favicon.ico`, `/site.webmanifest`, and the rest). The logo, icon, Open Graph image, and a copy of the manifest live in `public/assets/brand/`. Theme colour is `#AC152B`.

## Français — ajouter du contenu

- **Projet** : un fichier JSON dans `src/content/projects/`, avec les textes `en` et `fr`. Pas de champ `repo` si le dépôt est privé. Pour le code ouvert, un `theme` (`id`, `order`, `title`, `summary`) regroupe les projets qui partagent le même `id`.
- **Billet** : deux fichiers Markdown, même `translationKey`, dans `src/content/blog/en/` et `src/content/blog/fr/`.
- **Parcours** : `src/data/timeline.ts`. Remplacer les `TODO`, puis mettre `placeholder` à `false`. Ne pas inventer d'employeur, de titre ou de date.
