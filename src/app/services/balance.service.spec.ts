import { TestBed } from '@angular/core/testing';

import { BalanceService } from './balance.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('BalanceService', () => {
    let service: BalanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(BalanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
