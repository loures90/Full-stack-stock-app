import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repository/product';
import { AddProductService } from './services/add-product.service';
import { FilterProductsService } from './services/filter-product.service';
import { LoadByIdService } from './services/load-by-id-product.service';
import { ListProductService } from './services/list-product.service';
import { Util } from './util/util';
import { UpdateProductService } from './services/update-product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    AddProductService,
    ListProductService,
    FilterProductsService,
    ProductRepository,
    LoadByIdService,
    UpdateProductService,
    Util,
  ],
})
export class AppModule {}
