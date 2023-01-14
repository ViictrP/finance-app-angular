import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import LoginResponse from '../../dto/login.response';
import { environment } from '../../../environments/environment';
import LoginRequest from '../../dto/login.request';
import { deleteToken, getToken, saveToken } from '../../lib/helper/webViewHelper';

@Injectable()
export class LoginService {


  constructor(private readonly httpClient: HttpClient) {
  }

  async isLoggedIn() {
    const token = await getToken();
    return Boolean(token);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.server_host}/login`, request)
      .pipe(
        tap(data => saveToken(data.accessToken))
      );
  }

  logOut() {
    deleteToken();
  }
}
