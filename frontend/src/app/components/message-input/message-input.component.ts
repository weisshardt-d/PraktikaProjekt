import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Output() send = new EventEmitter<string>();
  @Input() disabled = false;
  text = '';

  onSubmit(e: Event) {
    e.preventDefault();
    const t = this.text.trim();
    if (!t) return;
    this.send.emit(t);
    this.text = '';
  }
}
