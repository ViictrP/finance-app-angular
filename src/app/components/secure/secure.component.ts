import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { BottomNavComponent } from '../../lib/components/bottom-nav/bottom-nav.component';
import { HeaderComponent } from '../../lib/components/header/header.component';

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
      <app-bottom-nav />
  `
})
export class SecureComponent {

}
