import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    firebaseAppModules,
    firebaseAppConfig,
} from '../../../helper/testing/firebase-mock.helper';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, ...firebaseAppModules],
            providers: [
                AuthService,
                AngularFireAuth,
                firebaseAppConfig,
                provideHttpClient(withInterceptorsFromDi()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
