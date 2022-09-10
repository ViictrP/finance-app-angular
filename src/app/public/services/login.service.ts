import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import LoginResponse from '../../entities/login.response';
import {environment} from '../../../environments/environment';
import LoginRequest from '../../entities/login.request';

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.host}/login`, request);
  }
}
