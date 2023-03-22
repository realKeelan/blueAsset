import { TokenService } from './token.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token = '';

  constructor(private tokenService: TokenService) {
    console.log();

    this.tokenService.token.subscribe((token: any) => {
      if (token) {
        this.token = token;
      }
    });
  }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   if (this.token) {
     request = request.clone({
        setHeaders: {'x-token': `${this.token}`}
     });
  }
  return next.handle(request);
  }
}
