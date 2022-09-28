import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardsComponent} from './credit-cards.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import User from '../../../entities/User';

describe('CreditCardsComponent', () => {
  let component: CreditCardsComponent;
  let fixture: ComponentFixture<CreditCardsComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreditCardsComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set user on init', () => {
    component.ngOnInit();
    service.user$.next({id: 'test'} as User);

    expect(component.user!.id).toStrictEqual('test');
  });

  it('Should select credit card by id', () => {
    component.user = {creditCards: [{id: 'test'}]} as User;
    component.selectCreditCard('test');

    expect(component.selectedCreditCard!.id).toStrictEqual('test');
  });

  it('Should not select credit card if user doesnt have the credit card', () => {
    component.user = {creditCards: [{id: 'test'}]} as User;
    component.selectCreditCard('other');
    component.selectCreditCard(null as any);
    component.user = null as any;
    component.selectCreditCard('other');

    expect(component.selectedCreditCard).toBeUndefined();
  });
});
