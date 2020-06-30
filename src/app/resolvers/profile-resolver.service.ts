import { AuthService } from './../services/auth/auth.service';
import { Profile } from './../models/profile';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile>{

  constructor(private authService:AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile>  {
    return this.authService.getUserProfile();
  }
}
