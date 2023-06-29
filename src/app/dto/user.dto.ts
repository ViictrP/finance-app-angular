import TransactionDto from './transaction.dto';
import CreditCardDto from './credit-card.dto';
import MonthClosureDto from './month-closure.dto';

export default interface UserDto {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  salary?: number;
  creditCards: CreditCardDto[];
  transactions: TransactionDto[];
  recurringExpenses: TransactionDto[];
  monthClosures: MonthClosureDto[];
}
