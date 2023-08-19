import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DARK_THEME, LIGHT_THEME, PreferencesService } from '../secure/services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Finance App';
  theme = 'light';
  constructor(readonly changeDetector: ChangeDetectorRef,
              private readonly preferencesService: PreferencesService) {
  }

  ngOnInit(): void {
    this.preferencesService.currentTheme$.subscribe(
      theme => {
        document.documentElement.classList.remove(LIGHT_THEME);
        document.documentElement.classList.remove(DARK_THEME);
        document.documentElement.classList.add(!!theme ? theme : 'dark');
        this.changeDetector.detectChanges();
      });
  }
}
