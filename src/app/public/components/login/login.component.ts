import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import LoginDto from '../../../dto/login.dto';
import { Router } from '@angular/router';
import { WebViewService } from '../../../lib/service/web-view.service';
import { BaseComponent } from '../../../lib/components/BaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent {

  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly service: LoginService,
              private readonly router: Router,
              private readonly webviewService: WebViewService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
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

  login() {
    const request = this.formGroup.value as LoginDto;
    this.subscribeAndRender(this.service.login(request), response => {
      this.webviewService.saveToken(response.accessToken);
      this.router.navigate(['/secure/home']);
    });
  }
}
