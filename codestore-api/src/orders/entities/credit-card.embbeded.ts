import { Column } from 'typeorm';

export class CreditCard {
  @Column({ name: 'credit_card_number' })
  creditCardNumber: string;

  @Column({ name: 'credit_card_name' })
  creditCardName: string;

  @Column({ name: 'credit_card_expiration_year' })
  creditCardExpirationYear: string;

  @Column({ name: 'credit_card_expiration_month' })
  creditCardExpirationMonth: string;

  @Column({ name: 'credit_card_expiration_cvv' })
  creditCardCVV: string;
}
