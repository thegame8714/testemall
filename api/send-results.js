// Vercel serverless function: POST /api/send-results
const { handle } = require("../server/send-results.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method-not-allowed" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  try {
    const { status, json } = await handle(body, process.env, req.headers);
    res.status(status).json(json);
  } catch (err) {
    console.error("[send-results]", err);
    res.status(500).json({ ok: false, error: "server-error" });
  }
};
