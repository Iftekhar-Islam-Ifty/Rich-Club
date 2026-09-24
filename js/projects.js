/* ==========================================================
   RICH Club - Project category filter (Phase 5.2)
   Uses data-category on each card and data-filter on buttons.
   ========================================================== */
(function () {
  "use strict";

  const bar = document.querySelector("[data-filters]");
  const grid = document.querySelector("[data-projects]");
  if (!bar || !grid) return;

  const cards = [...grid.querySelectorAll(".project")];

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    const filter = btn.dataset.filter;

    bar.querySelectorAll("[data-filter]").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    cards.forEach((card) => {
      const show = filter === "All" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) card.classList.add("is-visible", "is-entering");
      else card.classList.remove("is-entering");
    });
  });

  grid.addEventListener("animationend", (e) => e.target.classList.remove("is-entering"));
})();

/* ==========================================================
   Phase 5.3: Project detail popup (native <dialog>)
   Opens from a card, browse with Previous/Next or arrow keys.
   Optional `details` text in content.js overrides the short text.
   ========================================================== */
(function () {
  "use strict";

  const grid = document.querySelector("[data-projects]");
  const C = window.RICH_CONTENT;
  if (!grid || !C || typeof HTMLDialogElement === "undefined") return;

  const items = C.projects.items;
  const cards = [...grid.querySelectorAll(".project")];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

  /* Build the dialog once */
  const dlg = document.createElement("dialog");
  dlg.className = "modal";
  dlg.setAttribute("aria-labelledby", "modal-title");
  dlg.innerHTML = `
    <button class="modal__close" type="button" data-close aria-label="Close">&times;</button>
    <div class="modal__media"><img alt="" decoding="async"></div>
    <div class="modal__body">
      <span class="project__tag" data-m-tag></span>
      <h3 id="modal-title" data-m-title></h3>
      <p data-m-text></p>
      <div class="modal__nav">
        <button class="btn btn--ghost" type="button" data-prev>Previous</button>
        <button class="btn btn--ghost" type="button" data-next>Next</button>
      </div>
    </div>`;
  document.body.appendChild(dlg);

  const $ = (sel) => dlg.querySelector(sel);
  const modalImg = $(".modal__media img");
  modalImg.addEventListener("error", () => modalImg.classList.add("img-missing"));

  let current = null;
  const visible = () => cards.filter((c) => !c.hidden);

  function show(card) {
    const p = items[Number(card.dataset.index)];
    if (!p) return;
    current = card;
    modalImg.classList.remove("img-missing");
    modalImg.src = p.image;
    modalImg.alt = p.title;
    $("[data-m-tag]").textContent = p.category;
    $("[data-m-title]").textContent = p.title;
    $("[data-m-text]").textContent = p.details || p.text;
    const many = visible().length > 1;
    $("[data-prev]").hidden = !many;
    $("[data-next]").hidden = !many;
  }

  function step(dir) {
    const list = visible();
    if (list.length < 2 || !current) return;
    const i = list.indexOf(current);
    show(list[(i + dir + list.length) % list.length]);
  }

  function open(card) {
    show(card);
    if (!dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add("modal-open");
    }
  }

  /* Make cards keyboard and click friendly */
  cards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.addEventListener("click", () => open(card));
    card.addEventListener("keydown", (e) => {
      if (e.target !== card) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(card); }
    });
  });

  /* Dialog controls */
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();   // backdrop or X
    else if (e.target.closest("[data-prev]")) step(-1);
    else if (e.target.closest("[data-next]")) step(1);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  dlg.addEventListener("close", () => document.documentElement.classList.remove("modal-open"));
})();
