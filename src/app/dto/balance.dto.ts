import CreditCardDTO from './credit-card.dto';
import RecurringExpenseDTO from './recurring-expense.dto';
import TransactionDTO from './transaction.dto';

type CreditCardsTotal = { [key: string]: number };

export default interface BalanceDTO {
  available: number;
  creditCardExpenses: CreditCardsTotal;
  creditCards: CreditCardDTO[];
  expenses: number;
  recurringExpenses: RecurringExpenseDTO[];
  salary: number;
  transactions: TransactionDTO[];
}
