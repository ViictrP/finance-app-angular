import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardFormComponent } from './credit-card-form.component';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreditCardFormComponent', () => {
    let component: CreditCardFormComponent;
    let fixture: ComponentFixture<CreditCardFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, CreditCardFormComponent],
            providers: [provideHttpClient(withInterceptorsFromDi())],
        }).compileComponents();

        fixture = TestBed.createComponent(CreditCardFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
