import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonTransactionFormComponent } from './common-transaction-form.component';
import { FormModule } from '../../../../form.module';
import { LoadingButtonComponent } from '../../buttons/loading-button.component';

describe('CommonTransactionFormComponent', () => {
  let fixture: ComponentFixture<CommonTransactionFormComponent>;
  let component: CommonTransactionFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormModule],
      declarations: [
        CommonTransactionFormComponent,
        LoadingButtonComponent,
      ],
    });

    fixture = TestBed.createComponent(CommonTransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Getters should return values', () => {
    expect(component.creditCard).toBeTruthy();
    expect(component.date).toBeTruthy();
    expect(component.category).toBeTruthy();
    expect(component.description).toBeTruthy();
    expect(component.amount).toBeTruthy();
    expect(component.installmentAmount).toBeTruthy();
  });

  it('Should emit save event', () => {
    const emitSpy = jest.spyOn(component.submitted, 'emit');
    component.form.setValue({
      creditCard: 1,
      date: '2023-01-13T21:17:37.243Z',
      category: 1,
      description: 'test',
      amount: 100,
      installmentAmount: 10,
    });
    component.save();
    expect(emitSpy).toHaveBeenCalledWith({
      amount: 100,
      category: 1,
      date: '2023-01-13T21:17:37.243Z',
      description: 'test',
      installmentAmount: 10,
      invoice: {
        creditCard: {
          id: 1,
        },
      },
      isInstallment: true,
    });
  });
});
