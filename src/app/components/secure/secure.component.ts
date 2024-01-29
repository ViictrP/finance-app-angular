import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
      <p>Hello World!</p>
      <router-outlet/>
  `
})
export class SecureComponent {

}
