import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreditCardFormComponent} from './credit-card-form.component';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormModule} from '../../../form.module';
import {CreditCardService} from '../../services/credit-card.service';
import { ToastService } from '../../../lib/components/toaster/toast.service';
import { LoadingButtonComponent } from '../../../lib/components/buttons/loading-button.component';

describe('AddCreditCard', () => {
  let component: CreditCardFormComponent;
  let fixture: ComponentFixture<CreditCardFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        CreditCardFormComponent,
        LoadingButtonComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormModule,
      ],
      providers: [
        UserService,
        CreditCardService,
        ToastService
      ],
    });

    fixture = TestBed.createComponent(CreditCardFormComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
