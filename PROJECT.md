# EngageFlow AI

**A local-first AI co-pilot for LinkedIn and X — built as a Chrome extension.**

EngageFlow sits in your browser sidebar and helps you write replies, draft posts, and schedule content without leaving the feed. It sounds like you because it learns from you. It stays private because it talks directly to Anthropic — never through our servers, because we don't have any.

---

## The Problem

Building a presence on LinkedIn and X takes consistent, high-quality engagement. Most people know what they want to say — they just can't say it fast enough, consistently enough, or in a way that doesn't sound like a template.

Existing tools either:
- Write generic content that doesn't sound like you
- Require you to leave the page and paste things around
- Proxy your data through third-party servers
- Cost a monthly subscription before you've seen any value

EngageFlow solves all four.

---

## What It Does

### Feed Scanner
Reads your LinkedIn and X feeds in real time and surfaces the posts worth engaging with — ranked by engagement potential, topic fit, and reply velocity. You see which conversations are heating up and which your draft would compete with before you type a word.

### Voice Profile
You paste a few of your existing posts or replies, or import directly from your X archive or LinkedIn activity. EngageFlow extracts your cadence, vocabulary, sentence length, rules ("no em-dashes", "no clichés", "always end with a question"), and tone fingerprint. Every reply and post generated afterward runs through that fingerprint before it lands in the text box.

### Composer
A full AI drafting environment in your sidebar. Type a topic or paste a post you're responding to — get a reply in your voice in under 400ms (Claude Haiku 4.5 by default). Swap to Claude Sonnet 4.5 for longer-form posts and threads. Regenerate, refine, or tweak with one-word instructions: *tighten*, *warmer*, *add question*, *remove cliché*.

### Thread Builder
Outline a topic once. EngageFlow expands it into a multi-part thread that breaks at the right beats — hook, development, payoff, CTA — composed as a unit, not stitched together post by post.

### Refine
Highlight any sentence in a draft and apply surgical edits without rewriting the whole thing. One-shot commands against a single span of text. The rest of your draft stays untouched.

### Hook Library
A curated library of 200+ opening-line patterns proven to stop the scroll — filtered to your voice and the topic you're writing about. Because the first line is 80% of the post.

### Draft History
Every reply, post, and refinement is stored locally and indexed for search. Find a comment you wrote three weeks ago in two keystrokes. Nothing leaves your machine.

### Scheduler
Queue posts for a specific time or let EngageFlow suggest the slot where the algorithm is hungriest for your topic. Nothing auto-posts unless you explicitly enable it. Every reply lands in the comment box — you hit send.

### Engagement Signals
Before you post, see: topic saturation (is everyone writing about this right now?), reply velocity (is this conversation active?), and voice fit (does this draft sound like you?). Three numbers that tell you whether to post now, later, or rewrite the angle.

---

## Privacy Model

EngageFlow has no backend. No relay servers. No telemetry.

Your Anthropic API key (BYOK — bring your own key) talks directly to `api.anthropic.com` from your browser. Drafts, your voice profile, and draft history are stored in `chrome.storage.local` — on your machine, not ours. We cannot read your content, log your usage, or see what you write because the data never reaches us.

```
browser → api.anthropic.com
engageflow servers: none
telemetry sent: 0 bytes
```

This is not a privacy policy — it's an architecture constraint.

---

## AI Stack

| Layer | Model | Why |
|---|---|---|
| Replies & short-form | Claude Haiku 4.5 | Sub-400ms, low cost per draft |
| Long-form & threads | Claude Sonnet 4.5 | Stronger reasoning, higher quality |
| Feed analysis | Claude Haiku 4.5 | Real-time scoring across many posts |

All inference runs through the Anthropic API. No fine-tuning, no self-hosted models. The voice profile is a structured prompt that wraps every generation — not a separate model.

---

## Tech Stack

**Extension**
Chrome Extension Manifest V3 · JavaScript · `chrome.storage.local` · Content scripts

**Landing Page**
Vite 5 · React 18.3 · Framer Motion 10.18 · Three.js 0.160 · Tailwind CSS (CDN) · Vercel

**API**
Anthropic API (Claude Haiku 4.5 / Sonnet 4.5) · Direct browser-to-API calls · BYOK

---

## Business Model

**Beta:** Free. Bring your own Anthropic key. Install in 30 seconds.

**Planned:**
- Individual plan: flat monthly fee, API costs pass-through or included tier
- Team plan: shared voice profiles, central API key management, per-editor audit log
- Agency plan: multi-account, multi-voice, white-label

Contact: hi@engageflow.ai

---

## Platforms

- **LinkedIn** — replies, posts, DM drafts (desktop Chrome only)
- **X (Twitter)** — replies, threads, quote tweets (desktop Chrome only)
- **Mobile:** roadmap — not yet supported (Chrome extension is desktop-only)

---

## Project Status

Active development. Landing page live. Chrome extension in private beta.

- GitHub: [github.com/hassanzafarr/engageflow-ai](https://github.com/hassanzafarr/engageflow-ai)
- License: MIT
- Built by Hassan Zafar — AI engineer, MSc Global Software Development @ HS Fulda

---

## Why This Exists

Social media presence compounds. An engineer who comments thoughtfully on 5 posts a day for a year builds something — a network, a reputation, inbound opportunities — that a silent one doesn't. The bottleneck isn't ideas. It's the gap between thinking something and saying it well, fast, and consistently.

EngageFlow closes that gap.
