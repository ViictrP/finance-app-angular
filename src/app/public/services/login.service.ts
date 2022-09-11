import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import LoginResponse from '../../dto/login.response';
import {environment} from '../../../environments/environment';
import LoginRequest from '../../dto/login.request';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  constructor(private readonly httpClient: HttpClient,
              private readonly cookieService: CookieService) {
  }

  get isLoggedIn() {
    return Boolean(this.cookieService.get('access_token'));
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.server_host}/login`, request)
      .pipe(
        tap(data => this.cookieService.set('access_token', data.accessToken))
      );
  }

  logOut() {
    this.cookieService.delete('access_token');
  }
}
