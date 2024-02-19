import InvoiceDTO from './invoice.dto';

export default interface CreditCardDTO {
  id: string;
  title: string;
  description: string;
  totalInvoiceAmount: number;
  invoices: InvoiceDTO[];
  backgroundColor: string;
}
