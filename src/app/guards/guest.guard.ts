import { inject } from '@angular/core';
import { LoginService } from '../public/services/login.service';
import { Router } from '@angular/router';

export const guestGuard = async () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn = await loginService.isLoggedIn();
  if (isLoggedIn) {
    await router.navigate(['/secure/home']);
    return false;
  }
  return true;
};
