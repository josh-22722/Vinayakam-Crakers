# Vinayakam Cracker — Direct Fireworks Manufacturer

Diwali 2026 direct wholesale booking and estimate generator from Vinayakam Cracker's in-house manufacturing plant in Sivakasi.

---

## 🚀 Deploying to GitHub Pages (Fixing Blank Screen)

If your GitHub Pages site shows a blank white page, it is because GitHub Pages is serving the uncompiled root repository (`/index.html` referencing `/src/main.tsx`) instead of the compiled production build in `dist/`.

Here are the **two easiest ways** to deploy:

### Method 1: Using GitHub Actions (Recommended — Fully Automated)

We have already configured `.github/workflows/deploy.yml` in this repository!

1. Commit and push the changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment workflow"
   git push origin main
   ```
2. Go to your repository on GitHub: `https://github.com/josh-22722/Vinayakam-Crakers`
3. Click on **Settings** (top tab) -> **Pages** (in the left sidebar).
4. Under **Build and deployment** -> **Source**, select **GitHub Actions** from the dropdown (instead of "Deploy from a branch").
5. Go to the **Actions** tab on your repository to watch the automated deployment run. Once complete (in ~1 minute), your site will load properly at:
   `https://josh-22722.github.io/Vinayakam-Crakers/`

---

### Method 2: Deploying via `npm run deploy` (`gh-pages`)

If you prefer deploying from a branch:

1. In your project directory on your computer, run:
   ```bash
   npm run deploy
   ```
2. This runs `vite build` and pushes the `dist/` directory directly to a `gh-pages` branch.
3. In GitHub -> **Settings** -> **Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`
   - Click **Save**.
