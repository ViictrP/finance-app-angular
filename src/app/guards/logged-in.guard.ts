import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../public/services/login.service';

export const loggedInGuard = async () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = await loginService.isLoggedIn();
  if (!isLoggedIn) {
    await router.navigate(['/public/login']);
    return false;
  }
  return true;
};
