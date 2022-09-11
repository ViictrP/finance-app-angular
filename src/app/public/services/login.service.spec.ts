import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import LoginRequest from '../../entities/login.request';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {of} from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, CookieService]
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should keep the access token', () => {
    const accessToken = 'token';
    service.accessToken$ = accessToken;
    service.currentAccessToken$.subscribe(token => expect(token).toStrictEqual(accessToken));
  });

  it('Should return boolean when isLoggedIn is called', () => {
    const isLoggedIn = service.isLoggedIn;
    expect(isLoggedIn).toBeFalsy();
  });

  it('Should log in with success', fakeAsync(() => {
    const accessToken = {accessToken: 'TOKEN'};
    const postSpy = jest.spyOn(httpClient, 'post').mockImplementation(() => of(accessToken));
    const setCookieSpy = jest.spyOn(cookieService, 'set');
    const request: LoginRequest = {email: 'admin@admin.com', password: 'password'};
    service.login(request).subscribe(() => {
      expect(setCookieSpy).toHaveBeenCalledWith('access_token', 'TOKEN');
    });
    service.currentAccessToken$.subscribe(token => expect(token).toStrictEqual('TOKEN'));
    tick(5000);
    expect(postSpy).toHaveBeenCalledWith(
      `${environment.server_host}/login`,
      {...request}
    );
  }));
});
