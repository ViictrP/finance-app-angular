import UserDto from './user.dto';
import InvoiceDto from './invoice.dto';

export default interface CreditCardDto {
  id: string;
  title: string;
  description: string;
  number: string;
  user?: UserDto;
  invoices: InvoiceDto[];
  invoiceClosingDay: number;
  createAt?: Date;
  backgroundColor: string;
  totalInvoiceAmount?: number;
}
