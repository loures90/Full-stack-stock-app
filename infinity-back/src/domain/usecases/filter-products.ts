import { ProductModel } from '../model/product';

export type FilterParams = {
  gt?: number;
  lt?: number;
  quantity?: string;
  price?: string;
};

export interface FilterProducts {
  filter(filterData: FilterParams): Promise<ProductModel[]>;
}
