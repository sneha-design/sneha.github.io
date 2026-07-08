(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  // ── mobile nav drawer ──────────────────────────────────────────────
  var burger = document.getElementById("nav-burger");
  var drawer = document.getElementById("nav-drawer");
  var logo = document.getElementById("nav-logo");

  function closeDrawer() {
    burger.classList.remove("open");
    drawer.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", function () {
    var open = drawer.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });
  logo.addEventListener("click", closeDrawer);

  // ── book cover fade-in (fallback tile shows until the real cover loads) ─
  document.querySelectorAll(".book-cover-img").forEach(function (img) {
    function reveal() {
      if (img.naturalWidth > 1) img.closest(".book-cover").classList.add("loaded");
    }
    if (img.complete) reveal();
    img.addEventListener("load", reveal);
  });

  // ── case-study visual lightbox ─────────────────────────────────────
  var lightbox = document.getElementById("cc-lightbox");
  var lightboxFig = document.getElementById("cc-lightbox-fig");
  var lightboxClose = document.getElementById("cc-lightbox-close");

  function openLightbox(viz) {
    lightboxFig.innerHTML = "";
    lightboxFig.appendChild(viz.cloneNode(true));
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

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
