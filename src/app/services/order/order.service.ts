import { Observable } from 'rxjs';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private Url=`http://localhost:3000/`;
  private urlOrder=`${this.Url}/user-orders`;
  private errorHandler:ErrorHandler = new ErrorHandler();
  constructor(private http:HttpClient) { }
// pour l'admin
getOrders():Observable<Order[]>{
  try{
    return this.http.get<Order[]>(this.urlOrder);
  }catch(error){
    this.errorHandler.handleError(error)
  }
}
// pour les utilisateurs
getUserOrders(orderId:number):Observable<Order>{
  try{
    return this.http.get<Order>(`${this.urlOrder}/${orderId}`);
  }catch(error){
    this.errorHandler.handleError(error)
  }
}
}
