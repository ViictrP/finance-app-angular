import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import TransactionService from '../../services/transaction.service';
import { CardComponent } from '../../../lib/components/card/card.component';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import { InputComponent } from '../../../lib/components/form/input/input.component';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import { FormModule } from '../../../form.module';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';
import { ToastService } from '../../../lib/components/toaster/toast.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CardComponent,
        IconButtonComponent,
        InputComponent,
        ModalComponent
      ],
      imports: [
        HttpClientTestingModule,
        FormModule
      ],
      providers: [
        UserService,
        TransactionService,
        RecurringExpensesService,
        ToastService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
