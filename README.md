# Mini-Chat UI für Ollama – **CodeGemma 2B** Default (Angular + Express)

Dieses Repo ist die CodeGemma-2B-Variante des 1‑Tages‑Praktikumsprojekts. Standardmodell ist **`codegemma:2b`**, spezialisiert auf Programmieraufgaben und optimiert für Raspberry Pi 5 mit 8–16 GB RAM.

## ⚙️ Voraussetzungen
- **Node.js 18+**
- **npm**
- **Docker** & **Docker Compose**
- Raspberry Pi 5 (8–16 GB) empfohlen

## 🚀 Schnellstart
```bash
# 1) Repo klonen
# git clone https://github.com/weisshardt-d/PraktikaProjekt.git
cd PraktikaProjekt

# 2) Ollama starten
docker compose up -d

# 3) CodeGemma 2B Modell laden (oder optional codegemma:7b für 16 GB RAM)
docker compose exec ollama ollama pull codegemma:2b

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
Frontend → `POST http://localhost:3000/api/chat` → Backend (Express) → Ollama `http://localhost:11434/api/generate` mit **`model: "codegemma:2b"`**.

## Test (direkt gegen Ollama)
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "codegemma:2b",
  "prompt": "Erkläre was eine SQL SELECT Anweisung macht.",
  "stream": false
}'
```

## Hinweis
Die UI ist minimal und für Lernzwecke gedacht (keine Auth, keine Persistenz).
