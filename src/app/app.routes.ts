import { Routes } from '@angular/router';
import { ProductsListComponent } from './shop/products-list/products-list.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [

  { path:'', redirectTo: 'shop/products-list', pathMatch: 'full' },
  { path: 'shop/products-list', component: ProductsListComponent },
  { path:'auth/login', component: LoginComponent }

];
