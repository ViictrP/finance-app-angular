import { Injectable } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export default class ProfileInterceptor implements HttpInterceptor {

  constructor(private readonly profileService: ProfileService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
      .pipe(tap(response => {
        if (response instanceof HttpResponse) {
          const { method, url } = req;
          const shouldFetchUsersProfile = method !== 'GET' && !url.includes('login');
          if (shouldFetchUsersProfile) {
            this.profileService.getProfile()
              .subscribe(() => console.log('fetching user\'s updated profile...'))
          }
        }
      }))
  }


}
