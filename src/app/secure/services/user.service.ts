import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import User from '../../entities/User';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>({} as User);
  currentUser = this.user$.asObservable();

  constructor(private readonly httpClient: HttpClient,
              private readonly cookieService: CookieService) { }


  private set user(user: User) {
    this.user$.next(user);
  }

  getProfile(): Observable<User> {
    const accessToken = this.cookieService.get('access_token');
    return this.httpClient.get<User>(`${environment.server_host}/me`, {
      headers: {
        'x-authentication-token': accessToken
      }
    }).pipe(
      tap(data => this.user = data)
    );
  }
}
