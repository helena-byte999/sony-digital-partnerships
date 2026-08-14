/* ==========================================================================
   TOOLKIT — the tools and platforms, with logos.
   --------------------------------------------------------------------------
   Every tile below is generated from the SKILLS array. Marks are inline SVG
   (simplified, drawn here) so the page stays self-contained — no logo files,
   no external requests.

   Field guide
   -----------
   name   what shows under the mark
   note   the small line under the name — what you actually do with it
   group  filter it belongs to: "design" | "ai" | "dsp"
   color  brand colour, used on hover
   svg    the mark, drawn on a 32×32 grid
   ========================================================================== */

const SKILLS = [
  {
    name: "Spotify",
    note: "Playlist curation",
    group: "dsp",
    color: "#1DB954",
    svg: `<circle cx="16" cy="16" r="15" fill="currentColor"/>
          <path d="M9 12.5c4.6-1.2 9.8-.8 14 1.4M10 17c3.7-1 7.9-.6 11.3 1.2M11 21.2c2.9-.8 6.2-.5 8.9.9"
                stroke="#000" stroke-width="2.1" stroke-linecap="round" fill="none" opacity=".92"/>`
  },
  {
    name: "SoundCloud",
    note: "Sets &amp; mixes",
    group: "dsp",
    color: "#FF5500",
    svg: `<g stroke="currentColor" stroke-width="2.1" stroke-linecap="round">
            <path d="M4 20v-5M8 22v-9M12 22.5v-12"/>
          </g>
          <path d="M16 22.5V9.5c3.2-1.7 7-.2 8.2 3.2 3 .1 4.8 2.3 4.8 4.9 0 2.7-2 4.9-5 4.9H16z"
                fill="currentColor"/>`
  },
  {
    name: "Apple Music",
    note: "Playlist curation",
    group: "dsp",
    color: "#FA2D48",
    svg: `<rect x="1" y="1" width="30" height="30" rx="8" fill="currentColor"/>
          <path d="M21 7.5 13 9.6v9.9c0 1.5-1.2 2.6-2.7 2.6S7.6 21 7.6 19.5s1.2-2.6 2.7-2.6c.5 0 1 .1 1.4.4V11l9.3-2.5z"
                fill="#fff"/>`
  },
  {
    name: "YouTube Music",
    note: "Playlist curation",
    group: "dsp",
    color: "#FF0033",
    svg: `<circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" stroke-width="2.4"/>
          <path d="M13 10.5 22 16l-9 5.5z" fill="currentColor"/>`
  },
  {
    name: "Canva",
    note: "Assets &amp; artwork",
    group: "design",
    color: "#00C4CC",
    svg: `<circle cx="16" cy="16" r="15" fill="currentColor"/>
          <path d="M21 12.4c-.7-1.6-2.3-2.5-4.1-2.2-3 .5-5.3 3.7-5.3 7.2 0 2.9 1.7 4.9 4.2 4.9 2.4 0 4.3-1.5 5.4-3.6"
                stroke="#fff" stroke-width="2.2" stroke-linecap="round" fill="none"/>`
  },
  {
    name: "Microsoft 365",
    note: "Word, Excel, PowerPoint",
    group: "design",
    color: "#F25022",
    svg: `<rect x="2" y="2" width="13" height="13" fill="#F25022"/>
          <rect x="17" y="2" width="13" height="13" fill="#7FBA00"/>
          <rect x="2" y="17" width="13" height="13" fill="#00A4EF"/>
          <rect x="17" y="17" width="13" height="13" fill="#FFB900"/>`
  },
  {
    name: "Google Workspace",
    note: "Docs, Sheets, Slides",
    group: "design",
    color: "#4285F4",
    svg: `<path d="M16 6a10 10 0 1 0 9.4 13.3" fill="none" stroke="#34A853" stroke-width="4"/>
          <path d="M16 6a10 10 0 0 1 7.1 3" fill="none" stroke="#EA4335" stroke-width="4"/>
          <path d="M6.6 20.9A10 10 0 0 1 6 16a10 10 0 0 1 1.2-4.8" fill="none" stroke="#FBBC05" stroke-width="4"/>
          <path d="M16 14.4h10v3.9H16z" fill="#4285F4"/>`
  },
  {
    name: "Claude",
    note: "Drafting &amp; research",
    group: "ai",
    color: "#D97757",
    svg: `<g stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
            <path d="M16 4v10M16 18v10M6 16h10M18 16h8M9 9l7 7M18 18l6 6M23 9l-7 7M9.5 23l6-6"/>
          </g>`
  },
  {
    name: "ChatGPT",
    note: "Drafting &amp; research",
    group: "ai",
    color: "#10A37F",
    svg: `<path d="M16 3.5 27 10v12l-11 6.5L5 22V10z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/>
          <path d="M16 3.5V16l11-6M16 16 5 10M16 16v12.5M16 16l11 6M16 16 5 22"
                fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>`
  }
];

/* --------------------------------------------------------------------------
   Renderer + interactions — no need to edit below this line.
   -------------------------------------------------------------------------- */
(function skills() {
  const track = document.getElementById("skillTrack");
  if (!track) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tile = (s) => `
    <article class="skill" data-group="${s.group}" style="--brand:${s.color}" tabindex="0">
      <span class="skill-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="34" height="34">${s.svg}</svg>
      </span>
      <b>${s.name}</b>
      <span class="skill-note">${s.note}</span>
    </article>`;

  /* The rail scrolls forever, so the list is laid down twice and the
     animation travels exactly one copy's width. */
  function paint(group) {
    const list = group === "all" ? SKILLS : SKILLS.filter((s) => s.group === group);
    const once = list.map(tile).join("");
    track.innerHTML = once + once;
    // Fewer tiles means a shorter loop, so scale the duration to keep the pace even.
    track.style.setProperty("--loop", `${Math.max(list.length * 4.5, 12)}s`);
    wireTilt();
  }

  function wireTilt() {
    if (reduceMotion) return;
    track.querySelectorAll(".skill").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  paint("all");

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("on", b === btn));
      paint(btn.dataset.filter);
    });
  });
})();
