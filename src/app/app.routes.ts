import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { authGuard } from './auth/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { AddAddressComponent } from './address/add-address/add-address.component';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/singup', component: SingupComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/add-address', component: AddAddressComponent }

];
