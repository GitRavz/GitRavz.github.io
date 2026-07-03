# Lhienhiel Louise Ravelo — Portfolio

Personal portfolio site. Static HTML/CSS/JS — no build step, deploys straight to GitHub Pages.

## Structure
```
index.html          Single-page layout
css/tokens.css      Design tokens (colors, type, spacing)
css/base.css        Reset + typography defaults
css/layout.css      Container, nav, hero, grids
css/components.css  Buttons, cards, tags, timeline, badges
js/main.js          Mobile nav, scroll reveal, footer year
assets/             Images (avatar, og-image) — optional
```

## Run locally
Just open `index.html` in a browser, or serve it:
```
python -m http.server 8000
```

## Deploy to GitHub Pages
1. Create a repo named `<your-username>.github.io` (or any repo).
2. Push these files to the `main` branch.
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/GitRavz/<repo>.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: `main` / root → Save.
4. Live at `https://GitRavz.github.io/<repo>/` within a minute.
   (If the repo is named `GitRavz.github.io`, it's served at `https://GitRavz.github.io/`.)

## To personalize later
- Replace the `LR` monogram avatar with a photo: add `assets/avatar.jpg`, swap the `.avatar` div in `index.html` for an `<img>`.
- Update the GitHub link (currently `https://github.com/`) with your real profile.
- Add a real CV download button + `assets/og-image.jpg` for nicer social sharing.
