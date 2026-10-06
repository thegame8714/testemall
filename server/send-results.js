/* ==========================================================================
   Platform-independent handler: validates the request, scores the answers,
   renders the report and sends it with Resend (https://resend.com).

   Environment variables:
     RESEND_API_KEY   (required to send)  Resend API key
     EMAIL_FROM       (required to send)  e.g. "Fabio Salimbeni <quiz@fabiosalimbeni.com>"
                                          (the domain must be verified in Resend)
     EMAIL_REPLY_TO   (optional)          where replies go, e.g. your inbox
     SITE_URL         (required)          public URL of the quiz, used for images and links
     ALLOWED_ORIGIN   (optional)          only accept requests from this origin
   ========================================================================== */
const { scoreAnswers, buildReport, renderEmail } = require("./report.js");

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;
// Names go into the email body, so keep them to plain name characters (no links, no markup).
const NAME_RE = /^[\p{L}][\p{L} '’.-]{0,39}$/u;

async function handle(body, env = process.env, headers = {}) {
  if (env.ALLOWED_ORIGIN && headers.origin && headers.origin !== env.ALLOWED_ORIGIN) {
    return { status: 403, json: { ok: false, error: "forbidden" } };
  }
  if (!body || typeof body !== "object") return { status: 400, json: { ok: false, error: "bad-request" } };

  // Honeypot: pretend success for bots.
  if (body.company_website) return { status: 200, json: { ok: true } };

  const email = String(body.email || "").trim();
  if (email.length > 254 || !EMAIL_RE.test(email)) return { status: 400, json: { ok: false, error: "invalid-email" } };

  const rawName = String(body.firstName || "").trim();
  const firstName = NAME_RE.test(rawName) ? rawName : "";

  if (!Array.isArray(body.answers) || body.answers.length > 60) return { status: 400, json: { ok: false, error: "invalid-answers" } };
  const scored = scoreAnswers(body.answers.map((x) => ({ q: String((x && x.q) || "").slice(0, 600), a: String((x && x.a) || "").slice(0, 600) })));
  if (!scored) return { status: 400, json: { ok: false, error: "invalid-answers" } };

  const report = buildReport(scored);
  const { subject, html, text } = renderEmail({ firstName, report, siteUrl: env.SITE_URL || "" });

  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.warn("[send-results] RESEND_API_KEY / EMAIL_FROM not set: email not sent.");
    return { status: 200, json: { ok: false, error: "email-not-configured" } };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [email],
      ...(env.EMAIL_REPLY_TO ? { reply_to: env.EMAIL_REPLY_TO } : {}),
      subject,
      html,
      text
    })
  });
  if (!res.ok) {
    console.error("[send-results] Resend error", res.status, await res.text().catch(() => ""));
    return { status: 502, json: { ok: false, error: "send-failed" } };
  }
  return { status: 200, json: { ok: true } };
}

module.exports = { handle };
