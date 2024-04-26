import CreditCardDTO from './credit-card.dto';
import TransactionDTO from './transaction.dto';
import MonthClosureDTO from './month-closure.dto';

export default interface ProfileDTO {
  name: string;
  lastname: string;
  email: string;
  password: string;
  creditCards: CreditCardDTO[];
  salary: number;
  transactions: TransactionDTO[];
  recurringExpenses: TransactionDTO[];
  monthClosures: MonthClosureDTO[];
}
