import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import User from '../../entities/User';
import {of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let cookieService: CookieService;

  const _user: User = {
    active: true,
    createdAt: new Date(),
    creditCards: [],
    email: 'email@email.com',
    id: 'QPOEQPWIRS',
    lastname: 'User',
    name: 'User',
    password: 'PQIWORUSLU##!@',
    transactions: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, CookieService]
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get user profile with success', () => {
    jest.spyOn(cookieService, 'get').mockImplementation(() => 'TOKEN');
    const getSpy = jest.spyOn(httpClient, 'get').mockImplementation(() => of(_user));
    service.getProfile().subscribe(user => {
      expect(user).toStrictEqual(_user);
    });
    service.currentUser.subscribe(user => expect(user).toStrictEqual(_user));
    expect(getSpy).toHaveBeenCalledWith(
      `${environment.server_host}/me`
    );
  });
});
