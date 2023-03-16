import { Injectable } from '@angular/core';
import { getToken, saveToken, deleteToken, savePreferences, getPreferences } from '../helper/webViewHelper';
import { CookieService } from 'ngx-cookie-service';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class WebViewService {

  isMobile = false;

  constructor(private readonly cookiesService: CookieService,
              private readonly platform: Platform) {
    this.isMobile = this.platform.IOS || this.platform.ANDROID;
  }

  public saveToken(token: string): void {
    if (this.isMobile) {
      saveToken(token);
    } else {
      this.cookiesService.set('token', token);
    }
  }

  public async getToken(): Promise<string> {
    if (this.isMobile) {
      return getToken();
    } else {
      return this.cookiesService.get('token');
    }
  }

  public deleteToken(): void {
    if (this.isMobile) {
      deleteToken();
    } else {
      this.cookiesService.delete('token');
    }
  }

  public savePreferences(preferences: string): void {
    if (this.isMobile) {
      savePreferences(preferences);
    } else {
      this.cookiesService.set('preferences', preferences);
    }
  }

  public async getPreferences(): Promise<string> {
    if (this.isMobile) {
      return getPreferences();
    } else {
      return this.cookiesService.get('preferences');
    }
  }
}
