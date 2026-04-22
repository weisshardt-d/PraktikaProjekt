# TODO: Verbesserungen
- Tasks sollten immer den Endstand als ausklappbaren bereich haben um zu validieren ob es korrekt ist.
- Kommentare im Code waren eher verwirrend. Entweder in den Aufgaben besser beschreiben oder weglassen
- Typescript Aufgaben eher weglassen, wechsel zwischen Dateien ist tendenziell verwirrend.
- Tasks.md ist nicht überall gleich
- Server Aufgabe 1 Branch beinhaltet schon die Lösung für Webaufgaben -> Wechsel auf anderen Branch ist zwingend notwenig.

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
