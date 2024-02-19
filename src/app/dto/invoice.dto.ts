import TransactionDTO from './transaction.dto';

export default interface InvoiceDTO {
  id: string;
  transactions: TransactionDTO[];
}
