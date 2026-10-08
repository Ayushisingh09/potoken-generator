import { createColdStartToken } from 'bgutils-js/webpo';

// Cache token in memory across serverless lambda invocations
let cachedData = null;
let lastGeneratedAt = 0;
const CACHE_TTL_MS = 20 * 60 * 1000; // Refresh every 20 minutes

async function fetchLiveVisitorData() {
  try {
    const res = await fetch('https://www.youtube.com/sw.js_data', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    });
    if (res.ok) {
      const text = await res.text();
      const match = text.match(/"([A-Za-z0-9_-]{22,}={0,2})"/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (e) {
    console.warn('VisitorData fetch warning:', e.message);
  }
  // Safe default visitorData token if YouTube blocks scraping IP
  return 'ChxOelk1TkRJeE1qQTJNek0xTlRnNU16QXhOZz09EJuqndYGGJuqndYG';
}

export async function generatePoToken() {
  const now = Date.now();
  if (cachedData && (now - lastGeneratedAt) < CACHE_TTL_MS) {
    return cachedData;
  }

  const visitorData = await fetchLiveVisitorData();
  const poToken = createColdStartToken(visitorData);

  cachedData = {
    visitorData,
    poToken,
    generatedAt: new Date().toISOString(),
    source: "potoken-generator"
  };
  lastGeneratedAt = now;

  return cachedData;
}

export default async function handler(req, res) {
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
    console.error('PoToken generation error:', err);
    return res.status(500).json({
      error: 'PoToken Generation Failed',
      message: err.message
    });
  }
}
