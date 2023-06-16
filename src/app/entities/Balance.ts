import Transaction from './Transaction';
import CreditCard from './CreditCard';

type CreditCardsTotal = { [key: string]: number };

export interface Balance {
  salary: number;
  expenses: number;
  available: number;
  creditCardExpenses: CreditCardsTotal;
  transactions: Transaction[];
  creditCards: CreditCard[];
  recurringExpenses: Transaction[];
}
