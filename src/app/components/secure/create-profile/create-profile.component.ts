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
import ToggleComponent from '../../../lib/components/form/toggle.component';
import BottonNavInputComponent from '../../../lib/components/form/botton-nav.input.component';
import { InputDateComponent } from '../../../lib/components/form/input-date.component';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NgClass,
    ToggleComponent,
    BottonNavInputComponent,
    InputDateComponent,
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
      salary: [null, [Validators.required]],
      conversion: [false, []],
      currencyConversionType: [null, []],
      monthClosureDay: [new Date(), [Validators.required]],
      currencyConversionTax: [null, []],
      salaryConverionTax: [null, []],
    });

    effect(() => {
      if (this.profileService.profile()) {
        this.router.navigate(['secure/home']);
      }
    });
  }

  get shouldDoConverion() {
    return this.form.get('conversion')?.value;
  }

  get salaryFormControlStatus() {
    return this.form.status;
  }

  get salaryFormControlValue() {
    return this.form.value;
  }

  get currencyConversion() {
    return this.form.get('currencyConversion')?.value;
  }

  validateSalaryField(): boolean {
    return this.salaryFormControlStatus === 'INVALID' || (this.salaryFormControlStatus === 'VALID' && this.salaryFormControlValue === "0") && this.currencyConversion;
  }

  async finishProfile() {
    const [name, lastname] = this.user.name.split(' ');
    const profile: Partial<ProfileDTO> = {
      name: name,
      lastname: lastname,
      email: this.user.email,
      password: this.user.profilePictureUrl,
      salary: this.salaryFormControlValue.salary,
      properties: {
        MONTH_CLOSURE_DAY: this.salaryFormControlValue.monthClosureDay,
        CURRENCY_CONVERSION: this.salaryFormControlValue.conversion,
        CURRENCY_CONVERSION_TYPE: this.salaryFormControlValue.currencyConversionType.id,
        CURRENCY: this.salaryFormControlValue.CURRENCY.id.split('-')[0],
        CURRENCY_CONVERSION_TAX: this.salaryFormControlValue.currencyConversionTax,
        SALARY_TAX: this.salaryFormControlValue.salaryConverionTax
      }
    };

    this.subscribeAndRender(this.profileService.createProfile(profile as ProfileDTO),
      profile => {
        console.log(profile);
        this.router.navigate(['secure/home']);
      });
  }
}
