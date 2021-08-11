import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { validate as validateUUID } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(idOrSlug: string) {
    const where = validateUUID(idOrSlug)
      ? { id: idOrSlug }
      : { slug: idOrSlug };

    const product = await this.productRepo.findOne(where);
    if (!product) {
      throw new EntityNotFoundError(Product, idOrSlug);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);

    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new EntityNotFoundError(Product, id);
    }

    return product;
  }

  async remove(id: string) {
    const product = await this.productRepo.delete(id);
    if (!product.affected) {
      throw new EntityNotFoundError(Product, id);
    }

    return product;
  }
}
