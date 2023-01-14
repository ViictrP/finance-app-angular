import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import User from 'src/app/entities/User';
import { BaseComponent } from '../BaseComponent';
import { UserService } from '../../services/user.service';
import Transaction from '../../../entities/Transaction';
import { Router } from '@angular/router';
import CreditCard from '../../../entities/CreditCard';
import { BalanceService } from '../../services/balance.service';
import { calculateExpensesHelper } from '../../helper/calculateExpenses.helper';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import TransactionService from '../../services/transaction.service';
import { ModalComponent } from '../../../lib/components/modal/modal.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent extends BaseComponent implements OnInit {
  @ViewChild('deleteTransactionModal') deleteTransactionModal: ModalComponent | undefined;
  readonly today = new Date();

  user?: User;
  filteredTransactions: Transaction[] = [];
  expensesAmount = 0;
  recurringExpensesAmount = 0;
  loading = false;
  selectedTransaction?: Transaction;

  constructor(changeDetector: ChangeDetectorRef,
              private readonly userService: UserService,
              private readonly service: BalanceService,
              private readonly router: Router,
              private readonly transactionService: TransactionService) {
    super(changeDetector);
  }

  get salary() {
    return this.user?.salary || 0;
  }

  get transactions(): Transaction[] {
    return this.user!.transactions;
  }

  get creditCards(): CreditCard[] {
    return this.user?.creditCards ?? [];
  }

  ngOnInit(): void {
    this.subscribeAndRender(
      this.userService.currentUser,
      (user) => {
        this.user = user;
        const transactions = (this.user?.transactions || []);
        this.calculateExpensesAmout(transactions, this.creditCards, (this.user?.recurringExpenses || []));
        this.filteredTransactions = transactions.concat(
          this.user?.recurringExpenses.map(transaction => {
            transaction.recurring = true;
            return transaction;
          })
        ) ?? [];
      }
    )
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

  private calculateExpensesAmout(transactions: Transaction[], creditCards: CreditCard[], recurringExpenses: Transaction[]) {
    const [total, creditCardsTotal] = calculateExpensesHelper(transactions, creditCards);
    this.recurringExpensesAmount = recurringExpenses.reduce((sum, current) => sum + Number(current.amount), 0);
    this.expensesAmount = total + this.recurringExpensesAmount;
    this.creditCardsTotal = creditCardsTotal;
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount) * 100)).toFixed(2);
  }

  getBalance(date: Date) {
    this.loading = true;
    const month = format(date, 'MMM', {locale: pt});
    this.subscribeAndRender(
      this.service.getBalance(month.toUpperCase(), date.getFullYear()),
      (balance) => {
        const {transactions, creditCards, recurringExpenses} = balance;
        this.calculateExpensesAmout(transactions, creditCards, recurringExpenses);
        this.filteredTransactions = transactions.concat(
          recurringExpenses.map(transaction => {
            transaction.recurring = true;
            return transaction;
          })
        );
        this.loading = false;
      }
    );
  }

  editTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.deleteTransactionModal?.show();
  }

  deleteTransaction(all = false) {
    if (this.selectedTransaction) {
      this.subscribeAndRender(
        this.transactionService.delete(this.selectedTransaction.id!, all),
        () => {
          this.filteredTransactions.splice(this.filteredTransactions.findIndex(t => t.id === this.selectedTransaction!.id!), 1);
          this.deleteTransactionModal?.close();
        }
      );
    }
  }
}
