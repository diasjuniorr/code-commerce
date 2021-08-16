import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
    const products = await this.productRepo.find({
      where: {
        id: In(order.items.map((item) => item.product_id)),
      },
    });
    order.items.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.product_id,
      );
      item.price = product.price;
    });

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new EntityNotFoundError(Order, id);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.update(id, updateOrderDto);
    if (!order.affected) {
      throw new EntityNotFoundError(Order, id);
    }

    return order;
  }

  async remove(id: string) {
    const order = await this.orderRepo.delete(id);
    if (!order.affected) {
      throw new EntityNotFoundError(Order, id);
    }

    return order;
  }
}
