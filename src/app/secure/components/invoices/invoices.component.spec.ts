import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InvoicesComponent} from './invoices.component';
import {RoutingModule} from '../../../routing.module';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('InvoicesComponent', () => {
  let component: InvoicesComponent;
  let fixture: ComponentFixture<InvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicesComponent],
      imports: [RoutingModule, HttpClientTestingModule],
      providers: [UserService]
    })

    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });
});
