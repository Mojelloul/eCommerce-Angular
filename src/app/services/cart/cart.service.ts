import { CartItem } from './../../models/cart-item';
import { Observable } from 'rxjs';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  private Url=`http://localhost:3000/`;
  private _cartUrl= `${this.Url}cart`
  private _cartItemUrl= `${this.Url}cart_items`
  private errorHandler:ErrorHandler = new ErrorHandler();

  getCart(id:number):Observable<Cart>{
    try{
      return this.http.get<Cart>(this._cartUrl);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  getCartItem(id:number):Observable<CartItem>{
    try{
      return this.http.get<CartItem>(this._cartItemUrl);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  clearCartProduct(cartItemId:number):Observable<CartItem>{
    try{
      const clearUrl = `${this._cartItemUrl}/${cartItemId}/products/clear-products`;
      return this.http.delete<CartItem>(clearUrl);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  placeOrder(cartItemId:number,productId:number,createOrderDto:any):Observable<void>{
    try{
      const orderUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/placeorder`;
      return this.http.post<void>(orderUrl,createOrderDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  checkout(cartItemId:number,createOrderDto:any):Observable<void>{
    try{
      const checkoutUrl = `${this._cartItemUrl}/${cartItemId}/checkout`;
      return this.http.post<void>(checkoutUrl,createOrderDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  remouveFromProduct(cartItemId:number,productId:number):Observable<CartItem>{
    try{
      const remouvetUrl = `${this._cartItemUrl}/${cartItemId}//products/${productId}/remouve-from-cart`;
      return this.http.delete<CartItem>(remouvetUrl);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
}
