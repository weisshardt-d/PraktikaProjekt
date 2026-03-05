import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}
