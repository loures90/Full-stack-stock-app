import { ProductModel } from '../model/product';

export type AddProductModel = Omit<ProductModel, 'id'>;

export interface AddProduct {
  add(data: AddProductModel): Promise<ProductModel>;
}
