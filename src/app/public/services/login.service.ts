import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import LoginResponse from '../../dto/login.response';
import { environment } from '../../../environments/environment';
import LoginRequest from '../../dto/login.request';
import { WebViewService } from '../../lib/service/web-view.service';

@Injectable()
export class LoginService {


  constructor(private readonly httpClient: HttpClient,
              private readonly webViewService: WebViewService) {
  }

  async isLoggedIn() {
    const token = await this.webViewService.getToken();
    return Boolean(token);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.server_host}/login`, request)
      .pipe(
        tap(data => this.webViewService.saveToken(data.accessToken))
      );
  }

  logOut() {
    this.webViewService.deleteToken();
  }
}
