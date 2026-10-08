import { BG } from 'bgutils-js';

// Cache token in-memory across lambda invocations (lasts ~6-12 hours per container)
let cachedData = null;
let lastGeneratedAt = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // Refresh every 30 minutes

async function generatePoToken() {
  const now = Date.now();
  if (cachedData && (now - lastGeneratedAt) < CACHE_TTL_MS) {
    return cachedData;
  }

  try {
    const bgConfig = {
      fetch: (url, options) => fetch(url, options),
      globalObj: globalThis
    };

    const bg = await BG.Create(bgConfig);
    const challenge = await bg.challenge();

    if (!challenge) {
      throw new Error('Failed to fetch BotGuard challenge from YouTube');
    }

    const response = await bg.solve(challenge);
    const poToken = response?.poToken;
    const visitorData = bg.visitorData;

    if (!poToken || !visitorData) {
      throw new Error('Incomplete PoToken / VisitorData generated');
    }

    cachedData = {
      visitorData,
      poToken,
      generatedAt: new Date().toISOString(),
      source: "potoken-generator"
    };
    lastGeneratedAt = now;

    return cachedData;
  } catch (error) {
    console.error('Error generating PoToken:', error);
    // If generation fails but we have stale cache, return stale cache instead of 500
    if (cachedData) {
      return cachedData;
    }
    throw error;
  }
}

export default async function handler(req, res) {
  // Allow CORS so any Lavalink dashboard / web client can query it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const data = await generatePoToken();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'PoToken Generation Failed',
      message: err.message
    });
  }
}
