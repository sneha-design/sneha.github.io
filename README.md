# sneha subramanian — portfolio site

Production build of the Claude Design prototype in `../project/`.
Plain static HTML/CSS with a small script: no build step and no dependencies.

- `index.html`: all page content
- `styles.css`: the tangerine + teal design tokens and layout
- `main.js`: mobile nav drawer, case-study lightbox, footer year
- `assets/`: WebP images resized from `../project/assets` (~0.75 MB total, down from ~18 MB)

Preview locally with `python3 -m http.server` from this folder. To deploy, put the folder on any static host (GitHub Pages, Netlify, etc.).
