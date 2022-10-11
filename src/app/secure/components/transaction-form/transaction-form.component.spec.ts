import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TransactionFormComponent} from './transaction-form.component';
import {FormModule} from '../../../form.module';
import {UserService} from '../../services/user.service';
import TransactionService from '../../services/transaction.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoadingButtonComponent} from '../../../lib/components/buttons/loading-button.component';

describe('TransactionForm', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFormComponent, LoadingButtonComponent],
      imports: [FormModule, HttpClientTestingModule],
      providers: [UserService, TransactionService]
    });

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
