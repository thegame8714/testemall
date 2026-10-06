# Test EM All: the Engineering Manager Quiz

*Test EM All* is a play on "test them all", where EM = Engineering Manager.

A lead-magnet quiz for engineering managers: 20 scenario questions (5 each for Leadership, Communication, AI and Coaching), built on the themes of the Refactor Your Leadership program. Players pick a male or female avatar. During the quiz there are no scores, verdicts or progress bars: progress shows only on the avatar, which gears up halfway through each section and marks the skill “achieved” when the section ends, regardless of the answers. Answer quality is assessed only in the results, which unlock after the player enters an email address (archetype, pillar scores, 30-day plan, road to Director, and a review of every answer with the Director move and the program module that covers it). Players also receive their report by email.

Plain HTML/CSS/JS with no build step and no dependencies. One small serverless function emails each player their formatted report.

## Files

| File | What to edit |
|---|---|
| `config.js` | Your name, photo, bio, socials, program name, pitch, booking link, endpoints |
| `content.js` | Questions, program modules, results copy, archetypes |
| `scoring.js` | Scoring rules (shared by the page and the email function) |
| `style.css` / `app.js` | Look & behaviour |
| `server/report.js` | The results email (HTML + plain text) |
| `server/send-results.js` | The email-sending logic (validation, scoring, Resend) |
| `api/`, `netlify/`, `netlify.toml` | Thin wrappers so the function runs on Vercel or Netlify |

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Collect emails

Leads go to a LeadConnector (GoHighLevel) webhook, set as `formEndpoint` in `config.js`. When someone submits their email and name, the page POSTs this JSON (flat fields, easy to map in a workflow):

```json
{ "email": "alex@company.com", "first_name": "Alex", "marketing_consent": true,
  "archetype": "The Silent Shipper", "stage": "Solid EM", "overall_score": 52,
  "focus_area": "Communication", "strength": "AI",
  "score_leadership": 47, "score_communication": 20, "score_ai": 87, "score_coaching": 53,
  "avatar": "male", "source": "Test EM All quiz",
  "page_url": "https://…", "submitted_at": "2026-10-06T11:33:03.818Z" }
```

Use `focus_area` and `archetype` as tags to send each person a nurture sequence that matches their weakest pillar. A failed webhook call never blocks the results. To switch providers, replace the URL (any endpoint that accepts JSON works, e.g. Formspree or a Zapier/Make webhook).

## Results email

When someone unlocks their results, the page calls `/api/send-results`. That function re-scores the answers on the server, builds a branded HTML email (logo, archetype, score bars, 30-day plan, your photo, bio, socials and the Breakthrough Call button) and sends it with [Resend](https://resend.com). The results page only says “We’ve emailed your full report” when the send actually succeeded.

Only the question and answer texts are sent to the function. It looks up the scores itself and rejects anything that doesn’t match the quiz, so it can’t be used to send arbitrary content. Names that aren’t plain names (for example containing links) are dropped from the greeting.

**Preview the email:**

```bash
node scripts/preview-email.js
```

Then open `email-preview.html` (with the local server running, so the logo and photo load).

**Set it up (one-time):**

1. Create a free Resend account and verify a sending domain, for example `fabiosalimbeni.com`. Resend gives you DNS records to add.
2. Create a Resend API key.
3. Deploy the folder to **Vercel** or **Netlify** (both run the function automatically) and set these environment variables:

| Variable | Example | Required |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | yes |
| `EMAIL_FROM` | `Fabio Salimbeni <quiz@fabiosalimbeni.com>` | yes |
| `SITE_URL` | `https://quiz.fabiosalimbeni.com` | yes (for images and links in the email) |
| `EMAIL_REPLY_TO` | `you@yourinbox.com` | optional |
| `ALLOWED_ORIGIN` | `https://quiz.fabiosalimbeni.com` | optional, blocks calls from other sites |

Until the variables are set, the quiz works normally and simply doesn’t send the email. To turn the email off entirely, set `resultsEndpoint` in `config.js` to `""`.

## Deploy

Use **Vercel** or **Netlify** so the email function runs. On Netlify, `netlify.toml` already routes `/api/*` to the function. Purely static hosts (GitHub Pages, Netlify Drop) can serve the quiz, but they can’t send the email.
