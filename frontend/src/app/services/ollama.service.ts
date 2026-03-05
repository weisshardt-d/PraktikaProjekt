import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class OllamaService {
  private base = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  sendMessage(prompt: string, model: string = 'gemma:2b'): Observable<string> {
    return this.http.post<{ reply: string }>(`${this.base}/api/chat`, { prompt, model }).pipe(
      map(r => r.reply)
    );
  }
}
