import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SecuredComponent} from './secured.component';
import {LoginService} from '../../public/services/login.service';
import {PublicModule} from '../../public/public.module';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('SecuredComponent', () => {
  let component: SecuredComponent;
  let fixture: ComponentFixture<SecuredComponent>;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecuredComponent],
      imports: [
        PublicModule,
        RouterTestingModule
      ],
      providers: [LoginService]
    }).compileComponents();

    fixture = TestBed.createComponent(SecuredComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should log out with success', () => {
    const logOutSpy = jest.spyOn(loginService, 'logOut');
    const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
    component.logOut();

    expect(logOutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
