import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
