import { TestBed } from '@angular/core/testing';

import { RecurringExpenseService } from './recurring-expense.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecurringExpenseService', () => {
  let service: RecurringExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RecurringExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
