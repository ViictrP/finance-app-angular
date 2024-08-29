import TransactionDTO from './transaction.dto';
import CreditCardDTO from './credit-card.dto';

export default interface InvoiceDTO {
    id: number;
    transactions: TransactionDTO[];
    creditCard: CreditCardDTO;
}
