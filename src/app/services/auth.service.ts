import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  onLogin(username: string, password: string) {
    const user = { username: username, password: password };
    return this.http
      .post('https://blueassetmonitoring.com/testbed/authenticate/login', user)
      .pipe(
        map((response: any) => {
          console.log(response);
          if (response.success) {
            this.tokenService.saveTokenToLocalStorage(response.response.token);
          } else {
            
          }
          return response;
        })
      );
  }
}
