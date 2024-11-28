import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const userService: AuthService = inject(AuthService);
const router: Router = inject(Router);

if(userService.getLoggedIn()){
  return true;
}else{
  router.navigate(['/auth/login']);
  return false;
}

};
