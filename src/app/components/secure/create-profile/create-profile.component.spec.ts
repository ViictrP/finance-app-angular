import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileComponent } from './create-profile.component';
import { firebaseAppConfig, firebaseAppModules } from '../../../helper/testing/firebase-mock.helper';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

jest.mock('ngx-cookie-service');

describe('CreateProfileComponent', () => {
  let component: CreateProfileComponent;
  let fixture: ComponentFixture<CreateProfileComponent>;
  const cookieService = {
    get: jest.fn()
  };

  beforeEach(async () => {
    TestBed.overrideComponent(CreateProfileComponent, {
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
      imports: [
        HttpClientModule,
        CreateProfileComponent,
        ...firebaseAppModules,
      ],
      providers: [firebaseAppConfig],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    cookieService.get.mockImplementationOnce(() => '{}');
    expect(component).toBeTruthy();
  });
});
