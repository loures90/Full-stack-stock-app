import { ProductModel } from '../model/product';

export interface ListProduct {
  list(): Promise<ProductModel[]>;
}
