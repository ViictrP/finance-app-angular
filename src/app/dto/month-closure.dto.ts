export default interface MonthClosureDto {
  id: string;
  index: number;
  month: string;
  total: number;
  userId: string;
  year: number;
  available: number;
  createdAt: Date;
  deleteDate?: Date;
  deleted: boolean;
  expenses: number;
}
