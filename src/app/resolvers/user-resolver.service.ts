import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService  implements Resolve<User>{

  constructor(private authService:AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.authService.getCurrentUser();
  }
}
