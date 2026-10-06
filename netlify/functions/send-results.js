// Netlify function: POST /api/send-results (see the redirect in netlify.toml)
const { handle } = require("../../server/send-results.js");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({ ok: false, error: "method-not-allowed" }) };
  let body = null;
  try { body = JSON.parse(event.body || "null"); } catch {}
  try {
    const { status, json } = await handle(body, process.env, event.headers || {});
    return { statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) };
  } catch (err) {
    console.error("[send-results]", err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: "server-error" }) };
  }
};
