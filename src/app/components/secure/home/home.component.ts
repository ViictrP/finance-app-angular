import { Component, inject, Signal } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import { AsyncPipe, CurrencyPipe, JsonPipe, NgClass, NgOptimizedImage } from '@angular/common';
import {Router} from "@angular/router";
import UserDTO from '../../../dto/user.dto';
import ProfileDTO from '../../../dto/profile.dto';
import { ProfileService } from '../../../services/profile.service';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    NgOptimizedImage,
    AsyncPipe,
    CurrencyPipe,
    IconButtonComponent,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user: UserDTO;
  profile: Signal<ProfileDTO | null>;

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly profileService: ProfileService) {
    this.user = authService.user;
    this.profile = profileService.profile;
  }
}
