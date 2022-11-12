import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../public/services/login.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = await this.loginService.isLoggedIn();
    if (isLoggedIn) {
      await this.router.navigate(['/secure/home']);
      return false;
    }
    return true;
  }

}
