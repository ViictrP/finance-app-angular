import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreditCardFormComponent} from './credit-card-form.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormModule} from '../../../form.module';
import {CreditCardService} from '../../services/credit-card.service';

describe('AddCreditCard', () => {
  let component: CreditCardFormComponent;
  let fixture: ComponentFixture<CreditCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormModule
      ],
      providers: [
        UserService,
        CreditCardService
      ]
    });

    fixture = TestBed.createComponent(CreditCardFormComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
