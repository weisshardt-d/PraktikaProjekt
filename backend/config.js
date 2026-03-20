export const config = {
  PORT: process.env.PORT || 3000,
  OLLAMA_URL: process.env.OLLAMA_URL || 'http://localhost:11434',
  DEFAULT_MODEL: process.env.OLLAMA_MODEL || 'qwen2.5-coder:3b',
  CORS_ORIGINS: ['http://localhost:4200', 'http://127.0.0.1:4200']
};
