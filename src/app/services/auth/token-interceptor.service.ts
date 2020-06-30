import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  
  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    const tokenReq= req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    throw next.handle(tokenReq);
  }
}
