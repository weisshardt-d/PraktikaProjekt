# Mini-Chat UI für Ollama – **Gemma 2B** Default (Angular + Express)

Dieses Repo ist die Gemma-2B-Variante des 1‑Tages‑Praktikumsprojekts. Standardmodell ist **`gemma:2b`**, optimiert für Raspberry Pi 5 mit 8–16 GB RAM.

## ⚙️ Voraussetzungen
- **Node.js 18+**
- **npm**
- **Docker** & **Docker Compose**
- Raspberry Pi 5 (8–16 GB) empfohlen

## 🚀 Schnellstart
```bash
# 1) Repo klonen
# git clone <DEIN-REPO-URL> praktikantenprojekt-ollama-angular-gemma2b
cd praktikantenprojekt-ollama-angular-gemma2b

# 2) Ollama starten
docker compose up -d

# 3) Gemma 2B Modell laden
docker compose exec ollama ollama pull gemma:2b

# 4) Backend starten
cd backend
npm install
npm run start
# -> http://localhost:3000

# 5) Frontend starten (neues Terminal)
cd ../frontend
npm install
npm start
# -> http://localhost:4200
```

## API
Frontend → `POST http://localhost:3000/api/chat` → Backend (Express) → Ollama `http://localhost:11434/api/generate` mit **`model: "gemma:2b"`**.

## Test (direkt gegen Ollama)
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gemma:2b",
  "prompt": "Sag Hallo auf Deutsch.",
  "stream": false
}'
```

## Hinweis
Die UI ist minimal und für Lernzwecke gedacht (keine Auth, keine Persistenz).
