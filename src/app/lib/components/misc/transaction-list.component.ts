import { Component, EventEmitter, Input, Output } from '@angular/core';
import TransactionDto from '../../../dto/transaction.dto';

@Component({
  selector: 'app-transaction-list',
  template: `
    <ng-container *ngFor="let transaction of transactions">
      <div class="mb-4">
        <app-card [color]="'bg-white dark:bg-zinc-900'" (clicked)="editTransaction.emit(transaction)">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row justify-between">
              <p class="text-zinc-500 text-lg inline-flex items-center gap-1">
                <i class="{{transaction.category | category: true }}"></i>
                {{transaction.category | category }}&nbsp;&nbsp;
                <span
                  class="bg-yellow-300 px-2 rounded-md text-xs text-zinc-900"
                  *ngIf="transaction.recurring">recorrente</span>
              </p>
              <p class="text-zinc-500">{{transaction.date | date: 'dd/MMM'}}</p>
            </div>
            <div class="flex flex-row justify-between">
              <p class="my-auto text-lg">{{transaction.description}}</p>
              <p class="my-auto text-yellow-500 dark:text-yellow-200 text-xl font-bold">{{transaction.amount | currency: 'BRL'}}</p>
            </div>
          </div>
        </app-card>
      </div>
    </ng-container>
  `
})
export class TransactionListComponent {

  @Input() transactions: TransactionDto[] = [];
  @Output() editTransaction = new EventEmitter<TransactionDto>();

  constructor() {
  }
}
