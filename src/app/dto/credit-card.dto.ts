import InvoiceDTO from './invoice.dto';

export default interface CreditCardDTO {
  id: number;
  title: string;
  description: string;
  totalInvoiceAmount: number;
  invoices: InvoiceDTO[];
  backgroundColor: string;
  number: string;
  invoiceClosingDay: number;
}
