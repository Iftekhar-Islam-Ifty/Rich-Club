/* ==========================================================
   RICH Club - Animations
   - Hero title letter reveal (Phase 3)
   - Scroll reveal for every .reveal element
   Phase 7 will add the number counters.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Hero title: split into letters ---------- */
  const title = document.querySelector("[data-hero-title]");
  if (title) {
    const text = title.textContent.trim();
    title.setAttribute("aria-label", text);
    title.innerHTML = [...text].map((ch, i) =>
      ch === " "
        ? " "
        : `<span class="hero__char" aria-hidden="true" style="--i:${i}">${ch}</span>`
    ).join("");
  }

  /* ---------- Scroll reveal ---------- */
  const items = [...document.querySelectorAll(".reveal")];
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  /* Small stagger for items that share a parent (cards in a row) */
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const i = siblings.indexOf(el);
    if (siblings.length > 1) {
      el.style.transitionDelay = `${Math.min(i, 4) * 90}ms`;
      /* Remove the delay afterwards so hover effects stay instant */
      el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  items.forEach((el) => io.observe(el));
})();

/* ==========================================================
   Number counters: count up once when scrolled into view.
   The final number is already in the HTML, so without JS
   (or with reduced motion) the correct value is shown.
   ========================================================== */
(function () {
  "use strict";

  const counters = [...document.querySelectorAll("[data-count]")];
  if (!counters.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const DURATION = 1400;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const run = (el) => {
    const end = Number(el.dataset.count);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      el.textContent = Math.round(end * easeOut(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => { el.textContent = "0"; io.observe(el); });
})();
