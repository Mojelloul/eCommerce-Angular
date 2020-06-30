import { OrderService } from './../services/order/order.service';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]>{

  constructor(private orderService:OrderService) { }
  //pour l'admin
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]>  {
    return this.orderService.getOrders();
  }
}
