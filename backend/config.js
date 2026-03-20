export const config = {
  PORT: process.env.PORT || 3000,
  OLLAMA_URL: process.env.OLLAMA_URL || 'http://localhost:11434',
  DEFAULT_MODEL: process.env.OLLAMA_MODEL || 'codegemma:2b',
  CORS_ORIGINS: ['http://localhost:4200', 'http://127.0.0.1:4200']
};
