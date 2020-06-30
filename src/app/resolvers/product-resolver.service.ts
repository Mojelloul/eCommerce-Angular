import { ProductService } from './../services/product/product.service';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {

  constructor(private productService:ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]>  {
    return this.productService.getProducts();
  }
}
