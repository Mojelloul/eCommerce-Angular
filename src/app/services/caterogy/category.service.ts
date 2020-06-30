import { Product } from './../../models/product';
import { Observable } from 'rxjs';
import { Category } from './../../models/category';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private Url=`http://localhost:3000/`;
  private _categoryUrl= `${this.Url}categories`
  private errorHandler:ErrorHandler = new ErrorHandler();
  constructor(private http:HttpClient) { }

  getcategories():Observable<Category[]>{
    try{
      return this.http.get<Category[]>(this._categoryUrl);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  getcategoriesById(categoryId:number):Observable<Category>{
    try{
      const urlOfCategory = `${this._categoryUrl}/${categoryId}`;
      return this.http.get<Category>(urlOfCategory);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  createCategory(createCategoryDto:any):Observable<Category>{
    try{
      return this.http.post<Category>(this._categoryUrl,createCategoryDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  updateCategory(categoryId:number,updateCategoryDto:any):Observable<Category>{
    try{
      const urlOfCategory = `${this._categoryUrl}/${categoryId}`;
      return this.http.put<Category>(urlOfCategory,updateCategoryDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  updateProduct(categoryId:number,productId:number,updateProductDto:any):Observable<void>{
    try{
      const urlOfProductOfCaregory = `${this._categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.put<void>(urlOfProductOfCaregory,updateProductDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }

  deleteCategory(categoryId:number):Observable<any>{
    try{
      const urlOfCategory = `${this._categoryUrl}/${categoryId}`;
      return this.http.delete<any>(urlOfCategory);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
  
  deleteProduct(categoryId:number,productId:number):Observable<void>{
    try{
      const urlOfProductOfCaregory = `${this._categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.delete<void>(urlOfProductOfCaregory);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
  
  addProduct(categoryId:number,createProductDto:any):Observable<void>{
    try{
      const urlOfCaregory = `${this._categoryUrl}/products`;//je sais pas est je doit rajouter l id de category
      return this.http.put<void>(urlOfCaregory,createProductDto);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
  
  getCategoryProducts(categoryId:number):Observable<Product[]>{
    try{
      const urlOfCaregory = `${this._categoryUrl}/products`;
      return this.http.get<Product[]>(urlOfCaregory);
    }catch(error){
      this.errorHandler.handleError(error)
    }
  }
  
}
