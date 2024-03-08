import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    RouterOutlet,
    BottomNavComponent,
    HeaderComponent,
  ],
  template: `
      <div class="wrapper mb-16">
        <app-header />
        <main>
          <router-outlet />
        </main>
      </div>
      @if (router.url !== '/secure/create-profile') {
        <app-bottom-nav />
      }
  `
})
export class SecureComponent {

  constructor(protected readonly router: Router) {
  }
}
