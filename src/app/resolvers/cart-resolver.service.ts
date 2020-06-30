import { AuthService } from './../services/auth/auth.service';
import { CartService } from './../services/cart/cart.service';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {

  constructor(private cartService:CartService, private authService:AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Cart>{//v15
    if(this.authService.profile){
      return this.cartService.getCart(this.authService.profile.cartId);
    }
  }
}