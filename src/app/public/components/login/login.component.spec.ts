import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {LoginService} from '../../services/login.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {InputComponent} from '../../../lib/components/form/input/input.component';
import {FormModule} from '../../../form.module';
import { LoadingButtonComponent } from '../../../lib/components/buttons/loading-button.component';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import { WebViewService } from '../../../lib/service/web-view.service';
import { ToastService } from '../../../lib/components/toaster/toast.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoadingButtonComponent,
        IconButtonComponent,
        InputComponent
      ],
      imports: [
        FormModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LoginService,
        WebViewService,
        ToastService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    component.formGroup.setValue({
      email: 'admin@admin.com',
      password: 'password'
    });

    const emailValue = component.email?.value;
    const passwordValue = component.password?.value;
    expect(emailValue).toStrictEqual('admin@admin.com');
    expect(passwordValue).toStrictEqual('password');
  });
});
