# Leancare Health Website

Static multipage website for Leancare Health, prepared for GitHub Pages deployment.

## Local Check

```bash
npm test
```

The site is plain HTML, CSS, and JavaScript, so it can be opened locally from `index.html` or served by any static host.

## GitHub Pages Deployment

This repository includes `.github/workflows/pages.yml`, which deploys the site to GitHub Pages when changes are pushed to `main`.

Before the first deployment, open the repository on GitHub and set:

1. `Settings` -> `Pages`
2. `Build and deployment` -> `Source` -> `GitHub Actions`

Then push the repository:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

The workflow will run `npm test`, package the static files, and publish the Pages deployment.
