class AraChat {
  constructor(config) {
    this.config = config;
    this.history = [];
    this.demoUsed = 0;
    this.sessionStart = null;
    this.timer = null;
  }

  get activeProvider() {
    return Object.entries(this.config.providers).find(([, p]) => p.enabled);
  }

  isDemo() { return this.config.mode === 'demo'; }

  startSession() {
    if (!this.isDemo()) return;
    const slot = this.config.demo.sessions[this.demoUsed];
    if (!slot) { this.showPaywall(); return false; }
    this.sessionStart = Date.now();
    this.timer = setTimeout(() => this.endSession(), slot.durationMs);
    return slot;
  }

  endSession() {
    clearTimeout(this.timer);
    this.demoUsed++;
    const slot = this.config.demo.sessions[this.demoUsed];
    if (slot) {
      this.showNotice(`Session ended. Next free range: ${slot.label}.`);
    } else {
      this.showPaywall();
    }
  }

  showNotice(text) {
    const el = document.getElementById('ara-notice');
    if (el) { el.textContent = text; el.style.display = 'block'; }
  }

  showPaywall() {
    const el = document.getElementById('ara-paywall);
    if (el) { el.textContent = this.config.demo.paywallMessage; el.style.display = 'block'; }
  }

  async send(text) {
    if (this.isDemo() && !this.sessionStart) {
      const slot = this.startSession();
      if (!slot) return;
    }
    this.history.push({ role: 'user', content: text });
    const provider = this.activeProvider;
    if (!provider) throw new Error('No provider enabled. Add an API key in config.js.');
    const [name, p] = provider;
    const res = await fetch(this.endpoint(name), {
      method: 'POST', headers: this.headers(name, p.apiKey),
      body: JSON.stringify(this.payload(name, text))
    });
    const data = await res.json();
    const reply = this.extract(name, data);
    this.history.push({ role: 'assistant', content: reply });
    return reply;
  }

  endpoint(name) {
    if (name === 'gemini') return `https://generativelanguage.googleapis.com/v1beta/models/${this.config.providers.gemini.model}:generateContent?key=${this.config.providers.gemini.apiKey}`;
    if (name === 'openai') return 'https://api.openai.com/v1/chat/completions';
    if (name === 'anthropic') return 'https://api.anthropic.com/v1/messages';
  }

  headers(name, key) {
    if (name === 'openai') return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` };
    if (name === 'anthropic') return { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' };
    return { 'Content-Type': 'application/json' };
  }

  payload(name, text) {
    if (name === 'gemini') return { contents: [{ parts: [{ text }] }] };
    if (name === 'openai') return { model: this.config.providers.openai.model, messages: this.history };
    if (name === 'anthropic') return { model: this.config.providers.anthropic.model, max_tokens: 1024, messages: this.history };
  }

  extract(name, data) {
    if (name === 'gemini') return data.candidates[0].content.parts[0].text;
    if (name === 'openai') return data.choices[0].message.content;
    if (name === 'anthropic') return data.content[0].text;
  }
}