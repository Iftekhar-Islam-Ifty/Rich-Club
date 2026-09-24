/* ==========================================================
   RICH Club - News lightbox (Phase 6.3)
   Click a clipping to view it large. Click the image to zoom.
   Previous/Next buttons or arrow keys browse all clippings.
   ========================================================== */
(function () {
  "use strict";

  const wrap = document.querySelector("[data-news]");
  const C = window.RICH_CONTENT;
  if (!wrap || !C || typeof HTMLDialogElement === "undefined") return;

  const items = C.news.items;
  let index = 0;

  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Press clipping");
  dlg.innerHTML = `
    <button class="modal__close" type="button" data-close aria-label="Close">&times;</button>
    <div class="lightbox__stage"><img alt="" decoding="async"></div>
    <div class="lightbox__bar">
      <p data-l-cap></p>
      <div class="lightbox__nav">
        <button class="btn btn--ghost" type="button" data-prev>Previous</button>
        <button class="btn btn--ghost" type="button" data-next>Next</button>
      </div>
    </div>`;
  document.body.appendChild(dlg);

  const img = dlg.querySelector(".lightbox__stage img");
  const cap = dlg.querySelector("[data-l-cap]");
  img.addEventListener("error", () => img.classList.add("img-missing"));
  img.addEventListener("click", () => img.classList.toggle("is-zoomed"));

  function show(i) {
    index = (i + items.length) % items.length;
    const n = items[index];
    img.classList.remove("is-zoomed", "img-missing");
    img.src = n.image;
    img.alt = `${n.paper}: ${n.headline}`;
    cap.textContent = `${n.paper}: ${n.headline}`;
  }

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (!btn) return;
    show(Number(btn.closest(".news__item").dataset.index));
    dlg.showModal();
    document.documentElement.classList.add("modal-open");
  });

  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest("[data-close]")) dlg.close();
    else if (e.target.closest("[data-prev]")) show(index - 1);
    else if (e.target.closest("[data-next]")) show(index + 1);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  dlg.addEventListener("close", () => document.documentElement.classList.remove("modal-open"));
})();
