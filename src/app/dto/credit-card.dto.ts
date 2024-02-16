import InvoiceDTO from './invoice.dto';

export default interface CreditCardDTO {
  totalInvoiceAmount: number;
  invoices: InvoiceDTO[];
}
