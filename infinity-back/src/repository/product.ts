/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Param } from '@nestjs/common';
import { FilterParams } from '../domain/usecases/filter-products';
import { ProductModel } from '../domain/model/product';
import { AddProductModel } from '../domain/usecases/add-product';
import mongoHelper from './mongo-helper';

@Injectable()
export class ProductRepository {
  async add(data: AddProductModel): Promise<ProductModel> {
    const product = { ...data };
    const productsCollection = await mongoHelper.getCollection('products');
    await productsCollection.insertOne(product);
    return mongoHelper.mapper(product);
  }

  async list(): Promise<ProductModel[]> {
    const productsCollection = await mongoHelper.getCollection('products');
    const products = await productsCollection.find().toArray();
    return products.map((product) => mongoHelper.mapper(product));
  }

  async filter(filterData: FilterParams): Promise<any> {
    let filterParams;

    if (filterData.price) {
      filterParams = {
        price: { $gt: filterData.gt, $lt: filterData.lt },
      };
    } else {
      filterParams = {
        quantity: { $gt: filterData.gt, $lt: filterData.lt },
      };
    }
    const productsCollection = await mongoHelper.getCollection('products');
    const products = await productsCollection.find(filterParams).toArray();
    return products.map((product) => mongoHelper.mapper(product));
  }
}
