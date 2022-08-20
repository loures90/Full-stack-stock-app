/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
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
}
