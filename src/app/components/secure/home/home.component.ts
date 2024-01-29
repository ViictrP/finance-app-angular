import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {JsonPipe, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user = inject(AuthService).user;

  constructor(private authService: AuthService, private router: Router) {
  }

  async logout() {
    this.authService.logout()
      .then(loggedOut => {
        if (loggedOut) {
          this.router.navigate(['login']);
        }
      });
  }
}
