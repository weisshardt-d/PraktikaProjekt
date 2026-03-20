# Aufgaben (1 Tag) – CodeGemma 2B

Ziel: Chat-UI mit Standardmodell **codegemma:2b** (spezialisiert auf Programmieraufgaben).

# Aufgaben Projekt Einrichten

1. Projektdateien runterladen
Führe diese Schritte aus:
- Führe den Befehl `git clone https://github.com/weisshardt-d/PraktikaProjekt.git` in dem Terminal im Editor (Wird mit STRG + ö geöffnet) aus.

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
- Führe den Befehl `docker compose exec ollama ollama pull gemma2:2b` aus

**Optional - Für bessere Code-Qualität (benötigt 16 GB RAM):**
Falls dein Raspberry Pi 16 GB RAM hat und du bessere Antworten für komplexe Programmieraufgaben möchtest, kannst du stattdessen das größere Modell verwenden:
- `docker compose exec ollama ollama pull qwen2.5-coder:3b`
- Ändere dann in der Datei `backend/config.js` die Zeile `DEFAULT_MODEL` zu `'qwen2.5-coder:3b'`

Jetzt läuft auf deinem Raspberry PI eine spezialisierte Code-KI, die dir bei Programmieraufgaben und Oracle APEX Entwicklung helfen kann.
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

4. "Chat löschen" Button hinzufügen
- **Teil 1: @Output Event in der ChatWindowComponent erstellen**
  - Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.ts`
  - Importiere `EventEmitter` und `Output` (steht schon ganz oben in den Imports)
  - Erstelle einen neuen `@Output()` mit dem Namen `clear`
  - Der Typ ist `EventEmitter<void>` (void weil kein Wert übergeben wird)
  - Initialisiere ihn mit `new EventEmitter<void>()`
  - Beispiel: `@Output() clear = new EventEmitter<void>();`

- **Teil 2: Button im Template erstellen**
  - Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.html`
  - Erstelle nach dem Chat-Div einen `<button>` mit:
    - CSS-Klassen: `btn` und `small`
    - Click-Event: `(click)="clear.emit()"`
    - Text: "Chat löschen"
  - Beispiel: `<button class="btn small" (click)="clear.emit()">Chat löschen</button>`

- **Teil 3: clearMessages() Methode in AppComponent erstellen**
  - Öffne die Datei `frontend/src/app/app.component.ts`
  - Erstelle eine neue Methode `clearMessages()` in der Klasse (unter dem constructor)
  - Die Methode soll das `messages` Signal auf ein leeres Array setzen
  - Verwende: `this.messages.set([])`
  - Beispiel:
  ```typescript
  clearMessages() {
    this.messages.set([]);
  }
  ```

- **Teil 4: Event im Template verbinden**
  - In der gleichen Datei, im `template` String
  - Füge beim `<app-chat-window>` Tag das Event-Binding hinzu: `(clear)="clearMessages()"`
  - Die vollständige Zeile: `<app-chat-window [messages]="messages()" [loading]="loading()" (clear)="clearMessages()"></app-chat-window>`

- Teste im Browser: Klicke auf "Chat löschen" - alle Nachrichten sollten verschwinden

5. Zeichenzähler im Eingabefeld anzeigen
- Öffne die Datei `frontend/src/app/components/message-input/message-input.component.html`
- Deine Aufgabe: Zeige eine Zeichenanzahl unter dem Eingabefeld an
- Erstelle ein `<div>` Element nach dem `<form>` mit:
  - CSS-Klasse: `small` (für kleinere Schrift)
  - Text: "Zeichen: X/500" wobei X die aktuelle Länge ist
  - Verwende `{{ text.length }}` um die Anzahl der Zeichen anzuzeigen
- Beispiel: `<div class="small">Zeichen: {{ text.length }}/500</div>`
- Optional: Füge beim `<input>` Element das Attribut `maxlength="500"` hinzu um die Eingabe auf 500 Zeichen zu begrenzen
- Teste im Browser: Tippe etwas ein - der Zähler sollte sich aktualisieren

# Aufgaben für Fortgeschrittene (Teil 3) - Markdown-Formatierung

**Für wen ist dieser Teil?** Diese Aufgaben sind für fitte Praktikanten gedacht, die die Basis-Aufgaben bereits abgeschlossen haben und die KI-Antworten professionell formatiert darstellen möchten.

**Was ist das Problem?** CodeGemma antwortet oft mit Markdown-Formatierung:
- `**fett**` für wichtige Begriffe
- `*kursiv*` für Hinweise
- ` ```sql ... ``` ` für Code-Blöcke

Aktuell werden diese Sternchen und Backticks einfach als Text angezeigt. Das sieht unprofessionell aus und macht Code-Beispiele schwer lesbar.

**Was ist das Ziel?** Markdown-Formatierung soll korrekt angezeigt werden:
- **Fetter Text** wird fett
- *Kursiver Text* wird kursiv
- Code-Blöcke erscheinen in einem grauen Kasten mit Monospace-Schrift

---

## Aufgabe 1: Markdown-Library installieren

Die Library `marked` konvertiert Markdown-Text in HTML.

**Schritte:**
1. Öffne ein neues Terminal (STRG + ö)
2. Navigiere in den Frontend-Ordner: `cd frontend`
3. Installiere die Library: `npm install marked`
4. Installiere TypeScript-Typen: `npm install --save-dev @types/marked`
5. Warte bis die Installation abgeschlossen ist (ca. 1-2 Minuten)

**Überprüfung:** 
- Öffne die Datei `frontend/package.json`
- Unter `"dependencies"` sollte jetzt `"marked"` stehen
- Unter `"devDependencies"` sollte `"@types/marked"` stehen

---

## Aufgabe 2: renderMarkdown() Methode in ChatWindowComponent erstellen

Jetzt implementieren wir eine Methode, die Markdown-Text in sicheres HTML umwandelt.

**Teil 1: Imports hinzufügen**
- Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.ts`
- Füge ganz oben bei den anderen Imports hinzu:
```typescript
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
```

**Teil 2: DomSanitizer im Constructor injizieren**
- Der Constructor sieht momentan wahrscheinlich so aus:
```typescript
constructor() {}
```
- Ändere ihn zu:
```typescript
constructor(private sanitizer: DomSanitizer) {}
```
- **Warum?** DomSanitizer schützt vor XSS-Angriffen (Cross-Site-Scripting). Wenn jemand böswilligen HTML-Code eingibt, wird dieser neutralisiert.

**Teil 3: renderMarkdown() Methode erstellen**
- Füge nach dem Constructor diese neue Methode hinzu:
```typescript
renderMarkdown(text: string): SafeHtml {
  // Konfiguriere marked für mehr Sicherheit
  marked.setOptions({
    breaks: true,  // Zeilenumbrüche werden zu <br>
    gfm: true      // GitHub Flavored Markdown aktivieren
  });
  
  // Konvertiere Markdown zu HTML
  const html = marked(text);
  
  // Sanitize HTML um XSS-Angriffe zu verhindern
  return this.sanitizer.sanitize(1, html) || '';
}
```

**Erklärung:**
- `marked(text)` konvertiert Markdown wie `**fett**` in HTML wie `<strong>fett</strong>`
- `sanitizer.sanitize()` entfernt gefährliche HTML-Tags wie `<script>`
- `SafeHtml` ist der Rückgabetyp für sicheres HTML

**Tipp:** Falls TypeScript-Fehler erscheinen, stelle sicher dass alle Imports korrekt sind!

---

## Aufgabe 3: Template anpassen für HTML-Rendering

Jetzt ändern wir das Template, damit LLM-Antworten als formatiertes HTML angezeigt werden.

**Schritte:**
1. Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.html`
2. Suche die Zeile mit `<div class="msg llm">{{ m.text }}</div>`
3. Ändere **nur die LLM-Nachricht** zu:
```html
<div class="msg llm" [innerHTML]="renderMarkdown(m.text)"></div>
```
4. Die User-Nachricht bleibt unverändert: `<div class="msg user">{{ m.text }}</div>`

**Wichtig:** 
- `[innerHTML]` rendert HTML statt reinen Text
- Wir verwenden es nur für LLM-Nachrichten, da diese vertrauenswürdig sind
- User-Nachrichten bleiben plain text aus Sicherheitsgründen

**Gesamte @for Schleife sollte jetzt so aussehen:**
```html
@for (m of messages; track m) {
  @if (m.from === 'user') {
    <div class="msg user">{{ m.text }}</div>
  } @else {
    <div class="msg llm" [innerHTML]="renderMarkdown(m.text)"></div>
  }
}
```

**Teste im Browser:**
- Stelle eine Frage an die KI: "Erkläre mir was **SQL** ist"
- Die KI-Antwort sollte jetzt "SQL" fett darstellen (falls die KI ** ** verwendet)
- Probiere auch: "Zeige mir ein SQL SELECT Beispiel"
- Code-Blöcke sollten jetzt in einem separaten Block erscheinen

---

## Aufgabe 4: CSS für Markdown-Elemente hinzufügen

Damit Markdown-Elemente schön aussehen, fügen wir CSS hinzu.

**Schritte:**
1. Öffne die Datei `frontend/src/app/components/chat-window/chat-window.component.css`
2. Füge am Ende folgendes CSS hinzu:

```css
/* Styling für Markdown in LLM-Nachrichten */
.msg.llm strong {
  font-weight: 700;
  color: #1a3a1a;
}

.msg.llm em {
  font-style: italic;
  color: #2d5a2d;
}

.msg.llm code {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  color: #d63384;
}

.msg.llm pre {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

.msg.llm pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.95em;
}

.msg.llm ul, .msg.llm ol {
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.msg.llm li {
  margin-bottom: 4px;
}

.msg.llm p {
  margin: 8px 0;
}

.msg.llm h1, .msg.llm h2, .msg.llm h3 {
  margin-top: 12px;
  margin-bottom: 8px;
  color: #1a3a1a;
}
```

**Erklärung:**
- `strong` = Fetter Text (aus `**text**`)
- `em` = Kursiver Text (aus `*text*`)
- `code` = Inline-Code (aus `` `code` ``)
- `pre` = Code-Blöcke (aus ` ```code``` `)
- `ul/ol/li` = Listen
- `h1/h2/h3` = Überschriften

---

## Aufgabe 5: Testen und Debugging

**Test 1: Fett und Kursiv**
- Frage: "Erkläre mir was ein **JOIN** in SQL ist"
- Erwartung: "JOIN" sollte fett dargestellt werden
- Falls nicht: Prüfe ob die KI tatsächlich `** **` in der Antwort verwendet

**Test 2: Code-Block**
- Frage: "Zeige mir ein SQL SELECT Beispiel"
- Erwartung: Der Code sollte in einem dunklen Kasten mit Monospace-Schrift erscheinen
- Falls nicht: Prüfe ob die KI ` ``` ` für Code-Blöcke verwendet

**Test 3: Inline-Code**
- Frage: "Was macht die SELECT-Anweisung?"
- Erwartung: Wenn die KI `` `SELECT` `` schreibt, sollte es mit grauem Hintergrund erscheinen

**Test 4: Sicherheit (wichtig!)**
- Gib in deine eigene Nachricht ein: `<script>alert('Test')</script>`
- Erwartung: Es sollte KEIN Alert-Fenster erscheinen
- Der Text sollte nur als normaler Text in deiner Nachricht erscheinen
- **Warum?** DomSanitizer schützt vor XSS-Angriffen

**Test 5: Listen**
- Frage: "Nenne mir 3 SQL Befehle"
- Erwartung: Falls die KI eine Liste mit `-` oder `1.` erstellt, sollte sie formatiert erscheinen

**Häufige Probleme:**

| Problem | Lösung |
|---------|--------|
| `Cannot find module 'marked'` | `npm install marked` im frontend Ordner ausführen |
| TypeScript-Fehler bei `marked` | `npm install --save-dev @types/marked` ausführen |
| Markdown wird nicht gerendert | Prüfe ob `[innerHTML]` statt `{{ }}` verwendet wird |
| Alle Nachrichten verschwinden | Prüfe Browser-Konsole (F12) auf Fehler |
| Sternchen werden immer noch angezeigt | KI verwendet evtl. kein Markdown - teste mit einer anderen Frage |

---

## 🎉 Geschafft!

Du hast erfolgreich Markdown-Rendering implementiert! Die KI-Antworten sehen jetzt professionell aus.

**Was du gelernt hast:**
✅ npm-Pakete installieren und einbinden  
✅ Externe Libraries in Angular verwenden  
✅ Sicherheit mit DomSanitizer (XSS-Schutz)  
✅ HTML-Rendering mit `[innerHTML]`  
✅ CSS für dynamische Inhalte  

**Nächste Schritte:**
- Teste verschiedene Programmierfragen an die KI
- Experimentiere mit komplexeren SQL-Queries
- Stelle Fragen zu Oracle APEX und schaue wie die Code-Beispiele formatiert werden