/* ==========================================================================
   SCORING — shared by the browser (app.js) and the email function (server/).
   answers: [{ pillar, s }] where s is the option score (0–3).
   ========================================================================== */
(function (root) {
  const band = (v) => (v < 45 ? "low" : v < 75 ? "mid" : "high");
  const BAND_LABEL = { low: "Focus zone", mid: "Building", high: "Strength" };

  function computeResults(Q, answers) {
    const pillars = Object.keys(Q.pillars);
    const pct = {};
    pillars.forEach((p) => {
      const a = answers.filter((x) => x.pillar === p);
      pct[p] = a.length ? Math.round((a.reduce((s, x) => s + x.s, 0) / (a.length * 3)) * 100) : 0;
    });
    const overall = Math.round(pillars.reduce((s, p) => s + pct[p], 0) / pillars.length);
    const sorted = pillars.slice().sort((a, b) => pct[a] - pct[b]);
    const focus = sorted[0];
    const strength = sorted[sorted.length - 1];
    let archKey = focus;
    if (pct[focus] >= 78) archKey = "director";
    else if (pct[strength] < 40) archKey = "survivor";
    const stageIdx = Q.stages.reduce((acc, s, i) => (overall >= s.min ? i : acc), 0);
    return { pct, overall, focus, strength, archKey, arch: Q.archetypes[archKey], band, stageIdx };
  }

  const api = { computeResults, band, BAND_LABEL };
  root.EMQ_SCORING = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
