import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { ProductModel } from '../domain/model/product';
import { AddProduct, AddProductModel } from '../domain/usecases/add-product';

@Injectable()
export class AddProductService implements AddProduct {
  constructor(private productRepository: ProductRepository) {}

  async add(data: AddProductModel): Promise<ProductModel> {
    const product = await this.productRepository.add(data);
    return product;
  }
}
