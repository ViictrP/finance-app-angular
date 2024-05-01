import { inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.logout()
            .then(() => router.navigate(['login']));
        }
        return throwError(() => error);
      }),
      tap(response => {
      if (response instanceof HttpResponse) {
        const { method, url } = req;
        const shouldFetchUsersProfile = method !== 'GET' && (!url.includes('login') && !url.includes('/me'));
        if (shouldFetchUsersProfile) {
          profileService.getProfile()
            .subscribe(() => console.log('fetching user\'s updated profile...'))
        }
      }
      })
    );
};
