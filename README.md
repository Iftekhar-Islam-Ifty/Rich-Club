# RICH Club Website

Plain HTML + CSS + vanilla JS. No build step. Open `index.html` in a browser.

- `css/variables.css` : colours, fonts, spacing (edit the look here)
- `css/base.css` : reset, typography, buttons, helpers
- `css/sections.css` : per-section styles (added phase by phase)
- `js/content.js` : ALL text, images and links (edit content here) - Phase 2
- `js/render.js` : builds sections from content.js - Phase 2
- `js/animations.js` : scroll reveal and counters - Phase 7
- `assets/images/` : put logo, project photos and press clippings here

## Images (Phase 8.2)

1. Put your photos in `assets/images/` using the file names listed in `js/content.js`.
2. Optimize them (smaller files = faster site):

       pip install Pillow
       python tools/optimize-images.py --update-content

   This creates `.webp` copies, resizes huge photos, and points `js/content.js` to them.
   Add `--delete-originals` to remove the big JPG/PNG files afterwards.
3. `logo.png`, `qr.png` and `og-cover.jpg` (1200x630, for social sharing) stay as they are.
4. Before deploying, replace `YOUR-DOMAIN.com` in `index.html` with the real domain.
