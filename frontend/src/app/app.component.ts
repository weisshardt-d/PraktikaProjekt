import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ChatWindowComponent, Message } from './components/chat-window/chat-window.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { OllamaService } from './services/ollama.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatWindowComponent, MessageInputComponent],
  providers: [OllamaService],
  template: `
  <div class="container">
    <h1>Chat WGV</h1>
    <div class="card">
      <app-chat-window [messages]="messages()" [loading]="loading()" (clear)="clearMessages()"></app-chat-window>
      <!-- Aufgabe 4: Verbinde das clear-Event mit der clearMessages() Methode -->
      <!-- Hinweis: Füge (clear)="clearMessages()" zum app-chat-window hinzu -->
      
      <app-message-input (send)="onSend($event)" [disabled]="loading()"></app-message-input>
    </div>
  </div>
  `
})
export class AppComponent {
  messages = signal<Message[]>([
    { from: 'llm', text: 'Hi! Ich bin Gemma 2B lokal auf deinem Gerät. Was möchtest du tun?' }
  ]);
  loading = signal(false);

  constructor(private api: OllamaService) {}

  // Aufgabe 4: Erstelle hier eine clearMessages() Methode
  // Die Methode soll das messages Signal auf ein leeres Array setzen
  // Hinweis: Verwende this.messages.set([])
  clearMessages() {
    this.messages.set([]);
  }
  
  onSend(text: string) {
    if (!text.trim()) return;
    this.messages.update(m => [...m, { from: 'user', text }]);
    this.loading.set(true);
    this.api.sendMessage(text).subscribe({
      next: reply => this.messages.update(m => [...m, { from: 'llm', text: reply }]),
      error: err => this.messages.update(m => [...m, { from: 'llm', text: 'Fehler: ' + (err?.error?.error || err?.message || 'Unbekannt') }]),
      complete: () => this.loading.set(false)
    });
  }
}
