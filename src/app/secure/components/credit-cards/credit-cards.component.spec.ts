import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCardsComponent} from './credit-cards.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import User from '../../../entities/User';
import {InputComponent} from '../../../lib/components/form/input/input.component';
import {FormModule} from '../../../form.module';
import TransactionService from '../../services/transaction.service';
import { BottomSheetComponent } from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import { ButtonComponent } from '../../../lib/components/buttons/button.component';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';

describe('CreditCardsComponent', () => {
  let component: CreditCardsComponent;
  let fixture: ComponentFixture<CreditCardsComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormModule],
      declarations: [
        CreditCardsComponent,
        InputComponent,
        BottomSheetComponent,
        ButtonComponent,
        ModalComponent,
        IconButtonComponent
      ],
      providers: [
        UserService,
        TransactionService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(UserService);
  });

  beforeEach(() => {
    component.user = {
      creditCards: [{
        id: 'test',
        invoices: [{
          id: 'test',
          transactions: [{
            id: 'test',
            description: 'test'
          }]
        }]
      }]
    } as User;
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
    component.selectCreditCard('test');

    expect(component.selectedCreditCard!.id).toStrictEqual('test');
  });
});
