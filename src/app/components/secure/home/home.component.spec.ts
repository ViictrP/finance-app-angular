import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { firebaseAppConfig, firebaseAppModules } from '../../../helper/testing/firebase-mock.helper';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

jest.mock('ngx-cookie-service');

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const cookieService = {
    get: jest.fn()
  };

  beforeEach(async () => {
    TestBed.overrideComponent(HomeComponent, {
      add: {
        providers: [
          {
            provide: AuthService,
            useValue: AuthService
          },
          {
            provide: CookieService,
            useValue: cookieService
          }
        ]
      }
    });

    await TestBed.configureTestingModule({
    imports: [firebaseAppModules,
        HomeComponent],
    providers: [
        firebaseAppConfig,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    cookieService.get.mockImplementationOnce(() => '{}');
    expect(component).toBeTruthy();
  });
});
