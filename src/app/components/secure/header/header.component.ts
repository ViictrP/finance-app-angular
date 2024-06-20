import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import UserDTO from '../../../dto/user.dto';
import { ProfileService } from '../../../services/profile.service';
import BaseComponent from '../base.component';
import ProfileDTO from '../../../dto/profile.dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IconButtonComponent,
    CommonModule,
    NgOptimizedImage,
  ],
  template: `
    <div id="header" class="h-14 px-4 dark:text-zinc-200 my-4 flex flex-row justify-between align-middle">
      <p class="inline-flex gap-2 text-2xl my-auto" *ngIf="user; else header_skeleton">
        <img
          class="object-cover rounded-full"
          ngSrc="{{user.profilePictureUrl}}"
          alt="user's profile picture"
          width="30" height="30"
          loading="eager" />
        <span class="font-bold">
      {{ user.name }}
    </span>
      </p>
      <div class="flex flex-row gap-4">
        <app-icon-button
          class="m-auto"
          size="big"
          icon="ph-gear-fill"
          (clicked)="editProfile()" />
        <app-icon-button
          class="m-auto"
          size="big"
          icon="ph-sign-out-fill"
          (clicked)="logOut()" />
      </div>
    </div>
    <ng-template #header_skeleton>
      <div role="status" class="max-w-sm rounded shadow animate-pulse md:p-6">
        <div class="flex items-center space-x-3">
          <svg class="w-14 h-14 text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"></path>
          </svg>
          <div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </ng-template>
  `,
})
export class HeaderComponent extends BaseComponent implements OnInit {

  user: UserDTO;
  profile: ProfileDTO | undefined;

  constructor(private readonly router: Router,
              private readonly authService: AuthService,
              private readonly profileService: ProfileService,
              readonly changeDetector: ChangeDetectorRef) {
    super(changeDetector);
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.subscribeAndRender(
      this.profileService.getProfile(),
      (profile) => this.profile = profile
    );
  }

  async editProfile() {
    await this.router.navigate(['/secure/profile']);
  }

  async logOut() {
    await this.authService.logout();
    await this.router.navigate(['public/login']);
  }
}
