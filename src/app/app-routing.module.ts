import { UserAuthGuard } from './guards/user-auth.guard';
import { CartResolverService } from './resolvers/cart-resolver.service';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { AdminModule } from './admin/admin.module';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { AdminAuthGuard } from './guards/admin-auth.guard';


const routes: Routes = [
  {
    path:"home", 
    component: HomeComponent
  }, 
  {
    path:"admin",
    canActivate:[AdminAuthGuard],
    loadChildren:()=>import('./admin/admin.module').then((a:any)=>a.AdminModule)
  }, 
  {
    path:"profile", 
    component: ProfileComponent,
    resolve:{
      profile:ProfileResolverService
    },
    canActivate:[UserAuthGuard]
  },  
  {
    path:"order", 
    component: OrderComponent,
    canActivate:[UserAuthGuard]
  }, 
  {
    path:"cart", 
    component: CartComponent,
    resolve:{
      cart:CartResolverService
    },
    canActivate:[UserAuthGuard]
  }, 
  {
    path:"auth", 
    children:[{
      path:'login',
      component:LoginComponent
    },
    {
      path:'register',
      component:RegisterComponent
    },
  ]
  }, 
  {
    path:"products", 
    component: ProductListComponent,
    resolve:{
      products:ProductResolverService
    }
  }, 
  {
    path:"products/:id", 
    component: ProductDetailsComponent
  }, 
  {
    path:"categories", 
    component: CategoryListComponent,
    resolve:{
      categories:CategoryResolverService
    }
  }, 
  {
    path:"categories/:id", 
    component: CategoryDetailsComponent
  }, 


  {
    path:"", 
    redirectTo:'home',
    pathMatch:'full'
  },


    {
      path:"**",
      component: PageNotFoundComponent
    },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
