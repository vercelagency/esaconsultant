# ESA Consultant — Static Web Build

Clean, self-contained static build of `esaconsultant.com` organized for GitHub and zero-config Vercel deployment.

## Project Structure

```text
esaconsultant/
├── public/               # Static site root deployed by Vercel (80 live pages + 703 assets)
│   ├── index.html        # Homepage
│   ├── about-us/         # About page (auto-play video starts muted)
│   ├── services/         # Services overview
│   ├── service/          # 21 refreshed service detail pages (full-width + ESAC blue theme)
│   ├── projects/         # Projects overview + /project/* & /project-category/*
│   ├── our-teams/        # Team overview + /team/*
│   ├── contact-us/       # Contact page
│   ├── fonts/            # Self-hosted Cal Sans & Golos Text (.woff2 + CSS)
│   ├── wp-content/       # Theme, Elementor, Revolution Slider, and media assets
│   ├── wp-includes/      # Required WordPress frontend runtime scripts
│   └── wp-json/          # Static JSON payloads for Revolution Slider slides 2 & 4
├── server.mjs            # Local preview server (mirrors vercel.json rewrites)
├── vercel.json           # Vercel routing, RevSlider slide rewrite, and immutable asset caching
├── package.json          # Local dev/start scripts
└── .gitignore
```

## Run Locally

```bash
npm start
# Opens at http://127.0.0.1:3000/
```

## Deploy to GitHub & Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial clean static build of esaconsultant.com"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. **Deploy on Vercel**:
   - Import the GitHub repository in Vercel.
   - Framework Preset: **Other** (static).
   - `vercel.json` automatically configures `outputDirectory: "public"`, `cleanUrls`, `trailingSlash`, Revolution Slider slide JSON rewrites, and long-lived asset caching.
   - Click **Deploy**.

## Archived Files

Old/unused WordPress fragments (`elementor-hf`, `lexus-breadcrumb`), demo/test/duplicate pages (`sample-page*`, `hello-world*`, `test`, `icons`, `coming-soon`, `shop*`), auto-generated archives (`2025`, `2026`, `author`, `tag`, `category`, `virtual-tour`), pre-refresh `index.orig.html` backups, and unreferenced assets were moved outside this repo to `../esaconsultant-archive/`.
