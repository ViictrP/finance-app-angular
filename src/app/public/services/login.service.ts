import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import LoginResponse from '../../entities/login.response';
import {environment} from '../../../environments/environment';
import LoginRequest from '../../entities/login.request';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  private accessToken = new BehaviorSubject<string>('');
  currentAccessToken$ = this.accessToken.asObservable();

  constructor(private readonly httpClient: HttpClient,
              private readonly cookieService: CookieService) {
  }

  set accessToken$(token: string) {
    this.accessToken.next(token);
  }

  get isLoggedIn() {
    return Boolean(this.cookieService.get('access_token'));
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.server_host}/login`, request)
      .pipe(
        tap(data => this.cookieService.set('access_token', data.accessToken)),
        tap(data => this.accessToken$ = data.accessToken)
      );
  }

  logOut() {
    this.cookieService.delete('access_token');
  }
}
