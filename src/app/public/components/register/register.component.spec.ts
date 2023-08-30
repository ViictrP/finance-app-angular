import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterComponent} from './register.component';
import {FormModule} from '../../../form.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import {IconButtonComponent} from '../../../lib/components/buttons/icon-button.component';
import {LoadingButtonComponent} from '../../../lib/components/buttons/loading-button.component';
import { WebViewService } from '../../../lib/service/web-view.service';
import { ToastService } from '../../../lib/components/toaster/toast.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        IconButtonComponent,
        LoadingButtonComponent,
      ],
      imports: [
        FormModule,
        HttpClientTestingModule,
      ],
      providers: [
        LoginService,
        RegisterService,
        WebViewService,
        ToastService
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
