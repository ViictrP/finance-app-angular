import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardsComponent} from './credit-cards.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CreditCardsComponent', () => {
  let component: CreditCardsComponent;
  let fixture: ComponentFixture<CreditCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreditCardsComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
