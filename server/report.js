/* ==========================================================================
   Results email: scores the answers server-side and renders a branded,
   email-client-safe HTML report (tables + inline styles) plus a text version.
   ========================================================================== */
const Q = require("../content.js");
const CFG = require("../config.js");
const { computeResults, band, BAND_LABEL } = require("../scoring.js");

const PILLARS = Object.keys(Q.pillars);
const C = { ink: "#0F2A1E", muted: "#4A5E54", faint: "#869890", line: "#E3E9E5", bg: "#F4F6F3", blue: "#1463FF", tint: "#EAF1FF" };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/**
 * Turn the client's answers ({ q, a } as displayed) into scored answers.
 * Scores are looked up here, never trusted from the browser.
 */
function scoreAnswers(raw) {
  const out = [];
  for (const item of raw) {
    const question = Q.questions.find((x) => x.q === item.q);
    const option = question && question.options.find((o) => o.t === item.a);
    if (!option) return null;
    if (out.some((x) => x.q === question.q)) return null; // no duplicates
    out.push({ pillar: question.pillar, q: question.q, a: option.t, s: option.s });
  }
  return out.length === Q.questions.length ? out : null;
}

function buildReport(scored) {
  const r = computeResults(Q, scored);
  return {
    ...r,
    stage: Q.stages[r.stageIdx],
    nextStage: Q.stages[r.stageIdx + 1],
    focusDiag: Q.diagnosis[r.focus][band(r.pct[r.focus])],
    others: PILLARS.filter((p) => p !== r.focus)
  };
}

/* ---------- small HTML helpers ---------- */
const P = (txt, style = "") => `<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:${C.ink};${style}">${txt}</p>`;
const label = (txt, color = C.faint) =>
  `<div style="font:700 11px/1.4 'Courier New',monospace;letter-spacing:1.5px;text-transform:uppercase;color:${color};margin:0 0 8px;">${txt}</div>`;
const section = (inner, pad = "28px 32px") => `<tr><td style="padding:${pad};">${inner}</td></tr>`;
const divider = `<tr><td style="padding:0 32px;"><div style="height:1px;background:${C.line};line-height:1px;font-size:1px;">&nbsp;</div></td></tr>`;

function bar(p, pct) {
  const P_ = Q.pillars[p];
  const w = Math.max(pct, 3);
  return `
  <tr><td style="padding:6px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="font-size:15px;font-weight:700;color:${C.ink};padding-bottom:6px;">${P_.icon} ${esc(P_.name)}</td>
        <td align="right" style="font:700 14px 'Courier New',monospace;color:${P_.ink};padding-bottom:6px;">${pct}%</td>
      </tr>
      <tr><td colspan="2">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:99px;background:#EEF3EF;">
          <tr>
            <td width="${w}%" style="background:${P_.color};height:12px;line-height:12px;font-size:1px;border-radius:99px;">&nbsp;</td>
            <td style="height:12px;line-height:12px;font-size:1px;">&nbsp;</td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>`;
}

function renderEmail({ firstName, report, siteUrl }) {
  const r = report;
  const F = Q.pillars[r.focus], S = Q.pillars[r.strength];
  const base = (siteUrl || "").replace(/\/$/, "");
  const abs = (path) => (/^https?:/.test(path) ? path : `${base}/${String(path).replace(/^\//, "")}`);
  const hi = firstName ? `Hi ${esc(firstName)},` : "Hi there,";
  const subject = `Your Test EM All report: ${r.arch.emoji} ${r.arch.name}`;
  const preheader = `You’re ${r.arch.name}. Your #1 focus: ${F.name}. Here’s your plan for the next 30 days.`;

  const socials = Object.entries(CFG.socials || {}).filter(([, url]) => url)
    .map(([k, url]) => `<a href="${esc(url)}" style="color:${C.blue};text-decoration:none;font-weight:700;font-size:14px;">${{ instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook", tiktok: "TikTok" }[k] || k}</a>`)
    .join(`<span style="color:${C.faint};">&nbsp;&nbsp;·&nbsp;&nbsp;</span>`);

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;border:1px solid ${C.line};">

  <tr><td style="padding:28px 32px 8px;">
    <img src="${esc(abs("img/logo.png"))}" width="200" alt="Test EM All" style="display:block;width:200px;max-width:60%;height:auto;border:0;">
  </td></tr>

  ${section(`
    ${P(hi, "font-size:18px;font-weight:700;")}
    ${P("Thanks for playing Test EM All. Here’s your full manager report. Keep it handy: it’s your playbook for the next 30 days.", `color:${C.muted};`)}
  `, "16px 32px 4px")}

  ${section(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint};border-radius:16px;">
      <tr><td style="padding:26px 26px 22px;">
        ${label("Your manager archetype", C.blue)}
        <div style="font-size:44px;line-height:1.1;margin:4px 0 6px;">${r.arch.emoji}</div>
        <div style="font-size:28px;line-height:1.15;font-weight:800;color:${C.ink};margin:0 0 8px;">${esc(r.arch.name)}</div>
        <div style="font-size:16px;font-style:italic;color:${C.muted};margin:0 0 14px;">“${esc(r.arch.line)}”</div>
        <div style="font-size:15px;line-height:1.6;color:${C.ink};">${esc(r.arch.desc)}</div>
      </td></tr>
    </table>
  `, "16px 32px")}

  ${section(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="top" style="padding-bottom:18px;">
          ${label("Overall manager score")}
          <div style="font-size:52px;line-height:1;font-weight:800;color:${C.blue};">${r.overall}<span style="font:700 18px 'Courier New',monospace;color:${C.faint};">/100</span></div>
          <div style="font-size:18px;font-weight:800;color:${C.ink};margin-top:8px;">${esc(r.stage.name)}</div>
          <div style="font-size:15px;color:${C.muted};margin-top:4px;">${esc(r.stage.line)}</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${PILLARS.map((p) => bar(p, r.pct[p])).join("")}
    </table>
  `)}

  ${divider}

  ${section(`
    ${label("🎯 Your #1 focus area")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid ${F.color};background:#FAFBFA;border-radius:0 14px 14px 0;">
      <tr><td style="padding:20px 22px;">
        <div style="font-size:24px;font-weight:800;color:${F.ink};margin:0 0 8px;">${F.icon} ${esc(F.name)}
          <span style="font:700 12px 'Courier New',monospace;color:${C.faint};">&nbsp;${r.pct[r.focus]}% · ${BAND_LABEL[band(r.pct[r.focus])]}</span></div>
        <div style="font-size:15px;line-height:1.6;color:${C.ink};margin:0 0 14px;">${esc(r.focusDiag.text)}</div>
        <div style="font-size:14px;font-weight:700;color:${C.ink};margin:0 0 8px;">Your next 30 days:</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${r.focusDiag.actions.map((a, i) => `
          <tr>
            <td valign="top" width="34" style="padding:6px 0;">
              <div style="width:24px;height:24px;line-height:24px;border-radius:7px;background:${F.color};color:#fff;text-align:center;font:700 13px 'Courier New',monospace;">${i + 1}</div>
            </td>
            <td style="padding:6px 0;font-size:15px;line-height:1.5;color:${C.ink};">${esc(a)}</td>
          </tr>`).join("")}
        </table>
      </td></tr>
    </table>
  `)}

  ${section(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px dashed ${S.color};border-radius:14px;">
      <tr><td style="padding:18px 22px;">
        ${label(`💪 Your superpower · ${esc(S.name)} ${r.pct[r.strength]}%`, S.ink)}
        <div style="font-size:17px;font-weight:700;line-height:1.4;color:${C.ink};">${esc(S.superpower)}</div>
      </td></tr>
    </table>
  `, "0 32px 28px")}

  ${divider}

  ${section(`
    ${label("📋 Your other pillars")}
    ${r.others.map((p) => {
      const P_ = Q.pillars[p], b = band(r.pct[p]), d = Q.diagnosis[p][b];
      return `
      <div style="margin:0 0 20px;">
        <div style="font-size:17px;font-weight:800;color:${P_.ink};margin:0 0 4px;">${P_.icon} ${esc(P_.name)}
          <span style="font:700 12px 'Courier New',monospace;color:${C.faint};">&nbsp;${r.pct[p]}% · ${BAND_LABEL[b]}</span></div>
        <div style="font-size:15px;line-height:1.6;color:${C.muted};margin:0 0 6px;">${esc(d.text)}</div>
        <div style="font-size:14px;line-height:1.6;color:${C.ink};">→ ${esc(d.actions[0])}</div>
      </div>`;
    }).join("")}
  `)}

  <tr><td style="padding:0 20px 20px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint};border-radius:16px;">
      <tr><td align="center" style="padding:30px 24px;">
        ${CFG.coachPhoto ? `<img src="${esc(abs(CFG.coachPhoto))}" width="96" height="96" alt="${esc(CFG.coachName)}" style="display:block;width:96px;height:96px;border-radius:48px;border:4px solid #ffffff;margin:0 auto 12px;">` : ""}
        <div style="font-size:18px;font-weight:800;color:${C.ink};">${esc(CFG.coachName)}</div>
        <div style="font-size:13px;color:${C.muted};margin:2px 0 14px;">${esc(CFG.coachTitle)} · ${esc(CFG.programName)}</div>
        <div style="font-size:22px;line-height:1.25;font-weight:800;color:${C.ink};margin:6px 0 10px;">Reading this report is the easy part.<br>Acting on it is where people stall.</div>
        <div style="font-size:15px;line-height:1.6;color:${C.muted};margin:0 0 20px;">${esc(CFG.programPitch)}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
          <tr><td style="border-radius:99px;background:${C.blue};">
            <a href="${esc(CFG.bookingUrl)}" style="display:inline-block;padding:15px 28px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:99px;">${esc(CFG.ctaLabel)} →</a>
          </td></tr>
        </table>
        ${CFG.coachBio ? `<div style="font-size:14px;line-height:1.6;color:${C.muted};margin:22px 0 0;text-align:left;">${esc(CFG.coachBio)}</div>` : ""}
        ${socials ? `<div style="margin-top:18px;">${socials}</div>` : ""}
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:6px 32px 28px;font-size:12px;line-height:1.6;color:${C.faint};text-align:center;">
    You’re receiving this because you took the Test EM All quiz${base ? ` at <a href="${esc(base)}" style="color:${C.faint};">${esc(base.replace(/^https?:\/\//, ""))}</a>` : ""} and asked for your results.
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;

  const text = [
    hi,
    "",
    "Thanks for playing Test EM All. Here’s your full manager report.",
    "",
    `YOUR MANAGER ARCHETYPE: ${r.arch.emoji} ${r.arch.name}`,
    `“${r.arch.line}”`,
    r.arch.desc,
    "",
    `OVERALL SCORE: ${r.overall}/100 · ${r.stage.name}`,
    ...PILLARS.map((p) => `- ${Q.pillars[p].name}: ${r.pct[p]}%`),
    "",
    `YOUR #1 FOCUS AREA: ${F.name} (${r.pct[r.focus]}%)`,
    r.focusDiag.text,
    "Your next 30 days:",
    ...r.focusDiag.actions.map((a, i) => `${i + 1}. ${a}`),
    "",
    `YOUR SUPERPOWER: ${S.name} (${r.pct[r.strength]}%)`,
    S.superpower,
    "",
    "YOUR OTHER PILLARS",
    ...r.others.flatMap((p) => {
      const d = Q.diagnosis[p][band(r.pct[p])];
      return [`${Q.pillars[p].name} (${r.pct[p]}%): ${d.text}`, `→ ${d.actions[0]}`, ""];
    }),
    `${CFG.ctaLabel}: ${CFG.bookingUrl}`,
    "",
    `${CFG.coachName}, ${CFG.coachTitle} · ${CFG.programName}`,
    ...Object.values(CFG.socials || {}).filter(Boolean)
  ].join("\n");

  return { subject, html, text };
}

module.exports = { scoreAnswers, buildReport, renderEmail };
