import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import AccessTokenDto from '../../dto/access-token.dto';
import { environment } from '../../../environments/environment';
import LoginDto from '../../dto/login.dto';
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

  login(request: LoginDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(`${environment.server_host}/login`, request)
      .pipe(
        tap(data => this.webViewService.saveToken(data.accessToken))
      );
  }

  logOut() {
    this.webViewService.deleteToken();
  }
}
