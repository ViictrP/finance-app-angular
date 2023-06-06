import {ObservableDirective} from './observable.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreditCardsComponent} from '../../secure/components/credit-cards/credit-cards.component';
import {UserService} from '../../secure/services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {InputComponent} from '../components/form/input/input.component';
import {BottomSheetComponent} from '../components/bottom-sheet/bottom-sheet.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonComponent} from '../components/buttons/button.component';
import {IconButtonComponent} from '../components/buttons/icon-button.component';
import {FormModule} from '../../form.module';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import TransactionService from '../../secure/services/transaction.service';
import { ModalComponent } from '../components/modal/modal.component';
import { CreditCardService } from '../../secure/services/credit-card.service';

describe('ObservableDirective', () => {
  let component: CreditCardsComponent;
  let fixture: ComponentFixture<CreditCardsComponent>;
  let observed: DebugElement[];

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      declarations: [
        ObservableDirective,
        CreditCardsComponent,
        InputComponent,
        BottomSheetComponent,
        ButtonComponent,
        IconButtonComponent,
        ModalComponent
      ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormModule
      ],
      providers: [
        UserService,
        TransactionService,
        CreditCardService
      ]
    }).createComponent(CreditCardsComponent);

    component = fixture.componentInstance;
    component.user = {
      creditCards: [{
        id: 'test',
        title: 'test',
        invoices: []
      }]
    } as any;
    fixture.detectChanges();
    observed = fixture.debugElement.queryAll(By.directive(ObservableDirective));
  });

  it('Should be created', () => {
    console.log(observed);
    expect(observed).toBeTruthy();
  });
});
