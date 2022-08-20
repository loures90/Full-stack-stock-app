import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Util } from '../util/util';
import { AddProductModel } from '../domain/usecases/add-product';
import { AddProductService } from '../services/add-product.service';
import { FilterParams } from '../domain/usecases/filter-products';
import { ListProductService } from '../services/list-product.service';
import { FilterProductsService } from '../services/filter-product.service';
import { LoadByIdService } from '../services/load-by-id-product.service';
import { UpdateProductService } from '../services/update-product.service';

@Controller('product')
export class ProductController {
  constructor(
    private addProductService: AddProductService,
    private listProductService: ListProductService,
    private filterProductService: FilterProductsService,
    private loadByIdProductService: LoadByIdService,
    private updateProductService: UpdateProductService,
    private util: Util,
  ) {}

  @Post()
  async add(@Body() data: AddProductModel, @Res() res: Response) {
    try {
      const requiredParams = ['name', 'quantity', 'barcode', 'price'];
      this.util.requiredParamValidator(data, requiredParams);

      const inputData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };
      const product = await this.addProductService.add(inputData);
      res.status(HttpStatus.CREATED).send(product);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  @Get()
  async getAll(@Query() query: FilterParams, @Res() res: Response) {
    try {
      let products;

      if (!Object.keys(query).length) {
        products = await this.listProductService.list();
      } else {
        const inputData = {
          ...query,
          gt: query.gt ? Number(query.gt) : 0,
          lt: query.lt ? Number(query.lt) : 99999999999,
        };
        products = await this.filterProductService.filter(inputData);
      }
      res.status(HttpStatus.OK).send(products);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  @Get(':product_id')
  async findOne(@Param('product_id') productId: string, @Res() res: Response) {
    try {
      const product = await this.loadByIdProductService.load(productId);
      res.status(HttpStatus.OK).send(product);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  @Put(':product_id')
  async update(
    @Param('product_id') productId: string,
    @Res() res: Response,
    @Body() data: AddProductModel,
  ) {
    try {
      const requiredParams = [
        'name',
        'quantity',
        'barcode',
        'price',
        'productId',
      ];
      this.util.requiredParamValidator({ ...data, productId }, requiredParams);

      const inputData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };
      const product = await this.updateProductService.update(
        productId,
        inputData,
      );
      res.status(HttpStatus.CREATED).send(product);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
