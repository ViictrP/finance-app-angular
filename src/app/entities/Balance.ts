import Transaction from './Transaction';
import CreditCard from './CreditCard';

export interface Balance {
  transactions: Transaction[];
  creditCards: CreditCard[];
  recurringExpenses: Transaction[];
}
