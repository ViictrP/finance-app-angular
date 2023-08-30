import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import UserDto from 'src/app/dto/user.dto';
import { BaseComponent } from '../../../lib/components/BaseComponent';
import { UserService } from '../../services/user.service';
import TransactionDto from '../../../dto/transaction.dto';
import { Router } from '@angular/router';
import CreditCardDto from '../../../dto/credit-card.dto';
import { BalanceService } from '../../services/balance.service';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import TransactionService from '../../services/transaction.service';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent extends BaseComponent implements OnInit {
  @ViewChild('deleteTransactionModal') deleteTransactionModal: ModalComponent | undefined;
  readonly today = new Date();

  user?: UserDto;
  filteredTransactions: TransactionDto[] = [];
  expensesAmount = 0;
  selectedTransaction?: TransactionDto;
  creditCardsTotal: { [key: string]: number } = {};

  constructor(changeDetector: ChangeDetectorRef,
              private readonly userService: UserService,
              private readonly service: BalanceService,
              private readonly router: Router,
              private readonly transactionService: TransactionService,
              private readonly recurringExpenseService: RecurringExpensesService) {
    super(changeDetector);
  }

  get salary() {
    return this.user?.salary || 0;
  }

  get transactions(): TransactionDto[] {
    return this.user!.transactions;
  }

  get creditCards(): CreditCardDto[] {
    return this.user?.creditCards ?? [];
  }

  ngOnInit(): void {
    this.subscribeAndRender(
      this.userService.currentUser,
      (user) => {
        this.user = user;
        this.getBalance(new Date());
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

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount) * 100)).toFixed(2);
  }

  getBalance(date: Date) {
    const month = format(date, 'MMM', {locale: pt});
    this.subscribeAndRender(
      this.service.getBalance(month.toUpperCase(), date.getFullYear()),
      (balance) => {
        this.expensesAmount = balance.expenses;
        this.creditCardsTotal = balance.creditCardExpenses;
        this.filteredTransactions = balance.transactions.concat(
          balance.recurringExpenses.map(transaction => {
            transaction.recurring = true;
            return transaction;
          })
        );
      }
    );
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
}
