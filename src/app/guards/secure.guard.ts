import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const secureGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  const router = inject(Router);
  if (!isAuthenticated) {
    router.navigate(['login']);
    return false;
  } else {
    return true;
  }
};
