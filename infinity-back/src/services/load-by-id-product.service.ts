import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { ProductModel } from '../domain/model/product';
import { LoadByIdProduct } from '../domain/usecases/load-by-id-product';
import { Util } from '../util/util';

@Injectable()
export class LoadByIdService implements LoadByIdProduct {
  constructor(
    private productRepository: ProductRepository,
    private util: Util,
  ) {}

  async load(productId: string): Promise<ProductModel> {
    const product = await this.productRepository.load(productId);
    if (!product) {
      this.util.HandleNotFoundError();
    }
    return product;
  }
}
