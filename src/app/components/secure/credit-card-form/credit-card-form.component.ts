import { Component } from '@angular/core';
import InputComponent from '../../../lib/components/form/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.scss'
})
export class CreditCardFormComponent {

  formGroup: FormGroup;

  constructor(readonly formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      number: [null, [Validators.required]],
      invoiceClosingDay: [null, [Validators.required]],
      color: [null, []],
    });
  }

  createCreditCard() {

  }
}
