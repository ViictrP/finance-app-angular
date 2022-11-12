import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../public/services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = await this.loginService.isLoggedIn();
    if (!isLoggedIn) {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
