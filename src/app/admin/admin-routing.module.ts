import { UserResolverService } from './../resolvers/user-resolver.service';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryResolverService } from '../resolvers/category-resolver.service';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'dashboard',
        component: DashboardComponent
        },
        {
          path:'management',
          children:[
            {
              path:'manage-categories',
              component: ManageCategoriesComponent,
              resolve:{
                categories:CategoryResolverService
              }
            },
            {
              path:'manage-users',
              component: ManageCategoriesComponent,
              resolve:{
                allUsers:UserResolverService
              }
            },
          ]
          },
  
  ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
