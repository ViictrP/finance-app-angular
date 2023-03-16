import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { WebViewService } from '../../lib/service/web-view.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private readonly webViewService: WebViewService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.webViewService.getToken())
      .pipe(switchMap(accessToken => {
        const request = req.clone({
          setHeaders: {
            'x-authentication-token': accessToken,
          },
        });
        return next.handle(request);
      }));
  }

}
