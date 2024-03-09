import { Router, RouterModule } from '@angular/router';
import { BottomSheetComponent } from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import { Component, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../lib/components/buttons/button.component';

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
        [ngClass]="{'bg-zinc-200 border-zinc-300 text-sky-500': showingBottomSheet}"
        class="text-gray-500 dark:text-gray-300 flex m-auto h-14 w-14 text-5xl border-[0.5px] border-zinc-200 dark:border-zinc-500 rounded-full transition-colors">
        <i class="m-auto ph-plus-fill"></i>
      </button>
      <app-icon-button
        size="ultra-big"
        icon="ph-credit-card-fill"
        routerLinkActive="link-active"
        class="flex m-auto text-gray-500 dark:text-gray-300"
        routerLink="/secure/credit-cards" />
    </div>
    <app-bottom-sheet title="Menu" #bottomSheet (closed)="showingBottomSheet = false;">
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
  showingBottomSheet = false;

  constructor(private readonly router: Router) {
  }

  showBottomSheet() {
    this.bottomSheet?.show();
    this.showingBottomSheet = true;
  }

  addCreditCard() {
    this.router.navigate(['secure/create-credit-card']);
    this.bottomSheet?.close();
  }

  addTransaction() {
    this.router.navigate(['/secure/transaction-form']);
    this.bottomSheet?.close();
  }
}
