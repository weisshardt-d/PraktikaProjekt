import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class OllamaService {
  private base = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<string> {
    return this.http.get<{ reply: string }>(`${this.base}/api/chat?prompt=${prompt}`).pipe(
      map(r => r.reply)
    );
  }
}
