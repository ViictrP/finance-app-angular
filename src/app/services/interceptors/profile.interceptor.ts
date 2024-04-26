import { inject } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const profileInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const profileService = inject(ProfileService);

  return next(req)
    .pipe(tap(response => {
      if (response instanceof HttpResponse) {
        const { method, url } = req;
        const shouldFetchUsersProfile = method !== 'GET' && !url.includes('login');
        if (shouldFetchUsersProfile) {
          profileService.getProfile()
            .subscribe(() => console.log('fetching user\'s updated profile...'))
        }
      }
    }))
};
