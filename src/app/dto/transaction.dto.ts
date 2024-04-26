import InvoiceDTO from './invoice.dto';

export default interface TransactionDTO {
  id: number;
  amount: number;
  description: string;
  installmentNumber?: number;
  installmentAmount: number;
  isInstallment: boolean;
  category: string;
  date: string;
  createdAt: Date;
  deleteDate: Date;
  deleted: boolean;
  userId: string;
  invoice?: InvoiceDTO;
  creditCardId?: number;
}
