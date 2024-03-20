import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import BaseComponent from '../base.component';
import { ProfileService } from '../../../services/profile.service';
import CreditCardDTO from '../../../dto/credit-card.dto';
import { CurrencyPipe, DatePipe, NgClass, NgOptimizedImage } from '@angular/common';
import ChipComponent from '../../../lib/components/chip/chip.component';
import CardComponent from '../../../lib/components/card/card.component';
import CardCarouselComponent from '../../../lib/components/card/card-carousel.component';
import TransactionDTO from '../../../dto/transaction.dto';
import NoDataComponent from '../../../lib/components/no-data/no-data.component';
import LoadingComponent from '../../../lib/components/loading/loading.component';
import TransactionCardComponent from '../../../lib/components/transaction-card/transactionCardComponent';
import { ModalComponent } from '../../../lib/components/modals/modal.component';
import { Router } from '@angular/router';
import CreditCardService from '../../../services/credit-card.service';
import currencyMasker from '../../../lib/helpers/currency.masker';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';

@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ChipComponent,
    CardComponent,
    NgClass,
    CardCarouselComponent,
    CurrencyPipe,
    NoDataComponent,
    LoadingComponent,
    TransactionCardComponent,
    ModalComponent,
    DatePipe,
    IconButtonComponent,
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardsComponent extends BaseComponent {

  isProfileLoading = false;
  creditCards: CreditCardDTO[] = [];
  selectedCreditCard?: CreditCardDTO;
  today = new Date();

  @ViewChild('modal') modal?: ModalComponent;
  @ViewChild('deletedModal') deletedModal?: ModalComponent;

  constructor(changeDetectorRef: ChangeDetectorRef,
              readonly profileService: ProfileService,
              private readonly service: CreditCardService,
              private readonly router: Router) {
    super(changeDetectorRef);

    this.isProfileLoading = profileService.loading;
    effect(() => {
      this.creditCards = profileService.profile()?.creditCards ?? [];
      this.selectedCreditCard = this.creditCards[0];
      this.isProfileLoading = profileService.loading;
      changeDetectorRef.detectChanges();
    });
  }

  get transactions(): TransactionDTO[] {
    if (this.selectedCreditCard?.invoices[0]) {
      return this.selectedCreditCard!.invoices![0].transactions;
    }
    return [];
  }

  selectCreditCard(creditCardId: string) {
    this.selectedCreditCard = this.creditCards.find(card => card.id === creditCardId);
  }

  calculateInvoiceTotal() {
    const reduced = this.transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    return `R$${currencyMasker(reduced.toFixed(2).toString())[0]}`;
  }

  async editCreditCard(creditCardId: string) {
    return this.router.navigate(['secure/edit-credit-cards/' + creditCardId]);
  }

  deleteCreditCard() {
    this.subscribeAndRender(
      this.service.deleteCreditCard(this.selectedCreditCard!.id),
      () => {
        this.creditCards.splice(this.creditCards.indexOf(this.selectedCreditCard!), 1);
        this.modal?.close();
        this.deletedModal?.show();
      }
    );
  }

  async goToInvoices(creditCardId: string) {
    return this.router.navigate([`secure/credit-cards/${creditCardId}/invoices`]);
  }
}
