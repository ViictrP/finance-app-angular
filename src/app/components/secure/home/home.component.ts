import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {JsonPipe, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import UserDTO from '../../../dto/user.dto';

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

  user: UserDTO;

  constructor(private authService: AuthService,
              private router: Router) {
    this.user = authService.user;
  }
}
