import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || 'gemma:2b';

app.use(cors({ origin: ['http://localhost:4200', 'http://127.0.0.1:4200'] }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => res.json({ ok: true, model: DEFAULT_MODEL }));

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, model } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing "prompt" (string)' });
    }

    const body = {
      model: model || DEFAULT_MODEL,
      prompt,
      stream: false
    };

    const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'Ollama error', details: text });
    }

    const data = await resp.json();
    const reply = data?.response ?? '';
    return res.json({ reply, raw: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Backend error', details: String(err) });
  }
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT} (model: ${DEFAULT_MODEL})`));
