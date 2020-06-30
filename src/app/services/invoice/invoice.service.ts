import { Invoice } from './../../models/invoice';
import { Observable } from 'rxjs';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private Url=`http://localhost:3000/`;
  private urlinvoice=`${this.Url}/invoices`;
  private errorHandler:ErrorHandler = new ErrorHandler();
  constructor(private http:HttpClient) { }

  getUserInvoice(id:number):Observable<Invoice>{
    try{
      return this.http.get<Invoice>(`${this.urlinvoice}/${id}`);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
}
