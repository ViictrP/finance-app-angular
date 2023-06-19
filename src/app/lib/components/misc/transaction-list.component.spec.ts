import { TransactionListComponent } from './transaction-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });
});
