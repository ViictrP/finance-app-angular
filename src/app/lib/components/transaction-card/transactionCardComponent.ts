import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
  ],
  template: `
    <div
      class="grid grid-cols-3 grid-rows-1 bg-white border-amber-50 border pt-4 pb-4 pr-4 pl-1 rounded-2xl text-black">
      <div class="grid grid-cols-4 grid-rows-1 col-span-2">
        <div class="m-auto">
          <img ngSrc="./assets/svg/bill.svg" alt="bill icon" height="40" width="40">
        </div>
        <div class="grid grid-cols-1 grid-rows-2 col-span-3">
          <div class="text-left text-sm text-gray-500">{{ title }}</div>
          <div class="text-left font-bold">{{ description }}</div>
        </div>
      </div>
      <div class="text-right mt-auto mb-auto">
        <p>{{ value | currency: 'BRL' }}</p>
      </div>
    </div>
  `,
})
export default class TransactionCardComponent {

  @Input( { required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) value!: string
}
