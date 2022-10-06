import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private readonly cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get('access_token');
    const request = req.clone({
      setHeaders: {
        'x-authentication-token': accessToken
      }
    });
    return next.handle(request);
  }

}
