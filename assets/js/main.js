/* Sinke Planung — Interaktion: Menü, Projekt-Bühne, Lightbox. Ohne Abhängigkeiten. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Jahr im Footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Vollbild-Menü ---- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---- Projekt-Bühne (Startseite) ---- */
  var stage = document.querySelector("[data-stage]");
  if (stage) {
    var slides = stage.querySelectorAll("[data-slide]");
    var dots = stage.querySelectorAll("[data-goto]");
    var current = 0, timer = null, paused = false;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === current;
        s.classList.toggle("is-active", on);
        if (on) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true");
        var img = s.querySelector("img");
        if (on && img && img.loading === "lazy") img.loading = "eager";
      });
      dots.forEach(function (d, k) { if (k === current) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    };
    var next = function () { show(current + 1); };
    var start = function () { if (!reduce && !timer) timer = setInterval(function () { if (!paused) next(); }, 6500); };
    var restart = function () { clearInterval(timer); timer = null; start(); };
    dots.forEach(function (d) { d.addEventListener("click", function () { show(+d.getAttribute("data-goto")); restart(); }); });
    var prevBtn = stage.querySelector("[data-prev]"), nextBtn = stage.querySelector("[data-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    stage.addEventListener("mouseenter", function () { paused = true; });
    stage.addEventListener("mouseleave", function () { paused = false; });
    stage.addEventListener("focusin", function () { paused = true; });
    stage.addEventListener("focusout", function () { paused = false; });
    document.addEventListener("visibilitychange", function () { paused = document.hidden; });
    /* Wischen auf dem Handy */
    var x0 = null;
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); restart(); }
    }, { passive: true });
    start();
  }

  /* ---- Lightbox für Projektbilder ---- */
  var zoomables = document.querySelectorAll("[data-zoom]");
  if (zoomables.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Bild in voller Größe");
    box.innerHTML = '<button class="lightbox__close" type="button" aria-label="Schließen">&times;</button><img alt="">';
    document.body.appendChild(box);
    var boxImg = box.querySelector("img");
    var close = function () { box.classList.remove("is-open"); document.body.classList.remove("menu-open"); };
    zoomables.forEach(function (img) {
      var open = function () {
        boxImg.src = img.getAttribute("src"); boxImg.alt = img.getAttribute("alt") || "";
        box.classList.add("is-open"); document.body.classList.add("menu-open");
        box.querySelector(".lightbox__close").focus();
      };
      img.setAttribute("tabindex", "0"); img.setAttribute("role", "button");
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    box.addEventListener("click", function (e) { if (e.target !== boxImg) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
})();
