import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import chatRoutes from './routes/chat.js';

const app = express();

// Middleware
app.use(cors({ origin: config.CORS_ORIGINS }));
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/', chatRoutes);

// Server starten
app.listen(config.PORT, () => {
  console.log(`Backend listening on http://localhost:${config.PORT} (model: ${config.DEFAULT_MODEL})`);
});
