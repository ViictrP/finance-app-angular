import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BalanceComponent} from './balance.component';
import {UserService} from '../../services/user.service';
import {BalanceService} from '../../services/balance.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InputDateComponent} from '../../../lib/components/form/input/input-date.component';
import {CardComponent} from '../../../lib/components/card/card.component';
import {InputComponent} from '../../../lib/components/form/input/input.component';
import {FormModule} from '../../../form.module';
import TransactionService from '../../services/transaction.service';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BalanceComponent,
        InputDateComponent,
        CardComponent,
        InputComponent,
        ModalComponent,
        IconButtonComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormModule
      ],
      providers: [
        UserService,
        BalanceService,
        TransactionService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
