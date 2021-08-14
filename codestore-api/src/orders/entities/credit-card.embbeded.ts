import { Column } from 'typeorm';

export class CreditCard {
  @Column({ name: 'credit_card_number' })
  credit_card_number: string;

  @Column({ name: 'credit_card_name' })
  name: string;

  @Column({ name: 'credit_card_expiration_year' })
  credit_card_expiration_year: number;

  @Column({ name: 'credit_card_expiration_month' })
  credit_card_expiration_month: number;

  @Column({ name: 'credit_card_expiration_cvv' })
  cvv: string;
}
