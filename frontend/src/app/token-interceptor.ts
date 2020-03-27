import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.user != null) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${this.authService.user.token}`),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
