# Deploying the RICH Club website

The site is static (HTML, CSS, JS). No build step, no server code.

## Before you deploy
1. All images are in `assets/images/` and optimized (`python tools/optimize-images.py --update-content`).
2. `assets/images/og-cover.jpg` exists (1200x630) for social sharing.
3. Replace `YOUR-DOMAIN.com` with the real domain in: `index.html`, `robots.txt`, `sitemap.xml`.
4. Content (text, links, numbers) is final in `js/content.js`.
5. The `tools/` folder and `README.md` / `DEPLOY.md` are not needed online. Deleting them from the upload is fine.

## Option A: Netlify (free, easiest)
1. Go to app.netlify.com and sign up.
2. Sites > Add new site > Deploy manually. Drag the whole `richclub` folder onto the page.
3. Netlify gives you a `something.netlify.app` link. Open it and test.
4. Domain settings > Add a custom domain, then follow the DNS steps shown there. HTTPS is automatic.
5. To update later: drag the folder again (Deploys > Drag and drop).
The `_headers` file is used by Netlify. The `.htaccess` file is ignored there.

## Option B: cPanel hosting
1. Log in to cPanel > File Manager > `public_html` (or the subdomain's folder).
2. Upload the contents of the `richclub` folder (index.html must sit directly inside `public_html`, not in a sub-folder). Zip > Upload > Extract is the quickest way.
3. Enable "Show Hidden Files" so `.htaccess` is visible after extracting.
4. cPanel > SSL/TLS Status > run AutoSSL for the domain. Wait until the certificate is active before testing HTTPS.
5. The `.htaccess` file forces HTTPS. If the site shows a redirect error before SSL is ready, temporarily remove the first four lines.
The `_headers` file is ignored on cPanel.

## After going live
- Open the site on a phone and a laptop; click every menu link, project card and news clipping.
- Paste the link into Facebook's Sharing Debugger (developers.facebook.com/tools/debug) to check the preview image and title. Click "Scrape Again" if you change the image.
- Submit `https://YOUR-DOMAIN.com/sitemap.xml` in Google Search Console.
- Run the page through PageSpeed Insights (pagespeed.web.dev). Large images are the usual cause of a low score.
