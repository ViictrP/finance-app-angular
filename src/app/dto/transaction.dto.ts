import InvoiceDTO from './invoice.dto';

export default interface TransactionDTO {
  id: string;
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
}
