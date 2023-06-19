import Transaction from './Transaction';
import CreditCard from './CreditCard';
import MonthClosure from './MonthClosure';

export default interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  salary?: number;
  creditCards: CreditCard[];
  transactions: Transaction[];
  recurringExpenses: Transaction[];
  monthClosures: MonthClosure[];
}
