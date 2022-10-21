import Transaction from '../../entities/Transaction';
import CreditCard from '../../entities/CreditCard';

type CreditCardsTotal = { [key: string]: number };

export const calculateExpensesHelper = (transactions: Transaction[], creditCards: CreditCard[]): [number, CreditCardsTotal] => {
  const total: CreditCardsTotal = {};
  const debitAmount = transactions?.reduce((sum, current) => sum + Number(current.amount), 0);
  const creditCardsAmount = creditCards.reduce((sum, current) => {
    const invoice = current.invoices[0];
    const amount = invoice ? invoice.transactions.reduce((sum, current) => {
      return sum + Number(current.amount);
    }, 0) : 0;
    const creditCardSum = sum + Number(amount);
    total[current.id] = amount;
    return creditCardSum;
  }, 0);
  return [debitAmount! + creditCardsAmount, total];
}
