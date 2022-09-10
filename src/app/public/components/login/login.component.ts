import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import LoginRequest from '../../../entities/login.request';
import LoginResponse from '../../../entities/login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: LoginService) {
    this.formGroup = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  handleError(data: LoginResponse) {
    console.log(data);
  }

  handleSuccess(error: any) {
    console.log(error);
  }

  login() {
    const request = this.formGroup.value as LoginRequest;
    this.service.login(request)
      .subscribe({
        next: this.handleSuccess,
        error: this.handleError
      });
  }
}
