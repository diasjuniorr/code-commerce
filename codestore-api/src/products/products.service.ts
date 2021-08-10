import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(idOrSlug: string) {
    const where = validateUUID(idOrSlug)
      ? { id: idOrSlug }
      : { slug: idOrSlug };
    return this.productRepo.findOne(where);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    return this.productRepo.findOne(id);
  }

  remove(id: string) {
    return this.productRepo.delete(id);
  }
}
