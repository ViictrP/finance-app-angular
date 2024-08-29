import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
    firebaseAppConfig,
    firebaseAppModules,
} from '../helper/testing/firebase-mock.helper';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [firebaseAppModules],
            providers: [
                firebaseAppConfig,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
