import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product';
import { Util } from '../util/util';
import { DeleteProduct } from 'src/domain/usecases/delete-product';

@Injectable()
export class DeleteProductService implements DeleteProduct {
  constructor(
    private productRepository: ProductRepository,
    private util: Util,
  ) {}

  async delete(productId: string): Promise<boolean> {
    const isProductIdValid = await this.productRepository.load(productId);
    if (!isProductIdValid) {
      this.util.HandleNotFoundError();
    }
    await this.productRepository.delete(productId);
    return true;
  }
}
