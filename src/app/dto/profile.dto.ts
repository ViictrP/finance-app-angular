import CreditCardDTO from './credit-card.dto';
import TransactionDTO from './transaction.dto';

export default interface ProfileDTO {
  email: string;
  creditCards: CreditCardDTO[];
  salary: number;
  transactions: TransactionDTO[];
  recurringExpenses: TransactionDTO[];
}
