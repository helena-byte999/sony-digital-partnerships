/* ==========================================================================
   Site behaviour: nav, mobile menu, reveals, counters, lightbox.
   Runs after js/events.js so event cards already exist in the DOM.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav background on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    burger.classList.remove("open");
    document.body.classList.remove("no-scroll");
    burger.setAttribute("aria-expanded", "false");
  }

  if (burger && menu) {
    burger.setAttribute("aria-expanded", "false");
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.classList.toggle("no-scroll", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          // Stagger siblings inside the same grid/row for a softer cascade.
          const siblings = Array.from(el.parentElement.children).filter((n) =>
            n.classList.contains("reveal")
          );
          const delay = Math.min(siblings.indexOf(el), 5) * 80;
          setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Stat counters ----------
     Any <b data-count="300"> counts up when scrolled into view.
     data-count="0" (the placeholders) is left alone so the em-dash stays. */
  const counters = document.querySelectorAll("[data-count]");

  function runCount(el) {
    const target = parseFloat(el.dataset.count);
    if (!target || Number.isNaN(target)) return; // placeholder — leave as-is
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          co.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(runCount);
  }

  /* ---------- Reel previews ----------
     The tiles hold short muted loops. They are only fetched and played while
     on screen, and paused the moment they scroll away, so the page never
     downloads six clips at once. */
  const reels = document.querySelectorAll(".reel-vid");

  function playReel(v) {
    if (reduceMotion) return;
    if (v.preload === "none") {
      v.preload = "auto";
      v.load();
    }
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  if (reels.length && "IntersectionObserver" in window) {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playReel(entry.target);
          else entry.target.pause();
        });
      },
      { threshold: 0.35 }
    );
    reels.forEach((v) => ro.observe(v));
  } else {
    reels.forEach(playReel);
  }

  // A hovered tile always plays, even if the observer paused it.
  document.querySelectorAll(".reel").forEach((tile) => {
    const v = tile.querySelector(".reel-vid");
    if (v) tile.addEventListener("mouseenter", () => playReel(v));
  });

  /* ---------- Video lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbVideo = document.getElementById("lbVideo");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  let lastFocused = null;

  function openLightbox(src, caption, isImage) {
    if (!lb || !src) return;
    lastFocused = document.activeElement;
    lbCaption.textContent = caption || "";
    lb.classList.toggle("is-image", Boolean(isImage));

    if (isImage) {
      lbImage.src = src;
    } else {
      lbVideo.src = src;
    }

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    lbClose.focus();

    if (!isImage) {
      const play = lbVideo.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    }
  }

  function closeLightbox() {
    if (!lb || !lb.classList.contains("open")) return;
    lbVideo.pause();
    lbVideo.removeAttribute("src");
    lbVideo.load();
    lbImage.removeAttribute("src");
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-video], [data-image]").forEach((card) => {
    const image = card.dataset.image;
    const open = () =>
      openLightbox(image || card.dataset.video, card.dataset.caption, Boolean(image));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLightbox();
    closeMenu();
  });

  /* ---------- Show placeholder tiles only where no image is set ---------- */
  document.querySelectorAll(".work-media, .brand-media").forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg.includes("url(")) el.classList.add("has-img");
  });

  /* ---------- Hide CV links if the PDF isn't there yet ---------- */
  fetch("assets/pdf/ena_cv.pdf", { method: "HEAD" })
    .then((r) => {
      if (r.ok) return;
      document.querySelectorAll('a[href$="ena_cv.pdf"]').forEach((a) => {
        a.setAttribute("title", "Drop your CV at assets/pdf/ena_cv.pdf");
      });
    })
    .catch(() => {});
})();
