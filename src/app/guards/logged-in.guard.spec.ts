import { LoginService } from '../public/services/login.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { PublicModule } from '../public/public.module';
import { loggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicModule],
      providers: [LoginService]
    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('Should return true if user is logged in', async () => {
    await TestBed.runInInjectionContext(async () => {
      const promise = new Promise<boolean>((resolve) => resolve(true));
      jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => promise);
      const canActivate = await loggedInGuard();

      expect(canActivate).toBeTruthy();
    });
  });

  it('Should return false and navigate to login page if user is not logged in', async () => {
    await TestBed.runInInjectionContext(async () => {
      const promise = new Promise<boolean>((resolve) => resolve(false));
      jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => promise);
      jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
      const navigateSpy = jest.spyOn(router, 'navigate');
      const canActivate = await loggedInGuard();

      expect(canActivate).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith(['/public/login']);
    })
  });
});
