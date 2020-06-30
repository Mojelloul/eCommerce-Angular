import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService, private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw next.handle(req).pipe(
      catchError((err:HttpErrorResponse)=>{
          if([401,403].indexOf(err.status)!==-1){
            this.authService.userLogout();
          }else if(err.status==404){
            this.router.navigate(['/notFoundResource', err,status],{queryParams:{"Error-status":err.status}});
          }else {
            this.router.navigate(['/applicationError', err,status],{queryParams:{"Error-status":err.status}});
          }
          const error= err.message || err.headers;
          return throwError(error);
      })
    );
  }
}
