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
    <h1>Ollama Mini Chat - Gemma 2B</h1>
    <div class="card">
      <app-chat-window [messages]="messages()" [loading]="loading()"></app-chat-window>
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
