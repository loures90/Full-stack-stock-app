import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { ProductModel } from '../domain/model/product';
import { ListProduct } from '../domain/usecases/list-products';

@Injectable()
export class ListProductService implements ListProduct {
  constructor(private productRepository: ProductRepository) {}

  async list(): Promise<ProductModel[]> {
    const products = await this.productRepository.list();
    return products;
  }
}
