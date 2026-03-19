# Aufgaben (1 Tag) – Gemma 2B

Ziel: Chat-UI mit Standardmodell **gemma:2b**.

# Einrichten

1. Projektdateien runterladen
Führe diese Schritte aus:
- Führe den Befehl `git clone https://..` in dem Terminal im Editor (Wird mit STRG + ö geöffnet) aus.

Nun hast du den Programmcode auf deinem Rechner und kannst ihn bearbeiten.

2. Projektabhängigkeiten installieren (Web Anwendung)
- Navigiere mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept/frontend` und führe den Befehl `npm install` aus.
- Starte die Webanwendung mit dem Befehl `npm run start`
- Überprüfe ob die Anwendung im Browser unter `http://localhost:4200` erreichbar ist.

3. Projektabhängigkeiten installieren (Server)
- Navigiere erneut mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept/backend` und führe den Befehl `npm install` aus.
- Starte den Server der Anwendung mit dem Befehl `npm run start`
- Überprüfe ob der Server im Browser unter `http://localhost:4200` erreichbar ist und die Antwort `Der Server läuft.` liefert.

4. Lokale KI starten
- Navigiere mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept`
- Führe den Befehl `docker compose up -d`
- Führe den Befehl `docker compose exec ollama ollama pull gemma:2b`

Jetzt läuft auf deinem Raspberry PI eine kleines KI Modell welches deine Fragen beantworten kann.
Super, jetzt sind die Anwendungen startbereit und du kannst die weiteren Aufgaben bearbeiten.

# Server
1. Schreibe die Zeile Code welche in der chat.js Datei dafür sorgt dass der Server mit den Worten "Hello World" antwortet.
2. Modifiziere die Funktion, welche deine Frage/Nachricht an die KI weiterleitet und die Antwort der KI zurückgibt.

# Web Anwendung
1. Nachrichtenliste in `ChatWindowComponent` rendern.
2. Eingabe & Senden in `MessageInputComponent`.
3. API-Aufruf in `OllamaService.sendMessage(prompt, model)`.
4. Flow in `AppComponent` verdrahten.
5. Optional: Styling, Fehleranzeige, Modell-Dropdown.
