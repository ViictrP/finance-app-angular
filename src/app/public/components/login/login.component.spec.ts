import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [LoginService]
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

  it('given a valid login request object then should handle login with success', () => {
    const loginSpy = jest.spyOn(service, 'login').mockImplementation(() => of({accessToken: ''}));
    const handleSuccessSpy = jest.spyOn(component, 'handleSuccess');
    const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
    component.formGroup.setValue({
      email: 'admin@admin.com',
      password: 'password'
    });

    component.login();
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'admin@admin.com',
      password: 'password'
    });
    expect(handleSuccessSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/secure/home']);
  });

  it('given a valid login request object then should handle login with error', () => {
    const loginSpy = jest.spyOn(service, 'login').mockImplementation(() => throwError(() => {
    }));
    const handleErrorSpy = jest.spyOn(component, 'handleError');
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.formGroup.setValue({
      email: 'admin@admin.com',
      password: 'password'
    });

    component.login();
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'admin@admin.com',
      password: 'password'
    });
    expect(handleErrorSpy).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
