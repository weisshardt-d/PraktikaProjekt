# Aufgaben (1 Tag) – Gemma 2B

Ziel: Chat-UI mit Standardmodell **gemma:2b**.

# Aufgaben Projekt Einrichten

1. Projektdateien runterladen
Führe diese Schritte aus:
- Führe den Befehl `git clone https://..` in dem Terminal im Editor (Wird mit STRG + ö geöffnet) aus.

Nun hast du den Programmcode auf deinem Rechner und kannst ihn bearbeiten.

2. Projektabhängigkeiten installieren (Web Anwendung)
- Navigiere mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept/frontend` und führe den Befehl `npm install` aus.
- Starte die Webanwendung mit dem Befehl `npm run start`
- Überprüfe, ob die Anwendung im Browser unter `http://localhost:4200` erreichbar ist.

3. Projektabhängigkeiten installieren (Server)
- Navigiere erneut mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept/backend` und führe den Befehl `npm install` aus.
- Starte den Server der Anwendung mit dem Befehl `npm run start`
- Überprüfe, ob der Server im Browser unter `http://localhost:3000/online` erreichbar ist und die Antwort `Der Server läuft.` liefert.

4. Lokale KI starten
- Navigiere mit dem `cd` (Change Directory) Befehl in den Ordner `./Praktikantenkonzept`
- Führe den Befehl `docker compose up -d` aus
- Führe den Befehl `docker compose exec ollama ollama pull gemma:2b` aus

Jetzt läuft auf deinem Raspberry PI eine kleines KI Modell welches deine Fragen beantworten kann.
Super, jetzt sind die Anwendungen startbereit und du kannst die weiteren Aufgaben bearbeiten.

# Aufgaben Server
1. Ersten eigenen Endpunkt definieren
- Schreibe die Zeile Code welche in der chat.js Datei dafür sorgt, dass der Server unter der URL `http://localhost:3000/helloWorld` mit den Worten "Hello World" antwortet.

2. Erste Antwort der KI zu eigener Frage erhalten
- Modifiziere die Zeile Code in der selben Datei, welche deine Frage an die KI weitergeben soll (Tipps dazu direkt in der Datei).
- Teste nun über die URL `http://localhost:3000/api/chat?prompt=[Hier deine Frage]` ob die Ki dir antwortet. Hierzu musst du die URL z.B. so bearbeiten `http://localhost:3000/api/chat?prompt=Wie%20ist%20dein%20Name`.
Leerzeichen müssen mit %20 ersetzt werden da die URL sonst nicht aufgerufen werden kann.






# Web Anwendung
1. Nachrichtenliste in `ChatWindowComponent` anzeigen
- Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.html`
- In dieser Datei findest du eine `@for` Schleife die über das `messages` Array iteriert
- Deine Aufgabe: Erstelle innerhalb der `@for` Schleife ein `<div>` Element für jede Nachricht
- Das `<div>` Element soll:
  - Die CSS-Klasse `msg` haben
  - Den Text der Nachricht anzeigen
- Tipps:
  - Zeige `m.text` innerhalb des `<div>` an mit der doppelten geschweiften Klammer Syntax: `{{ m.text }}`
  - Beispiel: `<div class="msg">{{ m.text }}</div>`
- Teste ob es funktioniert indem du die Anwendung im Browser öffnest (`http://localhost:4200`) und prüfst ob Nachrichten angezeigt werden
- Die Nachrichten sehen noch alle gleich aus - das ändern wir später!

2. Eingabefeld und Senden-Button in `MessageInputComponent` erstellen
- Öffne die Datei `frontend/src/app/components/message-input/message-input.component.html`
- In dieser Datei findest du ein `<form>` Element mit dem Event `(submit)="onSubmit($event)"`
- Deine Aufgabe: Erstelle innerhalb des `<form>` Elements ein Eingabefeld und einen Button
- Das Eingabefeld (`<input>`) soll:
  - `type="text"` haben
  - Die CSS-Klasse `input` haben
  - Den Platzhaltertext "Nachricht eingeben…" anzeigen (`placeholder`)
  - Mit der Variable `text` verbunden sein mit `[(ngModel)]="text"` (Two-Way Data Binding)
  - Ein `name="msg"` Attribut haben (wird für ngModel benötigt)
  - Deaktiviert sein wenn `disabled` true ist: `[disabled]="disabled"`
- Der Button (`<button>`) soll:
  - `type="submit"` haben
  - Die CSS-Klasse `btn` haben
  - Den Text "Senden" anzeigen
  - Auch deaktiviert sein wenn `disabled` true ist: `[disabled]="disabled"`
- Beispiel Struktur:
```html
<form class="row" (submit)="onSubmit($event)">
  <input class="input" type="text" placeholder="..." [(ngModel)]="text" name="msg" [disabled]="disabled" />
  <button class="btn" type="submit" [disabled]="disabled">Senden</button>
</form>
```
- Teste im Browser: Du solltest jetzt ein Eingabefeld und einen Button sehen
- Das Senden funktioniert noch nicht - das kommt in einer späteren Aufgabe!

3. Nachrichten basierend auf Absender unterschiedlich stylen
- Öffne wieder die Datei `frontend/src/app/components/chat-window/chat-window.component.html`
- Jede Nachricht hat ein Feld `m.from` welches entweder `'user'` oder `'llm'` sein kann
- Deine Aufgabe: Zeige User-Nachrichten und LLM-Nachrichten mit unterschiedlichen CSS-Klassen an
- Verwende `@if` und `@else` innerhalb der `@for` Schleife:
  - Wenn `m.from === 'user'` ist, füge die zusätzliche CSS-Klasse `user` hinzu
  - Wenn `m.from === 'llm'` ist, füge die zusätzliche CSS-Klasse `llm` hinzu
- Beispiel Struktur:
```html
@for (m of messages; track m) {
  @if (m.from === 'user') {
    <div class="msg user">{{ m.text }}</div>
  } @else {
    <div class="msg llm">{{ m.text }}</div>
  }
}
```
- Teste im Browser: User-Nachrichten sollten jetzt rechts (dunkel) und LLM-Nachrichten links (grün) erscheinen

4. API-Aufruf in `OllamaService.sendMessage(prompt, model)`.
5. Flow in `AppComponent` verdrahten.
6. Optional: Styling, Fehleranzeige, Modell-Dropdown.