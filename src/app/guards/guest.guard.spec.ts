// import {TestBed} from '@angular/core/testing';
// import {LoginService} from '../public/services/login.service';
// import {PublicModule} from '../public/public.module';
// import {GuestGuard} from './guest.guard';
// import {Router} from '@angular/router';
//
// describe('GuestGuard', () => {
//   let guard: GuestGuard;
//   let loginService: LoginService;
//   let router: Router;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [PublicModule],
//       providers: [LoginService, GuestGuard]
//     });
//     guard = TestBed.inject(GuestGuard);
//     loginService = TestBed.inject(LoginService);
//     router = TestBed.inject(Router);
//   });
//
//   it('Should be created', () => {
//     expect(guard).toBeTruthy();
//   });
//
//   it('Should return true if user is not logged in', () => {
//     jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => false);
//     const canActivate = guard.canActivate({} as any, {} as any);
//
//     expect(canActivate).toBeTruthy();
//   });
//
//   it('Should return false and navigate to home if user is logged in', () => {
//     jest.spyOn(loginService, 'isLoggedIn').mockImplementation(() => true);
//     jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
//     const navigateSpy = jest.spyOn(router, 'navigate');
//     const canActivate = guard.canActivate({} as any, {} as any);
//
//     expect(canActivate).toBeFalsy();
//     expect(navigateSpy).toHaveBeenCalledWith(['/secure/home']);
//   });
// });
