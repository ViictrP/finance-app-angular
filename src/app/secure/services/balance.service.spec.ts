import {TestBed} from '@angular/core/testing';

import {BalanceService} from './balance.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
