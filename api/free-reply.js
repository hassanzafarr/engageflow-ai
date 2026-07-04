import { kv } from '@vercel/kv';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS_CAP = 2000;
const FREE_LIMIT = Number(process.env.FREE_TRIAL_LIMIT || 5);
const IP_DAILY_CAP = Number(process.env.FREE_TRIAL_IP_DAILY_CAP || 30);
const INSTALL_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });

  if (process.env.FREE_TRIAL_ENABLED === 'false') {
    return res.status(503).json({ error: 'FREE_TRIAL_DISABLED' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'SERVER_MISCONFIGURED' });
  }

  const { installId, prompt, maxTokens } = req.body || {};
  if (typeof installId !== 'string' || !INSTALL_ID_RE.test(installId)) {
    return res.status(400).json({ error: 'INVALID_INSTALL_ID' });
  }
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'INVALID_PROMPT' });
  }

  const trialKey = `trial:${installId}`;
  const used = Number((await kv.get(trialKey)) || 0);
  if (used >= FREE_LIMIT) {
    return res.status(403).json({ error: 'FREE_LIMIT_REACHED', remaining: 0 });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const ipKey = `ipcap:${ip}:${new Date().toISOString().slice(0, 10)}`;
  const ipUsed = Number((await kv.get(ipKey)) || 0);
  if (ipUsed >= IP_DAILY_CAP) {
    return res.status(429).json({ error: 'IP_RATE_LIMITED' });
  }

  let anthropicRes;
  try {
    anthropicRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: Math.min(Number(maxTokens) || 1024, MAX_TOKENS_CAP),
        messages: [{ role: 'user', content: prompt }],
      }),
    });
  } catch (err) {
    return res.status(502).json({ error: `NETWORK_ERROR: ${err.message}` });
  }

  const rawBody = await anthropicRes.text().catch(() => '');
  if (!anthropicRes.ok) {
    if (anthropicRes.status === 429) return res.status(502).json({ error: 'RATE_LIMIT' });
    return res.status(502).json({ error: `UPSTREAM_ERROR: ${rawBody.slice(0, 300)}` });
  }

  let data;
  try { data = JSON.parse(rawBody); } catch { return res.status(502).json({ error: 'UPSTREAM_PARSE_ERROR' }); }
  const text = data?.content?.[0]?.text || '';

  const [newUsed] = await Promise.all([
    kv.incr(trialKey),
    ipUsed === 0 ? kv.expire(ipKey, 60 * 60 * 24) : Promise.resolve(),
    kv.incr(ipKey),
  ]);

  return res.status(200).json({ text, remaining: Math.max(0, FREE_LIMIT - newUsed) });
}
