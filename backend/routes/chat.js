import express from 'express';
import { config } from '../config.js';

const router = express.Router();

router.get('/helloWorld', (anfrage, antwort) => {
  //Schreibe hier die Zeile Code, welche die Antwort "Hello World" zurücksendet.
  //Dazu kannst du die funktion "antwort.send("[Hier deine Nachricht]");" nutzen.
  antwort.send("HelloWorld");
  //Starte den Server neu und teste nun ob du von der Adresse "http://localhost:3000/helloWorld" eine Antwort mit deiner Nachricht bekommst :).
});

// GET Request - Der Prompt wird als URL-Parameter übergeben
// Beispiel: http://localhost:3000/api/chat?prompt=Was ist JavaScript?
router.get('/api/chat', async (anfrage, antwort) => {
  try {
    //Der "anfrage" Parameter/Variable beinhaltet den in der im Browser angegebenen prompt für die KI.
    // Hole den "prompt" aus den URL-Parametern
    const prompt = anfrage.query.prompt;
    
    // (Fehlerprüfung! Hier musst du nichts machen) Prüfe, ob ein Prompt vorhanden ist
    if (!prompt || typeof prompt !== 'string') {
      return antwort.status(400).json({ error: 'Es wurde kein Prompt in der Anfrage angegeben' });
    }

    //Aufgabe 2: Ersetze hier den Text durch die Variable "prompt" um der KI deine Frage weiterzugeben :).
    generiereKIAntwort("@Praktikant: Hier muss der Prompt rein der in der Anfrage angegeben wurde :)", antwort);

    
  } catch (err) {
    console.error(err);
    return antwort.status(500).json({ error: 'Backend error', details: String(err) });
  }
});

router.get('/online', (anfrage, antwort) => {
  antwort.send('Der Server läuft.');
});

router.get('/testKI', (anfrage, antwort) => {
  generiereKIAntwort("Antworte einfach mit den Worten \"Ich bin die KI und kann dir bei deinen Aufgaben helfen!\"", antwort);
});

async function generiereKIAntwort(prompt, antwort) {
  // Sende die Anfrage an Ollama

  // Erstelle den Request-Body für Ollama
  const body = {
    model: config.DEFAULT_MODEL,
    prompt,
    stream: false
  };

  const resp = await fetch(`${config.OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  // Prüfe, ob Ollama erfolgreich geantwortet hat
  if (!resp.ok) {
    const text = await resp.text();
    return antwort.status(502).json({ error: 'Ollama error', details: text });
  }

  // Verarbeite die Antwort von Ollama
  const data = await resp.json();
  const reply = data?.response ?? '';
  return antwort.json({ reply, raw: data });
}

export default router;
