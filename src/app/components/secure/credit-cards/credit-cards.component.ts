import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import BaseComponent from '../base.component';
import { ProfileService } from '../../../services/profile.service';
import CreditCardDTO from '../../../dto/credit-card.dto';
import { CurrencyPipe, NgClass, NgOptimizedImage } from '@angular/common';
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
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss',
})
export class CreditCardsComponent extends BaseComponent {

  profileLoading = false;
  creditCards: CreditCardDTO[] = [];
  selectedCreditCard?: CreditCardDTO;

  @ViewChild('modal') modal?: ModalComponent;
  @ViewChild('deletedModal') deletedModal?: ModalComponent;

  constructor(changeDetectorRef: ChangeDetectorRef,
              readonly profileService: ProfileService,
              private readonly service: CreditCardService,
              private readonly router: Router) {
    super(changeDetectorRef);

    this.profileLoading = profileService.loading;
    effect(() => {
      this.creditCards = profileService.profile()?.creditCards ?? [];
      this.selectedCreditCard = this.creditCards[0];
      this.profileLoading = profileService.loading;
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
}
