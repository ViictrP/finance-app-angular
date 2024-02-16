import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from '../../constants/keys';

@Injectable()
export default class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private readonly cookieService: CookieService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloneRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.cookieService.get(ACCESS_TOKEN)}`
      }
    });

    return next.handle(cloneRequest);
  }
}
