import { ProductModel } from '../model/product';

export type FilterParams = {
  gt?: string;
  lt?: string;
  quantity?: string;
  price?: string;
};

export interface FilterProducts {
  filter(filterData: FilterParams): Promise<ProductModel[]>;
}
