const ARA_CONFIG = {
  mode: 'personal', // 'personal' = unlimited, 'demo' = countdown timer
  providers: {
    xai: { apiKey: 'e76d28fd-b3f8-43aa-9614-6e5085e69c14', model: 'grok-4-fast', enabled: true },
    gemini: { apiKey: '', model: 'gemini-2.0-flash', enabled: false },
    openai: { apiKey: '', model: 'gpt-4o-mini', enabled: false },
    anthropic: { apiKey: '', model: 'claude-3-5-haiku-latest', enabled: false }
  },
  demo: {
    sessions: [
      { durationMs: 300000, label: '5 minutes' },
      { durationMs: 150000, label: '2.5 minutes' },
      { durationMs: 60000, label: '1 minute' }
    ],
    paywallMessage: 'Free range used up. Unlock full Ara with Deadfall Suppression or your own API key.'
  }
};