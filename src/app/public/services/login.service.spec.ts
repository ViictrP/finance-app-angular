import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import LoginRequest from '../../entities/login.request';

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('given valid data then should log in with success', () => {
    const postSpy = jest.spyOn(httpClient, 'post');
    const request: LoginRequest = {username: 'admin@admin.com', password: 'password'};
    service.login(request);

    expect(postSpy).toHaveBeenCalledWith(
      "http://localhost:8080/login",
      {...request}
    );
  });
});
