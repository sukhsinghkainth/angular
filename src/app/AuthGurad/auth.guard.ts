import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/authService/auth-service.service';
export const authGuard: CanActivateFn = (route, state)=> {
  let _router = inject(Router)
  let authService = inject(AuthServiceService)
  if (authService.isAuthenticated()) {
    return true;
  }
  else {
    _router.navigate(['login'])
    return false;
  }
};
