import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecurringExpensesFormComponent } from './recurring-expenses-form.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecurringExpensesFormComponent', () => {
  let component: RecurringExpensesFormComponent;
  let fixture: ComponentFixture<RecurringExpensesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringExpensesFormComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    fixture = TestBed.createComponent(RecurringExpensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy()
  });
});
