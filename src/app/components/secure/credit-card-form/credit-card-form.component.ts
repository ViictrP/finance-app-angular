import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import InputComponent from '../../../lib/components/form/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import BottonNavInputComponent from '../../../lib/components/form/botton-nav.input.component';
import BaseComponent from '../base.component';
import CreditCardService from '../../../services/credit-card.service';
import { create } from 'node:domain';
import { ModalComponent } from '../../../lib/components/modals/modal.component';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NgClass,
    BottonNavInputComponent,
    ModalComponent,
  ],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.scss'
})
export class CreditCardFormComponent extends BaseComponent{

  @ViewChild('modal') modal?: ModalComponent;

  formGroup: FormGroup;

  constructor(readonly formBuilder: FormBuilder,
              changeDetectorRef: ChangeDetectorRef,
              private readonly creditCardService: CreditCardService) {
    super(changeDetectorRef);
    this.formGroup = formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      number: [null, [Validators.required]],
      invoiceClosingDay: [null, [Validators.required]],
      color: [null, []],
    });
  }

  createCreditCard() {
    this.subscribeAndRender(
      this.creditCardService.createCreditCard({
        ...this.formGroup.value,
        backgroundColor: this.formGroup.value.color
      }),
      () => {
        this.modal?.show();
      }
    )
  }
}
