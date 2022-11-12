import {LoggedInGuard} from './logged-in.guard';
import {LoginService} from '../public/services/login.service';
import {Router} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {PublicModule} from '../public/public.module';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicModule],
      providers: [LoginService, LoggedInGuard]
    });
    guard = TestBed.inject(LoggedInGuard);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('Should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Should return true if user is logged in', async () => {
    const promise = new Promise<boolean>((resolve) => resolve(true));
    jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => promise);
    const canActivate = await guard.canActivate({} as any, {} as any);

    expect(canActivate).toBeTruthy();
  });

  it('Should return false and navigate to login page if user is not logged in', async () => {
    const promise = new Promise<boolean>((resolve) => resolve(false));
    jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => promise);
    jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
    const navigateSpy = jest.spyOn(router, 'navigate');
    const canActivate = await guard.canActivate({} as any, {} as any);

    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
