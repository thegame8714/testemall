/* ==========================================================================
   Test EM All — app logic (no dependencies)
   ========================================================================== */
(() => {
  const CFG = window.EMQ_CONFIG;
  const Q = window.QUIZ;
  const PILLARS = Object.keys(Q.pillars);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? Math.min(ms, 150) : ms));
  const pv = (p) => `--c:${Q.pillars[p].color};--ci:${Q.pillars[p].ink}`;

  const state = { idx: 0, answers: [], done: {}, avatar: "m", phase: "intro", awaitingNext: false, lead: null };

  /* ---------- config into DOM ---------- */
  $$("[data-cfg]").forEach((n) => (n.textContent = CFG[n.dataset.cfg] || ""));
  $$("[data-cfg-href]").forEach((n) => (n.href = CFG[n.dataset.cfgHref] || "#"));

  /* ---------- character: a manager who gets equipped as they play ---------- */
  let uid = 0;
  function person(variant = state.avatar) {
    const f = variant === "f";
    const hairColor = f ? "#4A2C1D" : "#2B2140";
    const backHair = f ? `<path d="M100 30 q-27 0 -27 30 l-3 27 q30 10 60 0 l-3 -27 q0 -30 -27 -30 z" fill="${hairColor}"/>` : "";
    const hair = f
      ? `<path d="M79 57 q-2 -27 21 -27 q23 0 21 27 q-5 -12 -15 -16 q-9 11 -27 16 z" fill="${hairColor}"/>
         <circle cx="80" cy="65" r="1.9" fill="#E9B949"/><circle cx="120" cy="65" r="1.9" fill="#E9B949"/>`
      : `<path d="M79 54 q-2 -25 21 -26 q23 0 22 23 q-6 -10 -19 -11 q-8 8 -24 14 z" fill="${hairColor}"/>`;
    const g = "pg" + ++uid;
    const w = document.createElement("div");
    w.innerHTML = `
    <svg class="person" viewBox="0 0 200 220" aria-hidden="true">
      <defs>
        <radialGradient id="${g}o" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#DDF6FB"/><stop offset="1" stop-color="#0891B2"/></radialGradient>
      </defs>
      <ellipse class="p-shadow" cx="100" cy="212" rx="46" ry="5"/>

      <g class="gear gear-leadership-2">
        <line x1="24" y1="146" x2="24" y2="211" stroke="#6B5544" stroke-width="3" stroke-linecap="round"/>
        <path class="flag" d="M25 147 L54 156 L25 165 Z" fill="#0F7A3E"/>
        <circle cx="34" cy="156" r="2.6" fill="#fff"/>
      </g>

      <g class="gear gear-coaching-2"><g class="mentee">
        <path d="M159 178 h20 l-1.5 29 h-7 l-1.5 -19 l-1.5 19 h-7 z" fill="#3B3F5C"/>
        <rect x="155" y="205" width="12" height="5" rx="2.5" fill="#0F2A1E"/><rect x="171" y="205" width="12" height="5" rx="2.5" fill="#0F2A1E"/>
        <path d="M159 158 q-4 12 -3 20" stroke="#FF7A2B" stroke-width="7" stroke-linecap="round" fill="none"/>
        <circle cx="156" cy="180" r="3.6" fill="#C68A63"/>
        <path d="M156 152 q13 -6 26 0 l3 28 h-32 z" fill="#FF7A2B"/>
        <path class="wave-arm" d="M181 156 q9 -7 8 -20" stroke="#FF7A2B" stroke-width="7" stroke-linecap="round" fill="none"/>
        <circle class="wave-arm" cx="189" cy="134" r="3.8" fill="#C68A63"/>
        <rect x="166" y="140" width="6" height="10" fill="#C68A63"/>
        <circle cx="169" cy="133" r="11" fill="#C68A63"/>
        <path d="M158 132 q-1 -15 11 -15 q12 0 11 13 q-3 -7 -11 -7 q-6 4 -11 9z" fill="#4A3020"/>
        <circle cx="165" cy="135" r="1.3" fill="#0F2A1E"/><circle cx="173" cy="135" r="1.3" fill="#0F2A1E"/>
        <path d="M165 139.5 q4 3 8 0" stroke="#7A3E2A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </g></g>

      <g class="p-body">
        <path d="M80 140 h40 l-3 64 h-14 l-3 -46 l-3 46 h-14 z" fill="#2E3350"/>
        <rect x="74" y="203" width="23" height="8" rx="4" fill="#0F2A1E"/><rect x="103" y="203" width="23" height="8" rx="4" fill="#0F2A1E"/>
        ${backHair}
        <path d="M79 90 q-12 22 -11 50" stroke="#D6E2FF" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M121 90 q12 22 11 48" stroke="#D6E2FF" stroke-width="12" stroke-linecap="round" fill="none"/>
        <rect x="94" y="70" width="12" height="16" fill="#E0A47E"/>
        <path d="M74 86 q26 -9 52 0 l5 56 h-62 z" fill="#D6E2FF"/>
        <path d="M92 83 l8 10 l8 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>

        <g class="gear gear-leadership-1">
          <path d="M79 90 q-12 22 -11 48" stroke="#2A3D6E" stroke-width="13" stroke-linecap="round" fill="none"/>
          <path d="M121 90 q12 22 11 46" stroke="#2A3D6E" stroke-width="13" stroke-linecap="round" fill="none"/>
          <path d="M74 86 L93 81 L100 103 L99 142 L69 142 Z" fill="#2A3D6E"/>
          <path d="M126 86 L107 81 L100 103 L101 142 L131 142 Z" fill="#2A3D6E"/>
          <path d="M93 81 L100 103 M107 81 L100 103" stroke="#3E5591" stroke-width="2"/>
          <path d="M109 104 h9 l-4.5 5 z" fill="#0F7A3E"/>
          <circle cx="100" cy="120" r="1.8" fill="#C7D2F0"/><circle cx="100" cy="131" r="1.8" fill="#C7D2F0"/>
        </g>

        <circle cx="80" cy="58" r="4" fill="#D69670"/><circle cx="120" cy="58" r="4" fill="#D69670"/>
        <circle cx="100" cy="56" r="20" fill="#E0A47E"/>
        ${hair}
        <path d="M89 52 h7 M104 52 h7" stroke="${hairColor}" stroke-width="2" stroke-linecap="round"/>
        <g class="p-eyes"><circle cx="93" cy="58.5" r="2"/><circle cx="107" cy="58.5" r="2"/></g>
        <path d="M100 59 v4" stroke="#C98A64" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M94 66.5 q6 4 12 0" stroke="${f ? "#B5523F" : "#8A4B3A"}" stroke-width="2" fill="none" stroke-linecap="round"/>

        <g class="gear gear-communication-1">
          <path d="M78 54 q22 -42 44 0" stroke="#0F2A1E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <rect x="73" y="50" width="9" height="15" rx="3.5" fill="#1463FF"/><rect x="118" y="50" width="9" height="15" rx="3.5" fill="#1463FF"/>
          <path d="M77 64 q0 13 16 11" stroke="#0F2A1E" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <circle cx="94" cy="75" r="2.8" fill="#1463FF"/>
        </g>

        <g class="gear gear-ai-1">
          <g transform="rotate(-10 64 134)">
            <rect x="50" y="114" width="29" height="40" rx="4.5" fill="#0F2A1E"/>
            <rect x="53" y="118" width="23" height="31" rx="2" fill="#0891B2"/>
            <path d="M64.5 125 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#fff"/>
          </g>
        </g>
        <circle cx="68" cy="141" r="6.5" fill="#E0A47E"/>
        <circle cx="132" cy="139" r="6.5" fill="#E0A47E"/>

        <g class="gear gear-coaching-1">
          <rect x="125" y="128" width="15" height="17" rx="2.5" fill="#FF7A2B"/>
          <path d="M140 132 q7 0 7 5 q0 5 -7 5" stroke="#FF7A2B" stroke-width="2.5" fill="none"/>
          <rect x="125" y="128" width="15" height="3" fill="#E8611A"/>
          <g class="steam" stroke="#B6B1CC" stroke-width="1.8" fill="none" stroke-linecap="round">
            <path d="M129 124 q-2 -4 0 -8"/><path d="M135 124 q-2 -4 0 -8"/>
          </g>
        </g>
      </g>

      <g class="gear gear-communication-2">
        <rect x="128" y="14" width="58" height="30" rx="10" fill="#fff" stroke="#1463FF" stroke-width="2"/>
        <path d="M139 43.5 l-5 10 l14 -9.5" fill="#fff" stroke="#1463FF" stroke-width="2" stroke-linejoin="round"/>
        <rect x="136" y="22" width="40" height="4" rx="2" fill="#1463FF" opacity=".55"/>
        <rect x="136" y="31" width="26" height="4" rx="2" fill="#1463FF" opacity=".35"/>
        <rect x="164" y="52" width="28" height="17" rx="8" fill="#1463FF"/>
        <circle cx="171" cy="60.5" r="1.8" fill="#fff"/><circle cx="178" cy="60.5" r="1.8" fill="#fff"/><circle cx="185" cy="60.5" r="1.8" fill="#fff"/>
      </g>

      <g class="gear gear-ai-2">
        <path d="M44 66 q4 26 16 46" stroke="#0891B2" stroke-width="1.8" stroke-dasharray="3 4" fill="none" opacity=".55"/>
        <g class="orb">
          <circle cx="40" cy="50" r="20" fill="#0891B2" opacity=".12"/>
          <circle cx="40" cy="50" r="13" fill="url(#${g}o)"/>
          <path d="M40 43 l1.8 5.2 l5.2 1.8 l-5.2 1.8 l-1.8 5.2 l-1.8 -5.2 l-5.2 -1.8 l5.2 -1.8 z" fill="#fff"/>
        </g>
      </g>
    </svg>`;
    return w.firstElementChild;
  }
  function flourish(svg) {
    svg.classList.remove("equip");
    void svg.getBoundingClientRect();
    svg.classList.add("equip");
  }
  // lv: { pillar: 0 | 1 | 2 } — how much of each pillar's gear the manager wears
  function applyGear(svg, lv) {
    PILLARS.forEach((p) => [1, 2].forEach((t) => svg.classList.toggle(`has-${p}-${t}`, (lv[p] || 0) >= t)));
  }
  const FULL = Object.fromEntries(PILLARS.map((p) => [p, 2]));
  const skillChip = (p) =>
    `<span class="skill-chip on" style="${pv(p)}">${Q.pillars[p].icon} ${Q.pillars[p].name}<b>✓ Achieved</b></span>`;

  // Avatar choice (remembered per browser; works without storage too)
  try { if (["m", "f"].includes(localStorage.getItem("emq-avatar"))) state.avatar = localStorage.getItem("emq-avatar"); } catch (e) {}
  let hero = person();
  $("#hero-mascot").appendChild(hero);
  function renderAvatarPick() {
    $$(".ap-opt").forEach((b) => {
      const v = b.dataset.avatar;
      b.setAttribute("aria-checked", String(v === state.avatar));
      const thumb = person(v);
      thumb.setAttribute("viewBox", "70 22 60 60");
      $(".ap-thumb", b).replaceChildren(thumb);
    });
  }
  function chooseAvatar(v) {
    state.avatar = v;
    try { localStorage.setItem("emq-avatar", v); } catch (e) {}
    const next = person(v);
    next.setAttribute("class", hero.getAttribute("class"));
    hero.replaceWith(next);
    hero = next;
    $$(".ap-opt").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.avatar === v)));
  }
  renderAvatarPick();

  // Intro: the hero manager achieves the four skills, one by one, on a loop
  (function heroLoop() {
    let i = 0;
    setInterval(() => {
      if (state.phase !== "intro") return;
      if (i < PILLARS.length) {
        hero.classList.add(`has-${PILLARS[i]}-1`, `has-${PILLARS[i]}-2`);
        $(`.hpill[data-p="${PILLARS[i]}"]`).classList.add("on");
      } else if (i === PILLARS.length + 2) {
        applyGear(hero, {});
        $$(".hpill").forEach((n) => n.classList.remove("on"));
        i = -1;
      }
      i++;
    }, 1300);
  })();

  /* ---------- screens ---------- */
  function show(id) {
    $$(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    state.phase = id;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* ---------- quiz setup ---------- */
  const shuffle = (a) => {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  let questions = [];
  const perPillar = (p) => questions.filter((q) => q.pillar === p).length;
  const levels = () => Object.fromEntries(PILLARS.map((p) => {
    const n = state.done[p] || 0, total = perPillar(p);
    return [p, n === total ? 2 : n >= Math.ceil(total / 2) ? 1 : 0];
  }));
  let sheetChar;

  function buildSheet() {
    sheetChar = person();
    $("#sheet-avatar").replaceChildren(sheetChar);
    $("#skills").innerHTML = PILLARS.map((p) => {
      const P = Q.pillars[p];
      return `<div class="skill" data-p="${p}" style="${pv(p)}">
        <span class="sk-name">${P.icon}<span class="sk-label">${P.name}</span></span>
        <span class="sk-status" aria-label="Not acquired yet"></span>
      </div>`;
    }).join("");
  }

  function updateSheet() {
    const cur = questions[state.idx] && questions[state.idx].pillar;
    PILLARS.forEach((p) => {
      const row = $(`.skill[data-p="${p}"]`);
      row.classList.toggle("current", p === cur && state.phase === "quiz");
      const on = state.done[p] === perPillar(p);
      row.classList.toggle("acquired", on);
      $(".sk-status", row).setAttribute("aria-label", on ? "Skill achieved" : "Not achieved yet");
    });
  }

  function start() {
    // Random section order, random question order within each section, random answer order.
    // Questions stay grouped by section so chapters and avatar progress still make sense.
    state.order = shuffle(PILLARS);
    questions = state.order.flatMap((p) =>
      shuffle(Q.questions.filter((q) => q.pillar === p)).map((q) => ({ ...q, options: shuffle(q.options) }))
    );
    state.idx = 0;
    state.answers = [];
    state.done = Object.fromEntries(PILLARS.map((p) => [p, 0]));
    resetGate();
    buildSheet();
    show("quiz");
    renderStep();
  }

  async function swapCard(html) {
    const stage = $("#stage");
    const old = $(".card", stage);
    if (old) {
      old.classList.add("out");
      await wait(300);
    }
    stage.innerHTML = html;
    return $(".card", stage);
  }

  function renderStep() {
    updateSheet();
    const q = questions[state.idx];
    const prev = questions[state.idx - 1];
    if (!prev || prev.pillar !== q.pillar) renderChapter(q.pillar);
    else renderQuestion();
  }

  async function renderChapter(p) {
    const P = Q.pillars[p];
    const n = questions.filter((q) => q.pillar === p).length;
    state.awaitingNext = "loading";
    const card = await swapCard(`
      <div class="card chapter" style="${pv(p)}">
        <div class="ch-num">Chapter ${state.order.indexOf(p) + 1} of ${PILLARS.length} · ${n} questions</div>
        <div class="ch-icon">${P.icon}</div>
        <h2>${P.name}</h2>
        <p class="ch-tag">${P.tagline}</p>
        <button class="btn btn-primary btn-xl" data-action="chapter-go">Bring it on <span class="arrow">→</span></button>
      </div>`);
    state.awaitingNext = "chapter";
    $("[data-action=chapter-go]", card).focus({ preventScroll: true });
  }

  async function renderQuestion() {
    const q = questions[state.idx];
    const P = Q.pillars[q.pillar];
    state.awaitingNext = "loading";
    await swapCard(`
      <div class="card" style="${pv(q.pillar)}">
        <div class="q-head"><span class="q-pill">${P.icon} ${P.name}</span></div>
        <h2 class="q-text">${q.q}</h2>
        <div class="options" role="group" aria-label="Answers">
          ${q.options.map((o, k) => `
            <button class="opt" data-k="${k}">
              <span class="key">${"ABCD"[k]}</span><span class="txt">${o.t}</span>
            </button>`).join("")}
        </div>
        <p class="kbd-hint">Be honest: there’s no audience. Press <kbd>A</kbd>–<kbd>D</kbd> to answer.</p>
      </div>`);
    state.awaitingNext = false;
  }

  async function pick(k) {
    if (state.awaitingNext) return;
    const q = questions[state.idx];
    const o = q.options[k];
    if (!o) return;
    state.awaitingNext = "picked";

    const best = q.options.reduce((a, b) => (b.s > a.s ? b : a));
    state.answers.push({ pillar: q.pillar, q: q.q, a: o.t, s: o.s, quip: o.quip, best: best.t, module: q.module });

    const card = $("#stage .card");
    $$(".opt", card).forEach((b, i) => {
      b.disabled = true;
      b.classList.add(i === k ? "picked" : "dim");
    });

    // Progress lives on the avatar only: halfway through a section the manager gets
    // the first piece of gear, and finishing the section achieves the skill.
    // Answer quality plays no part here; it's only assessed in the results.
    const p = q.pillar;
    const n = ++state.done[p], total = perPillar(p);
    let delay = 650;
    if (n === Math.ceil(total / 2) || n === total) {
      await wait(250);
      applyGear(sheetChar, levels());
      flourish(sheetChar);
      if (n === total) {
        updateSheet();
        burst($("#sheet-avatar"), 28);
        delay = 1300;
      }
    }

    await wait(delay);
    next();
  }

  function next() {
    if (state.awaitingNext === "chapter") return renderQuestion();
    if (state.awaitingNext !== "picked") return;
    state.awaitingNext = false;
    state.idx++;
    if (state.idx >= questions.length) return analyze();
    renderStep();
  }

  /* ---------- scoring ---------- */
  const compute = () => window.EMQ_SCORING.computeResults(Q, state.answers);


  /* ---------- analyzing ---------- */
  async function analyze() {
    show("analyzing");
    updateSheet();
    const ul = $("#analyze-steps");
    ul.innerHTML = "";
    for (const line of Q.analyzing) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="st"></span><span>${line}</span>`;
      ul.appendChild(li);
      await wait(850);
      li.classList.add("done");
    }
    await wait(500);
    gate();
  }

  /* ---------- email gate (archetype stays hidden) ---------- */
  function characterFor() {
    const c = person();
    applyGear(c, FULL);
    return c;
  }

  function gate() {
    $("#gate-avatar").replaceChildren(characterFor());
    $("#gate-gear").innerHTML = PILLARS.map(skillChip).join("");
    show("gate");
  }

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  $("#gate-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = f.email.value.trim();
    const firstName = f.firstName.value.trim();
    let ok = true;
    $("#email-err").textContent = "";
    $("#consent-err").textContent = "";
    f.email.classList.remove("bad");
    if (!emailOk(email)) {
      ok = false;
      $("#email-err").textContent = "That email looks a bit off. Mind checking it?";
      void f.email.offsetWidth;
      f.email.classList.add("bad");
    }
    if (!f.consent.checked) {
      ok = false;
      $("#consent-err").textContent = "Tick the box so we can send you the report.";
    }
    if (!ok) return;

    const btn = $("#unlock-btn");
    btn.disabled = true;
    btn.innerHTML = `Unlocking… <span class="arrow">⏳</span>`;

    const r = compute();
    // Flat fields so they're easy to map in the CRM (LeadConnector / GoHighLevel webhook).
    const payload = {
      email,
      first_name: firstName,
      marketing_consent: true,
      archetype: r.arch.name,
      stage: Q.stages[r.stageIdx].name,
      overall_score: r.overall,
      focus_area: Q.pillars[r.focus].name,
      strength: Q.pillars[r.strength].name,
      ...Object.fromEntries(PILLARS.map((p) => [`score_${p}`, r.pct[p]])),
      avatar: state.avatar === "f" ? "female" : "male",
      source: "Test EM All quiz",
      page_url: location.href.split("#")[0],
      submitted_at: new Date().toISOString()
    };
    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    const human = !f.company_website.value;
    if (human) await sendLead(payload);
    // Email the formatted report in the background; the results don't wait for it.
    const emailed = human ? sendResultsEmail(email, firstName) : Promise.resolve(false);

    state.lead = { email, firstName };
    $("#lock").classList.add("open");
    await wait(650);
    renderResults(r);
    emailed.then((ok) => {
      const note = $("#email-note");
      if (!ok || !note) return;
      note.textContent = `📬 We’ve emailed your full report to ${email}.`;
      note.hidden = false;
    });
  });

  // Asks the server to email the report. Only question/answer texts are sent:
  // the server re-scores them, so the endpoint can't be used to send arbitrary content.
  async function sendResultsEmail(email, firstName) {
    if (!CFG.resultsEndpoint) return false;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(CFG.resultsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, firstName, answers: state.answers.map(({ q, a }) => ({ q, a })) }),
        signal: ctrl.signal
      });
      clearTimeout(t);
      const data = await res.json().catch(() => ({}));
      return res.ok && data.ok === true;
    } catch (err) {
      console.warn("[Test EM All] Results email failed:", err);
      return false;
    }
  }

  async function sendLead(payload) {
    if (!CFG.formEndpoint) {
      console.info("[Test EM All] No formEndpoint configured. Lead captured locally:", payload);
      return;
    }
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      await fetch(CFG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        signal: ctrl.signal
      });
      clearTimeout(t);
    } catch (err) {
      // Never punish the user for a network hiccup: still reveal results.
      console.warn("[Test EM All] Lead submission failed:", err);
    }
  }

  /* ---------- results ---------- */
  function radarSVG() {
    const cx = 190, cy = 165, R = 110;
    const angles = PILLARS.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / PILLARS.length);
    const pt = (i, v) => [cx + Math.cos(angles[i]) * R * v, cy + Math.sin(angles[i]) * R * v];
    const poly = (v) => PILLARS.map((_, i) => pt(i, typeof v === "number" ? v : v[i]).join(",")).join(" ");
    const rings = [1, 0.75, 0.5, 0.25].map((v, i) => `<polygon class="ring ${i === 0 ? "outer" : ""}" points="${poly(v)}"/>`).join("");
    const axes = PILLARS.map((_, i) => `<line class="axis" x1="${cx}" y1="${cy}" x2="${pt(i, 1)[0]}" y2="${pt(i, 1)[1]}"/>`).join("");
    const labels = PILLARS.map((p, i) => {
      const [x, y] = pt(i, 1.2);
      const anchor = Math.abs(x - cx) < 5 ? "middle" : x > cx ? "start" : "end";
      const dx = anchor === "start" ? -14 : anchor === "end" ? 14 : 0;
      return `<text class="lbl" x="${x + dx}" y="${y + 4}" text-anchor="${anchor}" fill="${Q.pillars[p].ink}">${Q.pillars[p].icon} ${Q.pillars[p].name}</text>
              <text class="val" data-val="${p}" x="${x + dx}" y="${y + 20}" text-anchor="${anchor}">0%</text>`;
    }).join("");
    const dots = PILLARS.map((p) => `<circle data-dot="${p}" r="6" fill="${Q.pillars[p].color}" stroke="#fff" stroke-width="2.5" cx="${cx}" cy="${cy}"/>`).join("");
    return {
      html: `<svg class="radar" viewBox="-60 -10 500 350" role="img" aria-label="Radar chart of your four pillar scores">
        ${rings}${axes}<polygon class="bench" points="${poly(0.85)}"/>
        <polygon class="shape" points="${poly(0)}"/>${dots}${labels}</svg>`,
      animate(svg, pct) {
        const target = PILLARS.map((p) => Math.max(pct[p], 4) / 100);
        const shape = $(".shape", svg);
        const t0 = performance.now(), D = reduceMotion ? 1 : 1400;
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        (function frame(now) {
          const t = Math.min(1, (now - t0) / D), e = ease(t);
          const v = target.map((x) => x * e);
          shape.setAttribute("points", poly(v));
          PILLARS.forEach((p, i) => {
            const [x, y] = pt(i, v[i]);
            const d = $(`[data-dot="${p}"]`, svg);
            d.setAttribute("cx", x); d.setAttribute("cy", y);
            $(`[data-val="${p}"]`, svg).textContent = `${Math.round(pct[p] * e)}%`;
          });
          if (t < 1) requestAnimationFrame(frame);
        })(t0);
      }
    };
  }

  function countUp(node, to, ms = 1400) {
    const t0 = performance.now();
    const D = reduceMotion ? 1 : ms;
    (function f(now) {
      const t = Math.min(1, (now - t0) / D);
      node.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }

  function renderResults(r) {
    const name = state.lead && state.lead.firstName ? esc(state.lead.firstName) : "";
    const F = Q.pillars[r.focus], S = Q.pillars[r.strength];
    const fd = Q.diagnosis[r.focus][r.band(r.pct[r.focus])];
    const stage = Q.stages[r.stageIdx];
    const nextStage = Q.stages[r.stageIdx + 1];
    const bandLabel = { low: "Focus zone", mid: "Building", high: "Strength" };
    const radar = radarSVG();
    const others = PILLARS.filter((p) => p !== r.focus);
    const col = { low: 0, mid: 1, high: 2 };
    const initials = CFG.coachName.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
    const matched = state.answers.filter((a) => a.s === 3).length;

    $("#results-root").innerHTML = `
      <div class="res-hero">
        <div>
          <p class="hello">${name ? `${name}, here` : "Here"}’s the verdict 👇</p>
          <div class="arch-card">
            <div>
              <div class="a-label">Your manager archetype</div>
              <div class="a-emoji">${r.arch.emoji}</div>
              <h3>${r.arch.name}</h3>
              <p class="a-line">“${r.arch.line}”</p>
            </div>
            <div class="a-char" id="res-char"></div>
            <p class="a-desc">${r.arch.desc}</p>
          </div>
          <p class="confirm-note" id="email-note" role="status" hidden></p>
        </div>
        <div class="radar-wrap reveal">
          ${radar.html}
          <div class="radar-legend"><span><i></i>You</span><span><i class="d"></i>High-performing benchmark</span></div>
        </div>
      </div>

      <section class="section">
        <div class="stage-ladder">
          <div class="reveal">
            <p class="eyebrow">Overall manager score</p>
            <div class="overall"><span class="big" id="overall-num">0</span><span class="of">/100</span></div>
            <div class="stage-name">${stage.name}</div>
            <p class="stage-line">${stage.line}${nextStage ? ` Next step: <strong>${nextStage.name}</strong>.` : ""}</p>
            <div class="pillar-bars" style="margin-top:26px">
              ${PILLARS.map((p) => `
                <div class="pbar" style="${pv(p)}">
                  <span class="pn">${Q.pillars[p].icon} ${Q.pillars[p].name}</span>
                  <div class="track"><div class="fill" data-w="${r.pct[p]}"></div></div>
                  <span class="pv">${r.pct[p]}%</span>
                </div>`).join("")}
            </div>
          </div>
          <div class="ladder reveal" aria-label="Manager levels">
            ${Q.stages.slice().reverse().map((s, ri) => {
              const i = Q.stages.length - 1 - ri;
              const cls = i === r.stageIdx ? "here" : i < r.stageIdx ? "passed" : "";
              return `<div class="rung ${cls}"><span>${["🌋", "🛠️", "⭐", "🚀"][i] || ""} ${s.name}</span><span class="you">You</span></div>`;
            }).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <p class="eyebrow">🎯 Your #1 focus area</p>
          <h2>This is where your biggest win is hiding.</h2>
          <p>Improving your weakest pillar will do more for your team than polishing your strongest one. Here’s your plan for the next 30 days.</p>
        </div>
        <div class="focus-card reveal" style="${pv(r.focus)}">
          <div class="f-top"><span class="badge">Priority #1</span><span class="badge soft">${r.pct[r.focus]}% · ${bandLabel[r.band(r.pct[r.focus])]}</span></div>
          <h3>${F.icon} ${F.name}</h3>
          <p class="f-text">${fd.text}</p>
          <ol class="actions">
            ${fd.actions.map((a) => `<li><label><input type="checkbox" /><span>${a}</span></label></li>`).join("")}
          </ol>
        </div>
      </section>

      <section class="section">
        <div class="superpower reveal" style="${pv(r.strength)}">
          <div class="sp-ico">${S.icon}</div>
          <div>
            <p class="eyebrow">💪 Your superpower · ${S.name} ${r.pct[r.strength]}%</p>
            <h3>${S.superpower}</h3>
            <p>Use it on purpose: it’s your best lever for building credibility while you work on ${F.name.toLowerCase()}.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <p class="eyebrow">📋 The full breakdown</p>
          <h2>Your other three pillars</h2>
        </div>
        <div class="pillar-grid">
          ${others.map((p) => {
            const P = Q.pillars[p], b = r.band(r.pct[p]), d = Q.diagnosis[p][b];
            return `<article class="p-card reveal" style="${pv(p)}">
              <div class="p-top"><h4>${P.icon} ${P.name}</h4><span class="badge soft">${r.pct[p]}% · ${bandLabel[b]}</span></div>
              <p>${d.text}</p>
              <ul>${d.actions.map((a) => `<li>${a}</li>`).join("")}</ul>
            </article>`;
          }).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <p class="eyebrow">🧭 What great looks like</p>
          <h2>How each pillar grows</h2>
          <p>Great managers aren’t the ones working hardest. They build teams that get things done, enjoy working together and communicate well. Here’s where you are in each pillar, and what the next step looks like.</p>
        </div>
        <table class="road reveal">
          <thead><tr><th></th><th>Foundation</th><th>Strong</th><th>Exceptional</th></tr></thead>
          <tbody>
            ${PILLARS.map((p) => {
              const here = col[r.band(r.pct[p])];
              return `<tr style="${pv(p)}"><td>${Q.pillars[p].icon} ${Q.pillars[p].name}</td>
                ${Q.ladder[p].map((t, i) => `<td class="${i === here ? "here" : ""}" data-l="${["Foundation", "Strong", "Exceptional"][i]}">${t}</td>`).join("")}</tr>`;
            }).join("")}
          </tbody>
        </table>
      </section>

      <section class="section">
        <details class="review reveal">
          <summary><span>📝 Review your ${state.answers.length} answers <small style="font:500 14px var(--body);color:var(--muted)"> · you picked the best move ${matched}/${state.answers.length} times</small></span><span class="chev">⌄</span></summary>
          <ol class="review-list">
            ${state.answers.map((a) => `
              <li class="rv" style="${pv(a.pillar)}">
                <div class="rv-q">${Q.pillars[a.pillar].icon} ${a.q}</div>
                <div class="rv-row"><b>You said:</b> ${a.a}</div>
                ${a.s === 3 ? `<div class="rv-row match">✓ That’s the best move.</div>` : `<div class="rv-row"><b>Best move:</b> ${a.best}</div>`}
                ${a.module ? `<div class="rv-mod">Covered in ${esc(CFG.programName)} · ${a.module}</div>` : ""}
              </li>`).join("")}
          </ol>
        </details>
      </section>

      <section class="section">
        <div class="coach reveal">
          <div>
            <p class="eyebrow">For managers who want to level up on purpose</p>
            <h2>Reading this report is the easy part. Acting on it is where people stall.</h2>
            <p class="pitch">${esc(CFG.programPitch)}</p>
            <ul>${CFG.programBullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
            <a class="btn btn-primary btn-xl" href="${esc(CFG.bookingUrl)}" target="_blank" rel="noopener">${esc(CFG.ctaLabel)} <span class="arrow">→</span></a>
          </div>
          <div class="coach-side">
            ${CFG.coachPhoto ? `<img class="avatar" src="${esc(CFG.coachPhoto)}" alt="${esc(CFG.coachName)}" />` : `<div class="avatar">${esc(initials)}</div>`}
            ${socialLinks()}
            <div><div class="who">${esc(CFG.coachName)}</div><div class="role">${esc(CFG.coachTitle)} · ${esc(CFG.programName)}</div></div>
            ${CFG.coachBio ? `<p class="bio">${esc(CFG.coachBio)}</p>` : ""}
            ${CFG.coachQuote ? `<blockquote class="quote">“${esc(CFG.coachQuote)}”</blockquote>` : ""}
          </div>
        </div>
      </section>

      <div class="share-row">
        <button class="btn btn-ghost" data-action="print">Save as PDF</button>
      </div>`;

    $("#res-char").appendChild(characterFor());
    state.result = r;
    show("results");
    radar.animate($("#results .radar"), r.pct);
    countUp($("#overall-num"), r.overall);
    observeReveals();
    setTimeout(() => confetti(160), 250);
  }

  /* ---------- reveal on scroll ---------- */
  let io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((n) => n.classList.add("in"));
      $$(".fill").forEach((f) => (f.style.width = f.dataset.w + "%"));
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$(".fill", en.target).forEach((f) => (f.style.width = f.dataset.w + "%"));
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    $$(".reveal:not(.in)").forEach((n) => io.observe(n));
  }

  /* ---------- confetti ---------- */
  const cv = $("#confetti");
  const ctx = cv.getContext("2d");
  let parts = [], raf = 0;
  const COLORS = ["#0F7A3E", "#1463FF", "#0891B2", "#FF7A2B", "#1463FF", "#4C8DFF"];
  function sizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  sizeCanvas();
  addEventListener("resize", sizeCanvas);

  function spawn(x, y, n, spread) {
    if (reduceMotion) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * spread;
      parts.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4,
        w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
        r: Math.random() * 6, vr: (Math.random() - .5) * .3,
        c: COLORS[(Math.random() * COLORS.length) | 0], age: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  let last = 0;
  function tick(now) {
    const dt = Math.min(3, last ? (now - last) / 16.67 : 1); // in 60fps frames
    last = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.age < 180 && p.y < innerHeight + 40);
    parts.forEach((p) => {
      p.age += dt; p.vy += .18 * dt; p.vx *= Math.pow(.99, dt);
      p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - p.age / 180);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : 0;
    if (!raf) { last = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function burst(node, n = 40) {
    if (!node) return;
    const b = node.getBoundingClientRect();
    spawn(b.left + b.width / 2, b.top + b.height / 2, n, 5);
  }
  function confetti(n) {
    spawn(innerWidth * .2, innerHeight * .35, n / 2, 10);
    spawn(innerWidth * .8, innerHeight * .35, n / 2, 10);
  }

  /* ---------- social links (shown under the coach photo) ---------- */
  const SOCIAL_ICONS = {
    instagram: { label: "Instagram", svg: `<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor"/>` },
    linkedin: { label: "LinkedIn", svg: `<path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>` },
    facebook: { label: "Facebook", svg: `<path fill="currentColor" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>` },
    tiktok: { label: "TikTok", svg: `<path fill="currentColor" d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>` }
  };
  function socialLinks() {
    const links = Object.keys(SOCIAL_ICONS).filter((k) => CFG.socials && CFG.socials[k]);
    if (!links.length) return "";
    return `<div class="socials">${links.map((k) => `
      <a class="social social-${k}" href="${esc(CFG.socials[k])}" target="_blank" rel="noopener" aria-label="${esc(CFG.coachName)} on ${SOCIAL_ICONS[k].label}" title="${SOCIAL_ICONS[k].label}">
        <svg viewBox="0 0 24 24" aria-hidden="true">${SOCIAL_ICONS[k].svg}</svg>
      </a>`).join("")}</div>`;
  }

  /* ---------- events ---------- */
  function resetGate() {
    $("#gate-form").reset();
    $("#lock").classList.remove("open");
    const btn = $("#unlock-btn");
    btn.disabled = false;
    btn.innerHTML = `Unlock my results <span class="arrow">🔓</span>`;
  }

  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".opt");
    if (opt) return pick(+opt.dataset.k);
    const a = e.target.closest("[data-action]");
    if (!a) return;
    const act = a.dataset.action;
    if (act === "start") start();
    else if (act === "avatar") chooseAvatar(a.dataset.avatar);
    else if (act === "chapter-go") next();
    else if (act === "home") { e.preventDefault(); if (state.phase !== "results" || confirm("Leave your results?")) show("intro"); }
    else if (act === "print") { $$("details.review").forEach((d) => (d.open = true)); window.print(); }
  });

  document.addEventListener("keydown", (e) => {
    if (state.phase !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    const map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
    if (k in map && !state.awaitingNext) { e.preventDefault(); pick(map[k]); }
    else if (k === "enter" && state.awaitingNext === "chapter") {
      // A focused button handles its own Enter; avoid double-advancing
      if (document.activeElement && document.activeElement.matches("[data-action]")) return;
      e.preventDefault(); next();
    }
  });

  observeReveals();
})();
