import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}
  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
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
