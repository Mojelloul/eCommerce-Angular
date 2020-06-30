import { Product } from './../../models/product';
import { Observable } from 'rxjs';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private Url=`http://localhost:3000/`;
  private urlProduct=`${this.Url}/products`
  private errorHandler:ErrorHandler = new ErrorHandler();
  constructor(private http:HttpClient) { }

  getProducts( ):Observable<Product[]>{
    try{
      return this.http.get<Product[]>(this.urlProduct);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
  
  getProductById(id:number ):Observable<Product>{
    try{
      const urlProduit=`${this.urlProduct}/${id}`;
      return this.http.get<Product>(urlProduit);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  insertToCart(productId:number, cartItemId:number,cartQuantity:number):Observable<Product>{
    try{
      const params = new HttpParams().set('quantity',cartQuantity.toString());
      const urlProduit=`${this.urlProduct}/${productId}/addtocart/${cartItemId}`;
      return this.http.post<Product>(urlProduit,null,{
       params 
      });
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  updateProductCartQuantity(productId:number,cartQuantity:number):Observable<void>{
    try{
      const params = new HttpParams().set('cartQuantity',cartQuantity.toString());
      const urlProduit=`${this.urlProduct}/${productId}/ipdate-quantity`;
      return this.http.patch<void>(urlProduit,null,{
       params 
      });
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
}
