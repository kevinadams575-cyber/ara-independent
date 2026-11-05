# Ara Independent

Personal Ara LLM app. Runs on your own API keys — no xAI, no Grok base.

## Quick start

1. Open `config.js`.
2. Paste your API key into one provider slot and set `enabled: true`.
3. Set `mode` to `'personal'` for unlimited use, or `'demo'` for the countdown paywall.
4. Deploy to Netlify (drag the folder in, or connect this repo).

## Providers

- **Gemini** — free tier at https://aistudio.google.com/apikey
- **OpenAI** — https://platform.openai.com/api-keys
- **Anthropic** — https://console.anthropic.com/settings/keys

## Branches

- `main` — shared core
- `personal` — your unlimited build (ara-personal.netlify.app)
- `demo` — public build with 5 / 2.5 / 1 min free sessions then paywall (ara-demo-g296.netlify.app)

One repo, two Netlify projects, every push updates both.

## Demo rules

Session 1: 5 minutes. Session 2: 2.5 minutes. Session 3: 1 minute. After that: paywall. Personal use that isn't building a business stays free forever.

## Deadfall Suppression

When the billions roll in, flip demo mode off and it's open to everybody.