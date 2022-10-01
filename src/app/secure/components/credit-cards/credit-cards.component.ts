import {Component, OnInit, ViewChild} from '@angular/core';
import User from '../../../entities/User';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import CreditCard from '../../../entities/CreditCard';
import Transaction from '../../../entities/Transaction';
import {BottomSheetComponent} from '../../../lib/components/bottom-sheet.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent implements OnInit {

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;

  user?: User;
  selectedCreditCard?: CreditCard;
  creditCards: CreditCard[] = [];
  transactions: Transaction[] = [];
  invoiceTotalAmount: number | undefined;
  private subs = new Subscription();

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  private get userTransactions(): Transaction[] {
    if (this.selectedCreditCard?.invoices.length) {
      return this.selectedCreditCard?.invoices[0].transactions;
    }
    return [];
  }

  private get userCreditCards(): CreditCard[] {
    return this.user!.creditCards;
  }

  ngOnInit(): void {
    this.subs.add(this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.creditCards = this.user.creditCards;
    }));
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

  goToInvoices(creditCardId: string) {
    this.router.navigate(['/secure/credit-cards', creditCardId]);
  }

  editCreditCard(creditCardId: string) {
    this.router.navigate(['/secure/credit-cards-form', creditCardId]);
  }

  excludeCreditCard(creditCardId: string) {
    console.log('nothing to do here ', creditCardId);
  }
}
