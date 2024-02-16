import TransactionDTO from './transaction.dto';

export default interface InvoiceDTO {
  transactions: TransactionDTO[];
}
