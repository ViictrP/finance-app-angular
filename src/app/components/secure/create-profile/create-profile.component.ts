import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect } from '@angular/core';
import InputComponent from '../../../lib/components/form/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import UserDTO from '../../../dto/user.dto';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import ProfileDTO from '../../../dto/profile.dto';
import BaseComponent from '../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProfileComponent extends BaseComponent {

  user: UserDTO;
  form: FormGroup;

  constructor(readonly formBuilder: FormBuilder,
              readonly authService: AuthService,
              readonly changeDetector: ChangeDetectorRef,
              protected readonly profileService: ProfileService,
              private readonly router: Router) {
    super(changeDetector);
    this.user = authService.user;
    this.form = formBuilder.group({
      salary: [null, [Validators.required]]
    });

    effect(() => {
      if (this.profileService.profile()) {
        this.router.navigate(['secure/home']);
      }
    });
  }

  get salaryFormControlStatus() {
    return this.form.get('salary')?.status;
  }

  get salaryFormControlValue() {
    return this.form.get('salary')?.value;
  }

  validateSalaryField(): boolean {
    return this.salaryFormControlStatus === 'INVALID' || (this.salaryFormControlStatus === 'VALID' && this.salaryFormControlValue === "0");
  }

  async finishProfile() {
    const [name, lastname] = this.user.name.split(' ');
    const profile: Partial<ProfileDTO> = {
      name: name,
      lastname: lastname,
      email: this.user.email,
      password: this.user.profilePictureUrl,
      salary: this.salaryFormControlValue
    };

    this.subscribeAndRender(this.profileService.createProfile(profile as ProfileDTO),
      profile => {
        console.log(profile);
        this.router.navigate(['secure/home']);
      });
  }
}
