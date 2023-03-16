import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import LoginRequest from '../../../dto/login.request';
import { Router } from '@angular/router';
import { MessageComponent } from '../../../lib/components/message/message.component';
import LoginResponse from '../../../dto/login.response';
import { WebViewService } from '../../../lib/service/web-view.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  @ViewChild('message') message?: MessageComponent;

  formGroup: FormGroup;
  loading = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly service: LoginService,
              private readonly router: Router,
              private readonly webviewService: WebViewService) {
    this.formGroup = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  handleError() {
    this.loading = false;
    this.message?.show('Usuário ou senha inválidos', 'ERROR');
  }

  handleSuccess(response: LoginResponse) {
    this.loading = false;
    this.webviewService.saveToken(response.accessToken);
    this.router.navigate(['/secure/home']);
  }

  login() {
    this.loading = true;
    const request = this.formGroup.value as LoginRequest;
    this.service.login(request)
      .subscribe({
        next: response => this.handleSuccess(response),
        error: error => this.handleError(),
      });
  }
}
