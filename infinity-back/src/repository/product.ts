/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Param } from '@nestjs/common';
import { FilterParams } from '../domain/usecases/filter-products';
import { ProductModel } from '../domain/model/product';
import { AddProductModel } from '../domain/usecases/add-product';
import mongoHelper from './mongo-helper';
import { ObjectId } from 'mongodb';

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
    } else if (filterData.quantity) {
      filterParams = {
        quantity: { $gt: filterData.gt, $lt: filterData.lt },
      };
    } else {
      filterParams = {
        name: { $regex: filterData.name },
      };
    }
    const productsCollection = await mongoHelper.getCollection('products');
    const products = await productsCollection.find(filterParams).toArray();
    return products.map((product) => mongoHelper.mapper(product));
  }

  async load(productId: string): Promise<ProductModel> {
    const productsCollection = await mongoHelper.getCollection('products');
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) return null;
    return mongoHelper.mapper(product);
  }

  async update(
    productId: string,
    data: AddProductModel,
  ): Promise<ProductModel> {
    console.log(data);
    const productsCollection = await mongoHelper.getCollection('products');
    const product = await productsCollection.findOneAndReplace(
      {
        _id: new ObjectId(productId),
      },
      { ...data },
    );
    if (!product) return null;
    return mongoHelper.mapper(product.value);
  }

  async delete(productId: string): Promise<boolean> {
    const productsCollection = await mongoHelper.getCollection('products');
    const product = await productsCollection.findOneAndDelete({
      _id: new ObjectId(productId),
    });
    return true;
  }
}
