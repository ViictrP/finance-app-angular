import InvoiceDto from './invoice.dto';
import UserDto from './user.dto';

export default interface TransactionDto {
  id?: string;
  amount: number;
  description: string;
  isInstallment: boolean;
  installmentAmount: number;
  installmentNumber?: number;
  createdAt?: Date;
  date: Date;
  invoice?: InvoiceDto;
  user?: UserDto;
  category: 'food' | 'home' | 'credit-card' | 'shop' | 'other';
  recurring?: boolean;
}
