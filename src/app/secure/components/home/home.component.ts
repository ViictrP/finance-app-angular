import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import UserDto from '../../../dto/user.dto';
import {UserService} from '../../services/user.service';
import TransactionDto from '../../../dto/transaction.dto';
import {Router} from '@angular/router';
import CreditCardDto from '../../../dto/credit-card.dto';
import {BaseComponent} from '../../../lib/components/BaseComponent';
import {calculateExpensesHelper} from '../../helper/calculateExpenses.helper';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import TransactionService from '../../services/transaction.service';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent implements OnInit {
  @ViewChild('deleteTransactionModal') deleteTransactionModal: ModalComponent | undefined;
  user?: UserDto;
  filteredTransactions: TransactionDto[] = [];
  selectedTransaction?: TransactionDto;
  creditCardsTotal: { [key: string]: number } = {};
  expensesAmount = 0;
  recurringExpenseAmount = 0;

  constructor(private readonly userService: UserService,
              private readonly router: Router,
              detector: ChangeDetectorRef,
              private readonly transactionService: TransactionService,
              private readonly recurringExpenseService: RecurringExpensesService) {
    super(detector);
  }

  get transactions(): TransactionDto[] {
    return this.user!.transactions;
  }

  get creditCards(): CreditCardDto[] {
    return this.user?.creditCards ?? [];
  }

  ngOnInit(): void {
    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.user = user;
      this.calculateExpensesAmout();
      this.filteredTransactions = this.user?.transactions?.concat(
        this.user?.recurringExpenses
          .map(transaction => {
            transaction.recurring = true
            return transaction;
          })
      ) ?? [];
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

  private calculateExpensesAmout() {
    const [total, creditCardsTotal] = calculateExpensesHelper((this.user!.transactions || []), this.creditCards);
    this.recurringExpenseAmount = this.user!.recurringExpenses?.reduce((sum, current) => sum + Number(current.amount), 0);
    this.expensesAmount = total + this.recurringExpenseAmount;
    this.creditCardsTotal = creditCardsTotal;
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount) * 100)).toFixed(2);
  }

  editTransaction(transaction: TransactionDto) {
    this.selectedTransaction = transaction;
    this.deleteTransactionModal?.show();
  }

  deleteTransaction(all = false) {
    if (this.selectedTransaction) {
      const deleteTransaction$ = this.transactionService.delete(this.selectedTransaction.id!, all);
      const deleteRecurringExpense$ = this.recurringExpenseService.delete(this.selectedTransaction);
      this.subscribeAndRender(
        this.selectedTransaction.recurring ? deleteRecurringExpense$ : deleteTransaction$,
        () => {
          this.filteredTransactions.splice(this.filteredTransactions.findIndex(t => t.id === this.selectedTransaction!.id!), 1);
          this.deleteTransactionModal?.close();
        }
      );
    }
  }

  getBarsHeight(available: number, salary: number): string {
    return `${Math.max(0, Math.floor((available * 100) / salary)) - 20}%`;
  }

  protected readonly parseFloat = parseFloat;
}
