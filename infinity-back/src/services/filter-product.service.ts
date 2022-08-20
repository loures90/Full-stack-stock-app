import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { ProductModel } from '../domain/model/product';
import {
  FilterParams,
  FilterProducts,
} from '../domain/usecases/filter-products';

@Injectable()
export class FilterProductsService implements FilterProducts {
  constructor(private productRepository: ProductRepository) {}

  async filter(filterData: FilterParams): Promise<ProductModel[]> {
    const products = await this.productRepository.filter(filterData);
    return products;
  }
}
