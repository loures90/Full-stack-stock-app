import { ProductModel } from '../model/product';
import { AddProductModel } from './add-product';

export interface UpdateProduct {
  update(productId: string, data: AddProductModel): Promise<ProductModel>;
}
