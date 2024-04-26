import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import TransactionDTO from '../../../dto/transaction.dto';
import RecurringExpenseDTO from '../../../dto/recurring-expense.dto';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    DatePipe,
  ],
  template: `
    <div role="button" tabindex="0" (keydown)="click()" (click)="click()" class="w-full flex flex-row justify-between gap-5 items-center align-middle bg-white px-4 py-4 rounded-md border-zinc-200 mb-2">
      <i class="{{getCategoryIcon(transaction.category)}} text-2xl text-zinc-900"></i>
      <div class="flex-1 flex-row">
        <div class="flex flex-row justify-between">
          <p class="text-sm text-zinc-500">{{ getCategoryTranslation(transaction.category) }}</p>
          <p class="text-sm text-zinc-500 font-normal">{{transaction.date ?? transaction.createdAt | date: 'dd/MM/yy'}}</p>
        </div>
        <div class="flex flex-row justify-between">
          <p class="text-lg">
            {{ transaction.description }}&nbsp;
            <small class="text-gray-500">{{ getInstallmentLabel(transaction) }}</small>
          </p>
          <p class="text-lg font-bold">{{ transaction.amount | currency: 'BRL' }}</p>
        </div>
      </div>
    </div>
  `,
})
export default class TransactionCardComponent {

  @Input( { required: true }) transaction!: TransactionDTO | RecurringExpenseDTO;
  @Output() clicked = new EventEmitter<TransactionDTO>();

  categoryIconMap = new Map<string, string>();
  categoryTranslationMap = new Map<string, string>();

  constructor() {
    this.categoryIconMap.set('home', 'ph-shopping-cart-simple');
    this.categoryIconMap.set('food', 'ph-hamburger');
    this.categoryIconMap.set('credit-card', 'ph-cards');
    this.categoryIconMap.set('shop', 'ph-shopping-bag-open');
    this.categoryIconMap.set('other', 'ph-barcode');

    this.categoryTranslationMap.set('home', 'Casa');
    this.categoryTranslationMap.set('food', 'Restaurante');
    this.categoryTranslationMap.set('credit-card', 'Cartão de Crédito');
    this.categoryTranslationMap.set('shop', 'Shop');
    this.categoryTranslationMap.set('other', 'Outros');
  }

  getCategoryIcon(category: string): string {
    return this.categoryIconMap.get(category)!;
  }

  getCategoryTranslation(category: string): string {
    return this.categoryTranslationMap.get(category)!;
  }

  getInstallmentLabel(transaction: TransactionDTO | RecurringExpenseDTO): string {
    const t = transaction as TransactionDTO;
    if (t.isInstallment) {
      return `(${t.installmentNumber}/${t.installmentAmount})`;
    }
    return '';
  }

  click() {
    this.clicked.emit(this.transaction as TransactionDTO);
  }
}
