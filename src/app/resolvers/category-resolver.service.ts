import { CategoryService } from './../services/caterogy/category.service';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category[]>{

  constructor(private categoryService:CategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Category[]> {
    return this.categoryService.getcategories();
  }
}
