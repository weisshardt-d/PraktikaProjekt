export const config = {
  PORT: process.env.PORT || 3000,
  OLLAMA_URL: process.env.OLLAMA_URL || 'http://localhost:11434',
  DEFAULT_MODEL: process.env.OLLAMA_MODEL || 'qwen2.5-coder:3b',
  CORS_ORIGINS: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  
  // System-Kontext für die KI (unsichtbar für Benutzer)
  // Dieser Kontext wird bei jeder Anfrage automatisch hinzugefügt
  SYSTEM_CONTEXT: `Du bist ein hilfreicher Assistent für Oracle APEX Entwicklung.

Aktuelle Aufgabe des Benutzers:
Der Benutzer arbeitet an einer Oracle APEX Anwendung. Die Aufgabe beinhaltet:
- Erstellen von APEX Pages und Regions
- Arbeiten mit Interactive Grids und Reports
- PL/SQL Programmierung für Backend-Logik
- Erstellen von Validierungen und Prozessen
- SQL Queries für Datenbankoperationen

Hilf dem Benutzer mit Oracle APEX spezifischen Lösungen. Gib Code-Beispiele in PL/SQL und SQL.
Fokussiere dich auf APEX Best Practices und einfache, verständliche Erklärungen.`
};
