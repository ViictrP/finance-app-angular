import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoice.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('InvoiceComponent', () => {
    let component: InvoiceComponent;
    let fixture: ComponentFixture<InvoiceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, InvoiceComponent],
            providers: [provideHttpClient(withInterceptorsFromDi())],
        }).compileComponents();

        fixture = TestBed.createComponent(InvoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
