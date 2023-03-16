import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { WebViewService } from '../../lib/service/web-view.service';

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

type Preferences = {
  theme: 'dark' | 'light';
};

@Injectable()
export class PreferencesService {
  preferences: Preferences;
  theme: BehaviorSubject<string>;

  constructor(private readonly webViewService: WebViewService) {
    this.preferences = {} as Preferences;
    this.theme = new BehaviorSubject<string>('');
    fromPromise(this.webViewService.getPreferences())
      .subscribe(preferences => {
        this.preferences = JSON.parse(!!preferences ? preferences : '{}');
        this.theme = new BehaviorSubject<string>(this.preferences.theme);
      });
  }

  get currentTheme$() {
    return this.theme.asObservable();
  }

  saveTheme(isDarkMode: boolean) {
    this.preferences.theme = isDarkMode ? 'dark' : 'light';
    this.theme.next(this.preferences.theme);
    this.webViewService.savePreferences(JSON.stringify(this.preferences));
  }
}
