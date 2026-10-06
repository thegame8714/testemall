/* ==========================================================================
   SITE CONFIG — edit this file to brand the quiz and wire up email capture.
   ========================================================================== */
var __root = typeof window !== "undefined" ? window : globalThis;
__root.EMQ_CONFIG = {
  // Who you are (shown in header, footer and the coaching section)
  coachName: "Fabio Salimbeni",
  coachTitle: "Founder & Lead Coach",
  coachPhoto: "img/fabio-salimbeni.jpg", // leave empty to show initials
  coachBio:
    "I’ve spent years leading engineering teams as an Engineering Manager, stepped back to rebuild how I lead, and returned to the role still practising the same work today. I now coach Engineering Managers through the exact confidence and communication challenges I faced myself.",
  coachQuote:
    "I became an Engineering Manager in 2019 and hit a wall almost immediately, the confidence, the overwhelm, all of it. I stepped back, did the work, and went back in. I’m still doing that work today, in the role, years later. I don’t teach a framework I read about, I teach the practice I still use.",

  // Social profiles shown under your photo. Leave a link empty to hide that button.
  socials: {
    instagram: "https://www.instagram.com/fabiosalimbenicoaching/",
    linkedin: "https://www.linkedin.com/in/fabio-salimbeni/",
    facebook: "https://www.facebook.com/profile.php?id=61567490489530",
    tiktok: "https://www.tiktok.com/@fabioscoach"
  },

  // Your coaching offer
  programName: "Refactor Your Leadership",
  programPitch:
    "A 10-week live coaching program for Engineering Managers who want to feel confident and strong as leaders, without the overwhelm. Become the next generation EM, with AI and leadership at your side.",
  programBullets: [
    "10 live sessions over 10 weeks, built around your real situations, not theory",
    "AI as your leadership partner: decisions, capacity trade-offs and hard conversations",
    "Unbiased Reading and Creating Clarity, so your communication lands with each person",
    "A repeatable way to turn around underperformers without a PIP",
    "Build the evidence-based case for the recognition and promotion you’ve earned"
  ],

  ctaLabel: "Book your Breakthrough Call",
  bookingUrl: "https://calendar.app.google/SJHqZZKWCnVrtwXC7",

  // ---- EMAIL CAPTURE ----------------------------------------------------
  // POST endpoint that receives the lead as JSON. Works out of the box with:
  //   Formspree  → "https://formspree.io/f/xxxxxxx"
  //   Zapier/Make webhook → forward to ConvertKit, Mailchimp, HubSpot, Sheets…
  // Leave empty during development: leads are logged to the console instead.
  formEndpoint: "https://services.leadconnectorhq.com/hooks/0n8ftP8Ww9PSxZJJwxoH/webhook-trigger/mFELpJsE7A5QEkY1W6pJ",

  // ---- RESULTS EMAIL ----------------------------------------------------
  // Serverless function that emails the formatted report (see README).
  // Leave empty to disable. The results page only says "we've emailed you"
  // when the function confirms the email was sent.
  resultsEndpoint: "/api/send-results",
  privacyUrl: "#"
};

// Also loadable from Node (used by the email function).
if (typeof module === "object" && module.exports) module.exports = __root.EMQ_CONFIG;
