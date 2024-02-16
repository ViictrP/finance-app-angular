import CreditCardDTO from './credit-card.dto';

export default interface ProfileDTO {
  email: string;
  creditCards: CreditCardDTO[];
  salary: number;
}
