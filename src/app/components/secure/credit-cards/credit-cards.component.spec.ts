import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardsComponent } from './credit-cards.component';
import { ProfileService } from '../../../services/profile.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CreditCardsComponent', () => {
  let component: CreditCardsComponent;
  let fixture: ComponentFixture<CreditCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreditCardsComponent],
    providers: [ProfileService, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
