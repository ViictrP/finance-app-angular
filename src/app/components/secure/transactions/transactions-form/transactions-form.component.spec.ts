import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFormComponent } from './transactions-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('TransactionsFormComponent', () => {
  let component: TransactionsFormComponent;
  let fixture: ComponentFixture<TransactionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TransactionsFormComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
