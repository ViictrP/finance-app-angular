import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import TransactionDTO from '../../../dto/transaction.dto';
import RecurringExpenseDTO from '../../../dto/recurring-expense.dto';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
  ],
  template: `
    <div class="w-full flex flex-row justify-between items-center bg-white p-4 rounded-md border-zinc-200 mb-2">
      <div>
        <div class="flex flex-row gap-5 items-center">
          <i class="{{getCategoryIcon(transaction.category)}} text-2xl text-zinc-900"></i>
          <div>
            <p class="text-sm text-zinc-500">{{ getCategoryTranslation(transaction.category) }}</p>
            <p class="text-md">{{ transaction.description }}</p>
          </div>
        </div>
      </div>
      <p class="text-lg font-bold">{{ transaction.amount | currency: 'BRL' }}</p>
    </div>
  `,
})
export default class TransactionCardComponent {

  @Input( { required: true }) transaction!: TransactionDTO | RecurringExpenseDTO;

  categoryIconMap = new Map<string, string>();
  categoryTranslationMap = new Map<string, string>();

  constructor() {
    this.categoryIconMap.set('home', 'ph-house-simple');
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
}
