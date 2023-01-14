import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { getToken } from '../../lib/helper/webViewHelper';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(getToken())
      .pipe(switchMap(accessToken => {
        alert(accessToken);
        const request = req.clone({
          setHeaders: {
            'x-authentication-token': accessToken,
          },
        });
        return next.handle(request);
      }));
  }

}
