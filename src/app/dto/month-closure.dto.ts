export default interface MonthClosureDTO {
  id: string;
  month: string;
  year: number;
  userId: string;
  total: number;
  available: number;
  expenses: number;
  deleted: boolean;
  deleteDate: Date;
  createdAt: Date;
  index?: number;
}
