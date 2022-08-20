import { Test, TestingModule } from '@nestjs/testing';
import { AddProductModel } from '../../domain/usecases/add-product';
import { AddProductService } from '../../services/add-product.service';
import { ProductRepository } from '../../repository/product';
import { Util } from '../../util/util';

const makeFakeAddProduct = (): AddProductModel => ({
  name: 'any_name',
  quantity: 'any_quantity',
  barcode: 'any_barcode',
  price: '100',
});

const makeFakeProduct = (): any => ({
  id: 'any_id',
  name: 'any_name',
  quantity: 'any_quantity',
  barcode: 'any_barcode',
  price: '100',
});

describe('AppController', () => {
  let addProductService: AddProductService;
  let productRepository: ProductRepository;
  let util: Util;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AddProductService, ProductRepository, Util],
    }).compile();

    addProductService = app.get<AddProductService>(AddProductService);
    productRepository = app.get<ProductRepository>(ProductRepository);
    util = app.get<Util>(Util);
  });

  describe('root', () => {
    it('should addProductRepository with correct values', async () => {
      jest
        .spyOn(productRepository, 'add')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve(makeFakeProduct())),
        );
      const addSpy = jest.spyOn(productRepository, 'add');
      const fakeAddProduct = makeFakeAddProduct();
      await addProductService.add(fakeAddProduct);
      expect(addSpy).toHaveBeenCalledWith(fakeAddProduct);
    });
    it('should return a product on success', async () => {
      jest
        .spyOn(productRepository, 'add')
        .mockReturnValueOnce(
          new Promise((resolve) => resolve(makeFakeProduct())),
        );
      const fakeAddProduct = makeFakeAddProduct();
      const product = await addProductService.add(fakeAddProduct);
      expect(product).toEqual(makeFakeProduct());
    });
    it('should throw when ProducRepository Throws', async () => {
      jest.clearAllMocks();
      const fakeAddProduct = makeFakeAddProduct();
      jest.spyOn(productRepository, 'add').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = addProductService.add(fakeAddProduct);
      expect(promise).rejects.toThrow();
    });
  });
});
