import { Router, RouterModule } from '@angular/router';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Component, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../buttons/icon-button.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../buttons/button.component';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [
    IconButtonComponent,
    BottomSheetComponent,
    CommonModule,
    RouterModule,
    ButtonComponent,
  ],
  template: `
    <div
      id="bottom-nav"
      class="flex flex-row justify-around fixed z-50 w-full h-16 bottom-0 border-t-[0.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <app-icon-button
        size="ultra-big"
        icon="ph-house-simple-fill"
        class="flex m-auto text-gray-500 dark:text-gray-300"
        routerLinkActive="link-active"
        routerLink="/secure/home" />
      <button
        (click)="showBottomSheet()"
        class="flex m-auto h-14 w-14 text-5xl border-[0.5px] border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-700 rounded-full">
        <i class="m-auto ph-plus-fill text-gray-500 dark:text-gray-300"></i>
      </button>
      <app-icon-button
        size="ultra-big"
        icon="ph-credit-card-fill"
        routerLinkActive="link-active"
        class="flex m-auto text-gray-500 dark:text-gray-300"
        routerLink="/secure/credit-cards" />
    </div>
    <app-bottom-sheet title="Menu" #bottomSheet>
      <div class="flex flex-col gap-2 justify-evenly text-neutral-50">
        <app-button
          (click)="addCreditCard()"
          icon="ph-cards"
          type="plain">
          Novo Cartão
        </app-button>
        <app-button
          (clickEvent)="addTransaction()"
          icon="ph-list-plus-fill"
          type="plain">
          Nova Transação
        </app-button>
      </div>
    </app-bottom-sheet>
  `,
  styles: `
    .link-active {
      @apply text-sky-500;
    }
  `
})
export class BottomNavComponent {
  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;

  constructor(private readonly router: Router) {
  }

  showBottomSheet() {
    this.bottomSheet?.show();
  }

  addCreditCard() {
    this.router.navigate(['/secure/credit-card-form']);
    this.bottomSheet?.close();
  }

  addTransaction() {
    this.router.navigate(['/secure/transaction-form']);
    this.bottomSheet?.close();
  }
}
