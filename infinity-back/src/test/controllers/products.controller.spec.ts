import { MongoMemoryServer } from 'mongodb-memory-server';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Collection } from 'mongodb';
import { AddProductService } from '../../services/add-product.service';
import { ProductRepository } from '../../repository/product';
import { Util } from '../../util/util';
import mongoHelper from '../../repository/mongo-helper';
import { ProductController } from '../../controllers/product.controller';
import { ProductModel } from '../../domain/model/product';
import { FilterProductsService } from '../../services/filter-product.service';
import { ListProductService } from '../../services/list-product.service';
import { LoadByIdService } from '../../services/load-by-id-product.service';
import { UpdateProductService } from '../../services/update-product.service';
import { DeleteProductService } from '../../services/delete-product.service';

const makeFakeAddProduct = (): any => ({
  name: 'any_name',
  quantity: '100',
  barcode: 'any_barcode',
  price: '100',
});

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  quantity: 100,
  barcode: 'any_barcode',
  price: 100,
});

describe('Product Repository', () => {
  let productController: ProductController;
  let addProductService: AddProductService;
  let listProductService: ListProductService;
  let filterProductsService: FilterProductsService;
  let loadByIdService: LoadByIdService;
  let updateProductService: UpdateProductService;
  let deleteProductService: DeleteProductService;
  let productRepository: ProductRepository;
  let util: Util;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        AddProductService,
        ListProductService,
        FilterProductsService,
        ProductRepository,
        LoadByIdService,
        UpdateProductService,
        DeleteProductService,
        Util,
      ],
    }).compile();

    productController = moduleRef.get<ProductController>(ProductController);

    addProductService = moduleRef.get<AddProductService>(AddProductService);
    listProductService = moduleRef.get<ListProductService>(ListProductService);
    filterProductsService = moduleRef.get<FilterProductsService>(
      FilterProductsService,
    );
    loadByIdService = moduleRef.get<LoadByIdService>(LoadByIdService);
    updateProductService =
      moduleRef.get<UpdateProductService>(UpdateProductService);
    deleteProductService =
      moduleRef.get<DeleteProductService>(DeleteProductService);

    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    util = moduleRef.get<Util>(Util);

    app = moduleRef.createNestApplication();
    await app.init();
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

  describe('/POST product', () => {
    it('Should save a new product', async () => {
      return await request(app.getHttpServer())
        .post('/product')
        .send(makeFakeAddProduct())
        .expect(201);
    });
  });
});
