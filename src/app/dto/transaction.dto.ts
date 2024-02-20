export default interface TransactionDTO {
  id: string;
  amount: number;
  description: string;
  category: string;
  createdAt: Date;
  deleteDate: Date;
  deleted: boolean;
  userId: string;
}
