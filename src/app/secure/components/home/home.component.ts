import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';
import Transaction from '../../../entities/Transaction';
import {Router} from '@angular/router';
import CreditCard from '../../../entities/CreditCard';
import {BaseComponent} from '../BaseComponent';
import {calculateExpensesHelper} from '../../helper/calculateExpenses.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent implements OnInit {
  user?: User;
  filteredTransactions: Transaction[] = [];
  expensesAmount = 0;

  constructor(private readonly userService: UserService,
              private readonly router: Router,
              detector: ChangeDetectorRef) {
    super(detector);
  }

  get transactions(): Transaction[] {
    return this.user!.transactions;
  }

  get creditCards(): CreditCard[] {
    return this.user?.creditCards ?? [];
  }

  ngOnInit(): void {
    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.user = user;
      this.calculateExpensesAmout();
      this.filteredTransactions = this.user?.transactions ?? [];
    });
  }

  filterTransactions(text: string) {
    if (text) {
      this.filteredTransactions = this.transactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }

  goToInvoices(creditCardId: string) {
    this.router.navigate(['/secure/credit-cards', creditCardId]);
  }

  creditCardsTotal: { [key: string]: number } = {};

  private calculateExpensesAmout() {
    const [total, creditCardsTotal] = calculateExpensesHelper((this.user?.transactions || []), this.creditCards);
    this.expensesAmount = total;
    this.creditCardsTotal = creditCardsTotal;
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount) * 100)).toFixed(2);
  }
}
