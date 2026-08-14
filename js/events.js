/* ==========================================================================
   EVENTS & DJ — edit this file only.
   --------------------------------------------------------------------------
   The video wall is generated from the REELS array below. Add, remove or
   reorder entries and the page updates. Nothing else to touch.

   Field guide
   -----------
   title    (required) name of the show or set
   series   small red label top-left of the tile — "WRLD Tour", "Set"...
   meta     one line under the title — venue, city, date
   duration shown bottom-right, e.g. "0:59"
   preview  short muted loop that plays in the tile (assets/video/preview-*.mp4)
   video    the full clip, opened with sound when the tile is clicked
   caption  line shown under the video in the lightbox
   ========================================================================== */

const REELS = [
  {
    title: "BOIL3RWRLD",
    series: "WRLD Tour",
    meta: "Headline show · Abuja · Aug 2025",
    duration: "0:42",
    preview: "assets/video/preview-10.mp4",
    ratio: "9/16",
    poster: "assets/images/posters/p10.jpg",
    video: "assets/video/v10.mp4",
    caption:
      "BOIL3RWRLD — my second headlining show. Stage production, sound and design were mine end to end, built to give Abuja the underground room it didn't have."
  },
  {
    title: "Farabale",
    series: "WRLD Tour",
    meta: "Vol. 1 · Abuja · 22 December 2024",
    duration: "0:16",
    preview: "assets/video/preview-6.mp4",
    ratio: "1/1",
    poster: "assets/images/posters/p6.jpg",
    video: "assets/video/v6.mp4",
    caption:
      "Farabale — it means calm down. A night for the genres a typical Abuja party never reaches for: alté, afro house, pop, 2000s. Somewhere to wind down, find the community, and a stage for upcoming DJs to grow on."
  },
  {
    title: "3N4 &amp; FRI3NDS",
    series: "WRLD Tour",
    meta: "The room · Abuja · 8 March 2025",
    duration: "0:59",
    preview: "assets/video/preview-9.mp4",
    ratio: "9/16",
    poster: "assets/images/posters/p9.jpg",
    video: "assets/video/v9.mp4",
    caption:
      "3N4 & FRI3NDS — a night built to show what I actually am: DJ, producer, event creative. Talent in one room, talking about what they're building, then dancing to it."
  },
  {
    title: "Farabale",
    series: "WRLD Tour",
    meta: "Vol. 2 recap · Abuja",
    duration: "0:41",
    preview: "assets/video/preview-7.mp4",
    ratio: "16/9",
    poster: "assets/images/posters/p7.jpg",
    video: "assets/video/v7.mp4",
    caption: "Farabale Vol. 2 — the second edition, same idea: slow it down, play what nobody else is playing."
  },
  {
    title: "Tempo",
    series: "Collab",
    meta: "Afrohouse every Friday · Abuja",
    duration: "0:35",
    preview: "assets/video/preview-tempo.mp4",
    ratio: "9/16",
    poster: "assets/images/posters/tempo.jpg",
    video: "assets/video/tempo.mp4",
    caption:
      "Tempo — a weekly afrohouse night in Abuja. I worked with the founder to build a safe space and a community for the afrohouse ravers in the city. This was the first one."
  },
  {
    title: "3N4 &amp; FRI3NDS",
    series: "WRLD Tour",
    meta: "Recap · Abuja · 8 March 2025",
    duration: "0:12",
    preview: "assets/video/preview-8.mp4",
    ratio: "9/16",
    poster: "assets/images/posters/p8.jpg",
    video: "assets/video/v8.mp4",
    caption: "3N4 & FRI3NDS — the short recap."
  },
  {
    title: "Runway, Rhythms &amp; Tails",
    series: "WRLD Tour",
    meta: "Fashion × music · Abuja · 6 September 2024",
    duration: "0:13",
    preview: "assets/video/preview-5.mp4",
    ratio: "1/1",
    poster: "assets/images/posters/p5.jpg",
    video: "assets/video/v5.mp4",
    caption:
      "Runway, Rhythms and Tails — where fashion met music. Built to prove the two pull the same people together, with a line-up as diverse as the room."
  }
];

/* The four shows behind the clips — the story the tiles don't have room for. */
const SHOWS = [
  {
    name: "BOIL3RWRLD",
    date: "August 2025",
    tag: "Headline",
    stats: ["450–500 guests", "Ads planned and run in-house", "Biggest one yet"],
    text:
      "My second headlining show, and the most technical. I ran stage production, sound and design myself to build the kind of raw, close-quarters underground room Abuja didn't have."
  },
  {
    name: "3N4 &amp; FRI3NDS",
    date: "8 March 2025",
    tag: "Showcase",
    stats: ["200 attendees"],
    text:
      "Curated to show who 3N4WRLD is — a creative doing several things at once. A night for networking across talents, where people got to talk about what they're building and still party."
  },
  {
    name: "Farabale",
    date: "22 December 2024",
    tag: "Series",
    stats: ["150 attendees", "Intimate room"],
    text:
      "Farabale means calm down. A party for the genres you wouldn't hear at a typical Abuja night — alté, afro house, pop, 2000s — and a room for the community to wind down in. It also gave upcoming DJs somewhere to grow."
  },
  {
    name: "Runway, Rhythms &amp; Tails",
    date: "6 September 2024",
    tag: "Fashion × music",
    stats: ["120 attendees", "50 tickets sold online", "10k views in 3 days"],
    text:
      "Built where fashion meets music, to show how the two bring people together. A diverse line-up, and a party you dress for."
  },
  {
    name: "Tempo",
    date: "Weekly · Abuja",
    tag: "Collab",
    stats: ["Every Friday", "Afrohouse"],
    text:
      "Tempo is an afrohouse night that runs every Friday in Abuja. I collaborated with its founder on the first edition, building a safe space and a real community for the city's afrohouse ravers."
  }
];

/* Stages played, straight from the DJ portfolio deck. */
const STAGES = [
  "WTF Abuja?",
  "Tyler ICU's Capital Block",
  "OurLand — Alté Fest, Lagos",
  "Street Souk",
  "Capital Block Party",
  "BIC Central",
  "Motion",
  "YOLO",
  "Even in the Day",
  "Day or Not ABJ",
  "Tempo",
  "Group Therapy",
  "Klub Aniko"
];

/* --------------------------------------------------------------------------
   Renderers — no need to edit below this line.
   -------------------------------------------------------------------------- */
(function render() {
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  // Titles may carry intentional entities (&amp;), so they are trusted as authored.
  const raw = (s) => String(s == null ? "" : s);

  const grid = document.getElementById("reelGrid");
  if (grid) {
    grid.innerHTML = REELS.length
      ? REELS.map(
          (r) => `
      <article class="reel reveal" data-video="${esc(r.video)}"
               data-caption="${esc(r.caption || "")}"
               style="aspect-ratio:${esc(r.ratio || "9/16")}"
               tabindex="0" role="button" aria-label="Play clip: ${esc(r.title.replace(/&amp;/g, "&"))}">
        <video class="reel-vid" src="${esc(r.preview)}" ${r.poster ? `poster="${esc(r.poster)}"` : ""}
               muted loop playsinline preload="none"></video>
        <span class="reel-scrim" aria-hidden="true"></span>
        <span class="reel-series">${raw(r.series)}</span>
        <span class="reel-time">${esc(r.duration)}</span>
        <span class="reel-play" aria-hidden="true">&#9654;</span>
        <div class="reel-cap">
          <h3>${raw(r.title)}</h3>
          <span>${raw(r.meta)}</span>
        </div>
      </article>`
        ).join("")
      : '<div class="ev-empty">No clips yet. Add them in <code>js/events.js</code>.</div>';
  }

  const shows = document.getElementById("showGrid");
  if (shows) {
    shows.innerHTML = SHOWS.map(
      (s) => `
      <article class="show-card reveal">
        <div class="work-meta">
          <span class="chip chip-red">${raw(s.tag)}</span>
          <span class="chip">${raw(s.date)}</span>
        </div>
        <h3>${raw(s.name)}</h3>
        <p>${raw(s.text)}</p>
        ${
          s.stats && s.stats.length
            ? `<div class="show-stats">${s.stats
                .map((m) => `<span class="stat-pill">${raw(m)}</span>`)
                .join("")}</div>`
            : ""
        }
      </article>`
    ).join("");
  }

  /* PeerPods deck rail — slides live in assets/images/peerpods/ */
  const rail = document.getElementById("deckRail");
  if (rail) {
    const SLIDES = 21;
    let out = "";
    for (let i = 1; i <= SLIDES; i++) {
      const n = String(i).padStart(2, "0");
      const src = `assets/images/peerpods/slide_${n}.jpg`;
      out += `<button class="deck-slide" data-image="${src}" data-caption="PeerPods — slide ${i} of ${SLIDES}" aria-label="Enlarge slide ${i}">
        <img src="${src}" alt="PeerPods slide ${i}" loading="lazy">
      </button>`;
    }
    rail.innerHTML = out;
  }

  const stages = document.getElementById("stageList");
  if (stages) {
    stages.innerHTML = STAGES.map((s) => `<span class="chip">${raw(s)}</span>`).join("");
  }
})();
