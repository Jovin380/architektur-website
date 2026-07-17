/* Sinke Planung — Interaktion
   Bewusst schlank & ohne Abhängigkeiten (Ladezeit = SEO). */
(function () {
  "use strict";

  /* ---- Jahr im Footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Header: Zustand beim Scrollen ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile-Navigation ---- */
  var toggle = document.querySelector(".nav__toggle");
  var panel = document.querySelector(".nav__panel");
  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---- Scroll-Reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveal = document.querySelectorAll(".reveal");
  if (reveal.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---- Projektfilter ---- */
  var filters = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project[data-cat]");
  if (filters.length && projects.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        projects.forEach(function (p) {
          var show = cat === "alle" || (p.getAttribute("data-cat") || "").split(" ").indexOf(cat) > -1;
          p.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---- Lightbox für Galerien ---- */
  var zoomables = document.querySelectorAll("[data-zoom]");
  if (zoomables.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button class="lightbox__close" aria-label="Schließen">&times;</button><img alt="">';
    document.body.appendChild(box);
    var boxImg = box.querySelector("img");
    var close = function () { box.classList.remove("is-open"); document.body.classList.remove("nav-open"); };
    zoomables.forEach(function (img) {
      img.addEventListener("click", function () {
        boxImg.src = img.getAttribute("src");
        boxImg.alt = img.getAttribute("alt") || "";
        box.classList.add("is-open");
        document.body.classList.add("nav-open");
      });
    });
    box.addEventListener("click", function (e) { if (e.target !== boxImg) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
})();
