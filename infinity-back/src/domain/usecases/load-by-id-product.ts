import { ProductModel } from '../model/product';

export interface LoadByIdProduct {
  load(productId: string): Promise<ProductModel>;
}
