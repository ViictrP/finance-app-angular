import TransactionDTO from './transaction.dto';
import CreditCardDTO from './credit-card.dto';

export default interface InvoiceDTO {
  id: string;
  transactions: TransactionDTO[];
  creditCard: CreditCardDTO;
}
