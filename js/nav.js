/* ==========================================================
   RICH Club - Navbar behaviour (Phase 3)
   Sticky blur on scroll, mobile menu, active section highlight.
   ========================================================== */
(function () {
  "use strict";

  const header = document.getElementById("navbar");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!header || !toggle || !menu) return;

  /* Blur background after the user scrolls a little */
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  if (window.matchMedia) {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => setMenu(false);
    if (desktop.addEventListener) desktop.addEventListener("change", closeOnDesktop);
    else if (desktop.addListener) desktop.addListener(closeOnDesktop);   // older Safari
  }

  /* Highlight the link of the section currently in view */
  const links = [...document.querySelectorAll("[data-nav-link]")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        const link = byId.get(entry.target.id);
        if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "location"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }
})();
