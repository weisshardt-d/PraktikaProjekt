import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type Message = { from: 'user' | 'llm'; text: string };

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() messages: Message[] = [];
  @Input() loading = false;
  
  // Aufgabe 4: Erstelle hier einen @Output() für das clear-Event
  // Hinweis: Verwende EventEmitter<void> da kein Wert übergeben wird
  // Beispiel: @Output() clear = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}
