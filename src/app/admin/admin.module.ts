import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';



@NgModule({
  declarations: [DashboardComponent,ManageCategoriesComponent,ManageOrdersComponent,ManageUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
