<div align="center">

# 🛡️ PoToken Generator

### High-Speed, Serverless YouTube PoToken & VisitorData Micro-Worker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nex-Devz/potoken-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg?logo=node.js)](https://nodejs.org/)

<p align="center">
  A 100% free, zero-config serverless micro-service that solves Google's YouTube BotGuard challenges and returns fresh <b>PoTokens (Proof of Origin Tokens)</b> & <b>VisitorData</b> for <b><a href="https://github.com/Nex-Devz/SolaceAudio">SolaceAudio</a></b> and <b>Lavalink v4</b>.
</p>

</div>

---

## ⚡ Why Do You Need This?
YouTube actively challenges datacenter IPs with **HTTP 403 Forbidden** and bot-verification prompts (*"Sign in to confirm you're not a bot"*). 

This micro-worker generates valid cryptographic tokens and cold-start Proofs of Origin in milliseconds, allowing your Lavalink servers and bots to stream unthrottled high-bitrate Opus audio 24/7 without IP bans.

---

## 🚀 1-Click Free Deployment

### Option A: Vercel (Recommended - 100% Free)
Click the button below to deploy your private generator instance in seconds:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nex-Devz/potoken-generator)

Once deployed, your live token endpoint will be:
```text
https://your-app-name.vercel.app/token
```

---

### Option B: Docker Container

Run locally or on your VPS alongside Lavalink:

```bash
docker build -t potoken-generator .
docker run -d --name potoken-generator -p 4416:4416 potoken-generator
```

Access at `http://localhost:4416/token`.

---

### Option C: Standalone Node.js

```bash
git clone https://github.com/Nex-Devz/potoken-generator.git
cd potoken-generator
npm install
npm start
```

Runs on port `4416` by default (or custom `PORT=XXXX npm start`).

---

## ⚙️ Connecting to SolaceAudio / Lavalink

In your Lavalink `application.yml`, point `potokenUrl` to your deployed generator:

```yaml
plugins:
  solaceaudio:
    youtube:
      # Enter your deployed Vercel URL or local container address:
      potokenUrl: "https://your-app-name.vercel.app/token"
```

SolaceAudio will automatically query your worker on boot, cache the token, and rotate it in the background every 30 minutes!

---

## 📄 JSON Response Format

```json
{
  "visitorData": "ChxOelk1TkRJeE1qRTNOVEV4TURBeE9UTTRNZz09ELWqndYGGLWqndYG",
  "poToken": "IkA2djZ3XLFjQ3UeTjlTGl1HYh1kPFMzBwdkIng5YDNgQmIjZDRTMw8jYiJkOGwMBk9zOmEHWBJvMXE6YQdYEm8x",
  "generatedAt": "2026-10-08T08:32:53.925Z",
  "source": "potoken-generator"
}
```

---

## 🛡️ Key Features
- **Zero Configuration**: Ready out of the box with `bgutils-js` v4 engine.
- **In-Memory Caching**: Minimizes upstream requests to YouTube by auto-caching valid tokens across serverless invocations.
- **Full CORS Support**: Compatible with any Lavalink web dashboard, Discord bot client, or custom API.
- **Fail-Safe Fallbacks**: Returns valid fallback visitor session tokens if external scraping is temporarily blocked.

---

## 📜 License
MIT © [Nex-Devz](https://github.com/Nex-Devz)
