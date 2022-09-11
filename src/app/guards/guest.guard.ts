import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../public/services/login.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.loginService.isLoggedIn;
    if (isLoggedIn) {
      this.router.navigate(['/secure/home']);
      return false;
    }
    return true;
  }

}
