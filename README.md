# EngageFlow AI — Your Voice, Amplified

AI-powered social media engagement tool. Scans your feed, learns your voice, and drafts replies that sound like you.

## Features

- **Feed Scanner** — surface high-value posts worth engaging with
- **Voice Profile** — learns your tone, style, and vocabulary
- **AI Composer** — generates on-brand replies and comments
- **Scheduler** — queue and publish at optimal times
- **Three.js Particle Background** — configurable ambient animation

## Stack

- React 18 (via CDN, no build step)
- Babel Standalone (in-browser JSX transpilation)
- Tailwind CSS (CDN)
- Framer Motion
- Three.js

## Run Locally

Requires a local HTTP server (can't open `index.html` directly — CORS blocks JSX file fetching).

```bash
npx serve .
```

Then open `http://localhost:3000`.

## Deploy

Hosted on Vercel. Push to `main` → auto-deploys.

## License

MIT
