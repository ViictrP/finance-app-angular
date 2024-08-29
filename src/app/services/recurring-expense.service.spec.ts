import { TestBed } from '@angular/core/testing';

import { RecurringExpenseService } from './recurring-expense.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('RecurringExpenseService', () => {
    let service: RecurringExpenseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(RecurringExpenseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
