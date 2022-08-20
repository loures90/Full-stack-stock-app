import { Test, TestingModule } from '@nestjs/testing';
import { Collection } from 'mongodb';
import { AddProductModel } from '../../domain/usecases/add-product';
import { AddProductService } from '../../services/add-product.service';
import { ProductRepository } from '../../repository/product';
import { Util } from '../../util/util';
import mongoHelper from '../../repository/mongo-helper';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FilterProductsService } from '../../services/filter-product.service';
import { ListProductService } from '../../services/list-product.service';

const makeFakeAddProduct = (): AddProductModel => ({
  name: 'any_name',
  quantity: 100,
  barcode: 'any_barcode',
  price: 100,
});

describe('Product Repository', () => {
  let addProductService: AddProductService;
  let productRepository: ProductRepository;
  let util: Util;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AddProductService,
        ListProductService,
        FilterProductsService,
        ProductRepository,
        Util,
      ],
    }).compile();

    addProductService = app.get<AddProductService>(AddProductService);
    productRepository = app.get<ProductRepository>(ProductRepository);
    util = app.get<Util>(Util);
  });

  let productCollection: Collection;
  let mongod: MongoMemoryServer;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    await mongoHelper.connect(mongoUri);
  });
  beforeEach(async () => {
    productCollection = await mongoHelper.getCollection('products');
    await productCollection.deleteMany({});
  });
  afterAll(async () => {
    await mongod.stop();
  });

  describe('Add Product', () => {
    it('Should call add and return an product on success', async () => {
      const product = await productRepository.add(makeFakeAddProduct());
      expect(product).toBeTruthy();
      expect(product.id).toBeTruthy();
      expect(product.name).toBe('any_name');
      expect(product.quantity).toBe(100);
      expect(product.barcode).toBe('any_barcode');
      expect(product.price).toBe(100);
    });
  });
});
