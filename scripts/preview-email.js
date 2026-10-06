// Renders a sample results email to email-preview.html so you can check the design.
// Usage: node scripts/preview-email.js [siteUrl]
const fs = require("fs");
const path = require("path");
const Q = require("../content.js");
const { scoreAnswers, buildReport, renderEmail } = require("../server/report.js");

// A varied sample: cycle through option scores so every pillar looks different.
const picks = { leadership: [3, 1, 2, 3, 0], communication: [1, 0, 2, 1, 1], ai: [3, 2, 3, 3, 2], coaching: [2, 1, 3, 0, 3] };
const seen = {};
const answers = Q.questions.map((q) => {
  const i = (seen[q.pillar] = (seen[q.pillar] || 0) + 1) - 1;
  const want = picks[q.pillar][i % 5];
  const o = q.options.find((x) => x.s === want) || q.options[0];
  return { q: q.q, a: o.t };
});

const siteUrl = process.argv[2] || "http://localhost:8765";
const report = buildReport(scoreAnswers(answers));
const { subject, html } = renderEmail({ firstName: "Alex", report, siteUrl });
const out = path.join(__dirname, "..", "email-preview.html");
fs.writeFileSync(out, html);
console.log(`Subject: ${subject}\nWrote ${out}`);
