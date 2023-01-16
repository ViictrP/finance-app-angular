import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getPreferences, savePreferences } from '../../lib/helper/webViewHelper';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

type Preferences = {
  theme: 'dark' | 'light';
};

@Injectable()
export class PreferencesService {
  preferences: Preferences;
  theme: BehaviorSubject<string>;

  constructor() {
    this.preferences = {} as Preferences;
    this.theme = new BehaviorSubject<string>('');
    fromPromise(getPreferences())
      .subscribe(preferences => {
        this.preferences = JSON.parse(preferences ?? {});
        this.theme = new BehaviorSubject<string>(this.preferences.theme);
      });
  }

  get currentTheme$() {
    return this.theme.asObservable();
  }

  saveTheme(isDarkMode: boolean) {
    this.preferences.theme = isDarkMode ? 'dark' : 'light';
    this.theme.next(this.preferences.theme);
    savePreferences(JSON.stringify(this.preferences));
  }
}
