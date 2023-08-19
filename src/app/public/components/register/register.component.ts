import {ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from '../../../lib/components/BaseComponent';
import {RegisterService} from '../../services/register.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {

  form: FormGroup;

  constructor(detector: ChangeDetectorRef,
              formBuilder: FormBuilder,
              private readonly service: RegisterService,
              private readonly loginService: LoginService,
              private readonly router: Router) {
    super(detector);
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  register() {
    this.loading = true;
    this.subscribeAndRender(
      this.service.register(this.form.value),
      () => {
        this.loginService.login({
          email: this.form.value.email,
          password: this.form.value.password
        }).subscribe(() => {
          this.loading = false;
          this.router.navigate(['/secure/home']);
        });
      }
    )
  }

}
