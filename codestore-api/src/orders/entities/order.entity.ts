import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { CreditCard } from '../../orders/entities/credit-card.embbeded';
import { v4 as uuid } from 'uuid';

export enum OrderStatus {
  Approved = 'Approved',
  Pending = 'Pending',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column(() => CreditCard, { prefix: '' })
  creditCard: CreditCard;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  status: OrderStatus = OrderStatus.Pending;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  calculateTotal() {
    return (this.total = this.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0));
  }
}
