// sneha subramanian — ux research + strategy
// vanilla JS: mobile nav drawer, case-study lightbox, book cover fallback

(function () {
  "use strict";

  // ── footer year ──────────────────────────────────────────────────
  var yearEl = document.getElementById("footYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── mobile nav drawer ────────────────────────────────────────────
  var burger = document.getElementById("navBurger");
  var drawer = document.getElementById("navDrawer");
  if (burger && drawer) {
    var closeDrawer = function () {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      drawer.classList.remove("open");
    };
    burger.addEventListener("click", function () {
      var open = !burger.classList.contains("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      drawer.classList.toggle("open", open);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }

  // ── book cover fallback ──────────────────────────────────────────
  // Reveal the real cover once it's actually loaded; broken/missing
  // images just leave the typographic fallback tile showing.
  document.querySelectorAll(".book-cover-img").forEach(function (img) {
    if (img.complete && img.naturalWidth > 1) {
      img.closest(".book-cover").classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        if (img.naturalWidth > 1) img.closest(".book-cover").classList.add("loaded");
      });
    }
  });

  // ── case-study visual lightbox ───────────────────────────────────
  var lightbox = document.getElementById("ccLightbox");
  var lightboxFig = document.getElementById("ccLightboxFig");
  var lightboxClose = document.getElementById("ccLightboxClose");

  function openLightbox(vizEl) {
    lightboxFig.innerHTML = "";
    lightboxFig.appendChild(vizEl.cloneNode(true));
    lightbox.hidden = false;
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxFig.innerHTML = "";
  }

  document.querySelectorAll(".cc-fig").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var viz = btn.querySelector(".viz");
      if (viz) openLightbox(viz);
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", closeLightbox);
    lightboxFig.addEventListener("click", function (e) { e.stopPropagation(); });
    lightboxClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }
})();
