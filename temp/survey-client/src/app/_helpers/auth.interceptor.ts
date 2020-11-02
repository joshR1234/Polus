import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import {tap} from 'rxjs/operators';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private pendingHTTPRequests$ = new Subject<void>();
  constructor(private token: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        alert("Error: 401 - not allowed");
        this.router.navigate(['home']);
        
      }
    }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];