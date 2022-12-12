import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecurringExpensesFormComponent } from './recurring-expenses-form.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';

describe('RecurringExpensesFormComponent', () => {
  let component: RecurringExpensesFormComponent;
  let fixture: ComponentFixture<RecurringExpensesFormComponent>;
  let service: RecurringExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringExpensesFormComponent],
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        RecurringExpensesService
      ]
    });

    fixture = TestBed.createComponent(RecurringExpensesFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecurringExpensesService);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy()
  });
});
