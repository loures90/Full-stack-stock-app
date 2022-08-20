import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { ProductModel } from '../domain/model/product';
import { AddProductModel } from '../domain/usecases/add-product';
import { UpdateProduct } from '../domain/usecases/update-product';
import { Util } from '../util/util';

@Injectable()
export class UpdateProductService implements UpdateProduct {
  constructor(
    private productRepository: ProductRepository,
    private util: Util,
  ) {}

  async update(
    productId: string,
    data: AddProductModel,
  ): Promise<ProductModel> {
    const isProductIdValid = await this.productRepository.load(productId);
    if (!isProductIdValid) {
      this.util.HandleNotFoundError();
    }
    const product = await this.productRepository.update(productId, data);
    return product;
  }
}
