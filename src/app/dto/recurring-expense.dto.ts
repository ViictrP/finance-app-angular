export default interface RecurringExpenseDTO {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
}
