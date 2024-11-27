import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const userService: UserService = inject(UserService);
const router: Router = inject(Router);

if(userService.getLoggedIn()){
  return true;
}else{
  router.navigate(['/auth/login']);
  return false;
}

};
