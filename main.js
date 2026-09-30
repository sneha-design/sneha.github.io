// main.js — mobile nav drawer + case-study visual lightbox

(() => {
  // ── mobile nav drawer
  const burger = document.querySelector(".nav-burger");
  const drawer = document.getElementById("nav-drawer");

  const setDrawer = (open) => {
    burger.classList.toggle("open", open);
    drawer.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () => setDrawer(!drawer.classList.contains("open")));
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));
  document.querySelector(".nav-mark").addEventListener("click", () => setDrawer(false));

  // ── lightbox: clicking a case-study visual opens it full size
  const lightbox = document.querySelector(".cc-lightbox");
  const stage = lightbox.querySelector(".cc-lightbox-fig");
  const closeBtn = lightbox.querySelector(".cc-lightbox-close");
  let opener = null;

  const openLightbox = (fig) => {
    opener = fig;
    stage.replaceChildren(fig.querySelector(".viz").cloneNode(true));
    lightbox.hidden = false;
    closeBtn.focus();
  };

  const closeLightbox = () => {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    stage.replaceChildren();
    if (opener) opener.focus();
    opener = null;
  };

  document.querySelectorAll(".cc-fig").forEach((fig) =>
    fig.addEventListener("click", () => openLightbox(fig))
  );
  lightbox.addEventListener("click", (e) => {
    if (!stage.contains(e.target)) closeLightbox();
  });
  closeBtn.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    setDrawer(false);
  });

  // ── footer year
  document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
