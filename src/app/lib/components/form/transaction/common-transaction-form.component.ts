import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../select/select.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Transaction from '../../../../entities/Transaction';
import Invoice from '../../../../entities/Invoice';

@Component({
  selector: 'app-common-transaction-form',
  templateUrl: './common-transaction-form.component.html',
  styleUrls: ['./common-transaction-form.component.scss'],
})
export class CommonTransactionFormComponent {

  @Input() creditCards?: SelectOption[];
  @Input() loading = false;
  @Input() hiddenFields?: string[];
  @Output() submitted = new EventEmitter<Transaction>();
  @Input() showTitle = true;
  form: FormGroup;
  categoryOptions = [
    {
      value: 'food',
      label: 'Restaurante',
    },
    {
      value: 'credit-card',
      label: 'Cartão',
    },
    {
      value: 'home',
      label: 'Casa',
    },
    {
      value: 'shop',
      label: 'Shop',
    },
    {
      value: 'other',
      label: 'Outro',
    },
  ];

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      creditCard: [null, []],
      date: [new Date(), [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, Validators.required],
      amount: [null, Validators.required],
      installmentAmount: [null, []],
    });
  }

  get creditCard() {
    return this.form.get('creditCard');
  }

  get date() {
    return this.form.get('date');
  }

  get category() {
    return this.form.get('category');
  }

  get description() {
    return this.form.get('description');
  }

  get amount() {
    return this.form.get('amount');
  }

  get installmentAmount() {
    return this.form.get('installmentAmount');
  }

  save() {
    const transaction: Transaction = {
      isInstallment: Number(this.form.value.installmentAmount) > 1,
      date: this.form.value.date,
      category: this.form.value.category,
      description: this.form.value.description,
      amount: this.form.value.amount,
      installmentAmount: this.form.value.installmentAmount
    };

    if (this.form.value.creditCard) {
      transaction.invoice = {
        creditCard: {
          id: this.form.value.creditCard
        }
      } as Invoice;
    }
    this.submitted.emit(transaction);
  }
}
