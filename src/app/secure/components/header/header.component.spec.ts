import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {LoginService} from '../../../public/services/login.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../services/user.service';
import {of} from 'rxjs';
import UserDto from '../../../dto/user.dto';
import { WebViewService } from '../../../lib/service/web-view.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: LoginService;
  let userService: UserService;
  let router: Router;

  const _user: UserDto = {
    active: true,
    createdAt: new Date(),
    creditCards: [],
    email: 'email@email.com',
    id: 'QPOEQPWIRS',
    lastname: 'User',
    name: 'User',
    password: 'PQIWORUSLU##!@',
    transactions: [],
    recurringExpenses: [],
    monthClosures: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [LoginService, UserService, WebViewService]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should fetch user profile on init', () => {
    jest.spyOn(userService, 'getProfile').mockImplementation(() => of(_user));
    component.ngOnInit();

    component.user$?.subscribe(user => expect(user).toStrictEqual(_user));
  });

  it('Should log out with success', () => {
    const logOutSpy = jest.spyOn(loginService, 'logOut');
    const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
    component.logOut();

    expect(logOutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/public/login']);
  });
});
