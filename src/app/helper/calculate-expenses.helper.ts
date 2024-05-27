import CreditCardDTO from '../dto/credit-card.dto';
import ProfileDTO from '../dto/profile.dto';

type CreditCardsTotal = { [key: string]: number };
export type ExpensesCalculation = [number, number, CreditCardsTotal, number];

export const calculateExpensesHelper = (profile: ProfileDTO): ExpensesCalculation => {
  if (!profile) return [0,0,{},0];

  const debitAmount = profile.transactions?.reduce((sum, current) => sum + Number(current.amount), 0);
  const recurringExpenseAmount = profile.recurringExpenses?.reduce((sum, current) => sum + Number(current.amount), 0);
  const [creditCardsAmount, creditCardsTotal] = getCreditCardsAmount(profile.creditCards);
  return [debitAmount, recurringExpenseAmount, creditCardsTotal, debitAmount! + creditCardsAmount + recurringExpenseAmount!];
}

const getCreditCardsAmount = (creditCards: CreditCardDTO[]): [number, CreditCardsTotal]  => {
  const total: CreditCardsTotal = {};
  const creditCardsTotal = creditCards.reduce((sum, current) => {
    const invoice = current.invoices[0];
    const amount = invoice ? invoice.transactions.reduce((sum, current) => {
      return sum + Number(current.amount);
    }, 0) : 0;
    const creditCardSum = sum + Number(amount);
    total[current.id] = amount;
    return creditCardSum;
  }, 0);

  return [creditCardsTotal, total];
}
