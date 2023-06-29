import TransactionDto from './transaction.dto';
import CreditCardDto from './credit-card.dto';

type CreditCardsTotal = { [key: string]: number };

export interface BalanceDto {
  salary: number;
  expenses: number;
  available: number;
  creditCardExpenses: CreditCardsTotal;
  transactions: TransactionDto[];
  creditCards: CreditCardDto[];
  recurringExpenses: TransactionDto[];
}
