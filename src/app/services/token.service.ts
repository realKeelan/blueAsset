import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
 private TOKEN_KEY = 'token';
 token = new BehaviorSubject<string | null>(null);

  constructor() { }

 saveTokenToLocalStorage(token: string) {
  localStorage.setItem(this.TOKEN_KEY, token);
  this.token.next(token);
}

 getTokenFromLocalStorage() {
  const token = localStorage.getItem(this.TOKEN_KEY);
  this.token.next(token);
}

 removeTokenFromLocalStorage() {
  localStorage.removeItem(this.TOKEN_KEY);
  this.token.next(null);
}
}
