import { Test, TestingModule } from '@nestjs/testing';
import { AddProductModel } from '../../domain/usecases/add-product';
import { AddProductService } from '../../services/add-product.service';
import { ProductRepository } from '../../repository/product';
import { Util } from '../../util/util';
import { ProductModel } from '../../domain/model/product';
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

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
  name: 'any_name',
  quantity: 100,
  barcode: 'any_barcode',
  price: 100,
});

describe('AppController', () => {
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
