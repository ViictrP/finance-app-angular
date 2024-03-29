import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import UserDto from '../../../dto/user.dto';
import {UserService} from '../../services/user.service';
import CreditCardDto from '../../../dto/credit-card.dto';
import TransactionDto from '../../../dto/transaction.dto';
import {BottomSheetComponent} from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../lib/components/BaseComponent';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import TransactionService from '../../services/transaction.service';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardsComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;
  @ViewChild('deleteTransactionModal') deleteTransactionModal: ModalComponent | undefined;

  user?: UserDto;
  selectedCreditCard?: CreditCardDto;
  creditCards: CreditCardDto[] = [];
  transactions: TransactionDto[] = [];
  selectedTransaction?: TransactionDto;
  invoiceTotalAmount: number | undefined;

  constructor(private readonly userService: UserService,
              private readonly service: CreditCardService,
              private readonly transactionService: TransactionService,
              private readonly router: Router,
              detector: ChangeDetectorRef) {
    super(detector);
  }

  private get userTransactions(): TransactionDto[] {
    if (this.selectedCreditCard?.invoices.length) {
      return this.selectedCreditCard?.invoices[0].transactions;
    }
    return [];
  }

  private get userCreditCards(): CreditCardDto[] {
    return this.user!.creditCards;
  }

  ngOnInit(): void {
    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.user = user;
      this.creditCards = this.user.creditCards;
    });
  }

  selectCreditCard(elementId: string) {
    if (elementId) {
      this.selectedCreditCard = this.userCreditCards.find(c => c.id === elementId);
      if (this.selectedCreditCard) {
        this.transactions = this.userTransactions;
        this.invoiceTotalAmount = this.transactions.reduce(
          (sum, transaction) => {
            return sum + Number(transaction.amount);
          }, 0
        );
      }
    }
  }

  filterCreditCards(text: string) {
    if (text) {
      this.creditCards = this.userCreditCards.filter(
        c => c.title.toLowerCase().includes(text.toLowerCase()));
      if (!this.creditCards.length) {
        this.selectedCreditCard = undefined;
        this.transactions = [];
        this.invoiceTotalAmount = undefined;
      }
    } else {
      this.creditCards = this.userCreditCards;
    }
  }

  filterTransactions(text: string) {
    if (text) {
      this.transactions = this.userTransactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.transactions = this.userTransactions;
    }
  }

  toggleBottomSheet() {
    this.bottomSheet?.show();
  }

  goToInvoices(creditCardId?: string) {
    this.bottomSheet?.close();
    this.router.navigate(['/secure/credit-cards', creditCardId]);
  }

  editCreditCard(creditCardId?: string) {
    this.bottomSheet?.close();
    this.router.navigate(['/secure/credit-card-form', creditCardId]);
  }

  excludeCreditCard(creditCard: CreditCardDto) {
    this.subscribeAndRender(this.service.delete(creditCard),
      () => {
        this.creditCards = this.user!.creditCards;
        this.bottomSheet?.close();
        this.selectedCreditCard = undefined;
        this.transactions = [];
      });
  }

  editTransaction(transaction: TransactionDto) {
    this.selectedTransaction = transaction;
    this.deleteTransactionModal?.show();
  }

  deleteTransaction(all = false) {
    if (this.selectedTransaction) {
      this.subscribeAndRender(
        this.transactionService.delete(this.selectedTransaction.id!, all),
        () => {
          const transactions = this.selectedCreditCard!
            .invoices[0]
            .transactions;

          transactions.splice(transactions.findIndex(t => t.id === this.selectedTransaction!.id!), 1);
          this.deleteTransactionModal?.close();
        }
      );
    }
  }
}
