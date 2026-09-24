/* ==========================================================
   RICH Club - Renderer
   Reads window.RICH_CONTENT and fills every [data-section].
   Layout/markup lives here; text and images live in content.js.
   Interactions (menu, filter, lightbox, counters) come in
   later phases and hook onto the data-* attributes below.
   ========================================================== */
(function () {
  "use strict";

  const C = window.RICH_CONTENT;
  if (!C) { console.error("RICH_CONTENT is missing. Load js/content.js first."); return; }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const paras = (arr) => arr.map((t) => `<p>${esc(t)}</p>`).join("");
  const img = (src, alt, extra = "") =>
    `<img src="${esc(src)}" alt="${esc(alt || "")}" loading="lazy" decoding="async" ${extra}>`;
  const head = (title, intro) =>
    `<div class="section__head reveal"><h2>${esc(title)}</h2>${intro ? `<p>${esc(intro)}</p>` : ""}</div>`;

  /* ---------- section templates ---------- */
  const T = {
    navbar: () => `
      <nav class="nav container" aria-label="Main">
        <a class="nav__brand" href="#home" aria-label="${esc(C.site.name)} home">
          ${img(C.site.logo, "", 'width="36" height="36"')}
          <span>${esc(C.site.name)}</span>
        </a>
        <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>
          <span class="sr-only">Menu</span><span class="nav__bars" aria-hidden="true"></span>
        </button>
        <ul class="nav__menu" id="nav-menu" data-nav-menu>
          ${C.nav.map((n) => `<li><a href="${esc(n.href)}" data-nav-link>${esc(n.label)}</a></li>`).join("")}
          <li><a class="btn" href="${esc(C.navCta.href)}">${esc(C.navCta.label)}</a></li>
        </ul>
      </nav>`,

    hero: () => `
      <div class="hero__media">${img(C.hero.image, C.hero.imageAlt, 'fetchpriority="high" loading="eager"')}</div>
      <div class="hero__inner container">
        <p class="hero__since">${esc(C.hero.since)}</p>
        <h1 class="hero__title" data-hero-title>${esc(C.hero.title)}</h1>
        <p class="hero__text">${esc(C.hero.text)}</p>
        <div class="hero__actions">
          <a class="btn" href="${esc(C.hero.primaryCta.href)}">${esc(C.hero.primaryCta.label)}</a>
          <a class="btn btn--ghost" href="${esc(C.hero.secondaryCta.href)}">${esc(C.hero.secondaryCta.label)}</a>
        </div>
      </div>`,

    about: () => `
      <div class="container about">
        <div class="about__text reveal">
          <h2>${esc(C.about.title)}</h2>
          ${paras(C.about.text)}
        </div>
        <div class="about__media reveal">${img(C.about.image, C.about.imageAlt)}</div>
      </div>`,

    vision: () => `
      <div class="container">
        ${head(C.vision.title)}
        <div class="vision__grid">
          ${C.vision.items.map((v) => `
            <article class="card vision__card reveal">
              <h3>${esc(v.title)}</h3>
              <p>${esc(v.text)}</p>
            </article>`).join("")}
        </div>
      </div>`,

    impact: () => `
      <div class="container">
        ${head(C.impact.title)}
        <ul class="impact__grid">
          ${C.impact.stats.map((s) => `
            <li class="impact__item reveal">
              <span class="impact__value"><span data-count="${Number(s.value)}">${Number(s.value)}</span>${esc(s.suffix || "")}</span>
              <span class="impact__label">${esc(s.label)}</span>
            </li>`).join("")}
        </ul>
      </div>`,

    projects: () => `
      <div class="container">
        ${head(C.projects.title, C.projects.intro)}
        <div class="filters reveal" role="group" aria-label="Filter projects" data-filters>
          ${C.projects.categories.map((c, i) =>
            `<button class="filters__btn${i === 0 ? " is-active" : ""}" type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`
          ).join("")}
        </div>
        <div class="projects__grid" data-projects>
          ${C.projects.items.map((p, i) => `
            <article class="card project reveal" data-category="${esc(p.category)}" data-index="${i}">
              <div class="project__media">${img(p.image, p.title)}</div>
              <div class="project__body">
                <span class="project__tag">${esc(p.category)}</span>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.text)}</p>
              </div>
            </article>`).join("")}
        </div>
      </div>`,

    founder: () => `
      <div class="container founder">
        <div class="founder__media reveal">${img(C.founder.image, C.founder.imageAlt)}</div>
        <div class="founder__text reveal">
          <h2>${esc(C.founder.title)}</h2>
          <h3 class="founder__name">${esc(C.founder.name)}</h3>
          <p class="founder__role">${esc(C.founder.role)}</p>
          ${paras(C.founder.text)}
        </div>
      </div>`,

    membership: () => `
      <div class="container membership reveal">
        <div>
          <h2>${esc(C.membership.title)}</h2>
          <p>${esc(C.membership.text)}</p>
        </div>
        <div class="membership__box">
          <p class="membership__price"><strong>${esc(C.membership.price)}</strong> <span>${esc(C.membership.period)}</span></p>
          <a class="btn" href="${esc(C.membership.cta.href)}">${esc(C.membership.cta.label)}</a>
        </div>
      </div>`,

    news: () => `
      <div class="container">
        ${head(C.news.title)}
        <div class="news__grid" data-news>
          ${C.news.items.map((n, i) => `
            <figure class="news__item reveal" data-index="${i}">
              <button class="news__open" type="button" data-lightbox="${esc(n.image)}" aria-label="View clipping: ${esc(n.paper)}">
                ${img(n.image, `${n.paper}: ${n.headline}`)}
              </button>
              <figcaption><strong>${esc(n.paper)}</strong><span>${esc(n.headline)}</span></figcaption>
            </figure>`).join("")}
        </div>
      </div>`,

    contact: () => `
      <div class="container contact">
        <div class="contact__text reveal">
          <h2>${esc(C.contact.title)}</h2>
          <p>${esc(C.contact.text)}</p>
          <ul class="contact__list">
            <li><a href="${esc(C.contact.phoneHref)}">${esc(C.contact.phone)}</a></li>
            <li><a href="mailto:${esc(C.contact.email)}">${esc(C.contact.email)}</a></li>
          </ul>
          <ul class="social">
            ${C.social.map((s) => `<li><a class="btn btn--ghost" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join("")}
          </ul>
        </div>
        <div class="contact__qr reveal">${img(C.contact.qrImage, C.contact.qrAlt, 'width="180" height="180"')}</div>
      </div>`,

    footer: () => `
      <div class="container footer">
        <p class="footer__brand">${esc(C.site.name)} - ${esc(C.site.tagline)}</p>
        <p class="footer__note">${esc(C.footer.note)}</p>
        <p class="footer__copy">&copy; ${new Date().getFullYear()} ${esc(C.site.fullName)}</p>
      </div>`
  };

  /* ---------- render ---------- */
  document.querySelectorAll("[data-section]").forEach((el) => {
    const build = T[el.dataset.section];
    if (build) el.innerHTML = build();
  });

  /* Missing image? Keep the layout, show a neutral tan block instead. */
  document.querySelectorAll("img").forEach((im) => {
    im.addEventListener("error", () => im.classList.add("img-missing"), { once: true });
  });

  document.dispatchEvent(new CustomEvent("rich:rendered"));
})();
