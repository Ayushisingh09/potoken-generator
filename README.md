# 🛡️ PoToken Generator (Serverless / Docker)

A lightweight, 100% serverless and Docker-compatible **YouTube PoToken & VisitorData** micro-worker designed specifically for **Lavalink v4** and **[SolaceAudio](https://github.com/Nex-Devz/SolaceAudio)**.

Automatically solves Google's YouTube BotGuard challenge and returns a fresh, verified `poToken` and `visitorData` to bypass 403 Forbidden and bot-detection blocks permanently.

---

## 🚀 1-Click Deployment (Free)

### Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nex-Devz/potoken-generator)

1. Click the button above to fork and deploy to Vercel for free.
2. Once deployed, your token endpoint will be:
   ```text
   https://your-project.vercel.app/token
   ```

---

## 🐳 Docker Run

```bash
docker build -t potoken-generator .
docker run -d -p 4416:4416 potoken-generator
```

Access at `http://localhost:4416/token`.

---

## ⚙️ Connecting to SolaceAudio / Lavalink

In your Lavalink `application.yml`:

```yaml
plugins:
  solaceaudio:
    youtube:
      potokenUrl: "https://your-project.vercel.app/token"
```

SolaceAudio will automatically query your worker on startup, cache the token, and refresh it in the background every 30 minutes!

---

## 📄 Response Format

```json
{
  "visitorData": "Cgt2S1VNY29kM1VRSS...",
  "poToken": "MnRFUVhBc3Nk...",
  "generatedAt": "2026-10-08T08:25:00.000Z",
  "source": "potoken-generator"
}
```

---

## 📜 License
MIT © [Nex-Devz](https://github.com/Nex-Devz)
