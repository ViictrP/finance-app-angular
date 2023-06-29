import CreditCardDto from './credit-card.dto';
import TransactionDto from './transaction.dto';

export default interface InvoiceDto {
  id: string;
  month: string;
  year: number;
  isClosed: boolean;
  creditCard: CreditCardDto;
  transactions: TransactionDto[];
  createdAt: Date;
}
