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
import { LoadByIdService } from '../../services/load-by-id-product.service';
import { UpdateProductService } from '../../services/update-product.service';
import { DeleteProductService } from '../../services/delete-product.service';

const makeFakeAddProduct = (): AddProductModel => ({
  name: 'any_name',
  quantity: 100,
  barcode: 'any_barcode',
  price: 100,
});

describe('Product Repository', () => {
  let addProductService: AddProductService;
  let listProductService: ListProductService;
  let filterProductsService: FilterProductsService;
  let loadByIdService: LoadByIdService;
  let updateProductService: UpdateProductService;
  let deleteProductService: DeleteProductService;
  let productRepository: ProductRepository;
  let util: Util;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
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
