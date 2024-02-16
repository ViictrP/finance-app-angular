import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ACCESS_TOKEN } from '../../constants/keys';

export const authorizationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cookieService = inject(CookieService);
  const cloneRequest = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${cookieService.get(ACCESS_TOKEN)}`
    }
  });

  return next(cloneRequest);
}
