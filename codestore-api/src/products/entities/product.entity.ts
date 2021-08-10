import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import slugify from 'slugify';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  slug: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name);
  }
}
