import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import LoginRequest from '../../../dto/login.request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup;
  loading = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly service: LoginService,
              private readonly router: Router) {
    this.formGroup = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  handleError(error: any) {
    this.loading = false;
    console.log(error);
  }

  handleSuccess() {
    this.loading = false;
    this.router.navigate(['/secure/home']);
  }

  login() {
    this.loading = true;
    const request = this.formGroup.value as LoginRequest;
    this.service.login(request)
      .subscribe({
        next: () => this.handleSuccess(),
        error: error => this.handleError(error)
      });
  }
}
