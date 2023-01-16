import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../secure/components/BaseComponent';
import 'flowbite';
import { DARK_THEME, LIGHT_THEME, PreferencesService } from '../secure/services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Finance App';
  theme = 'light';

  constructor(readonly changeDetector: ChangeDetectorRef,
              private readonly themeService: PreferencesService) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.subscribeAndRender(
      this.themeService.currentTheme$,
      theme => {
        if (theme === LIGHT_THEME) {
          document.documentElement.classList.remove(DARK_THEME);
        }
        document.documentElement.classList.add(theme);
      },
    );
  }
}
