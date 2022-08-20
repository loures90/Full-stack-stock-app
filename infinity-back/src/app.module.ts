import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repository/product';
import { AddProductService } from './services/add-product.service';
import { FilterProductsService } from './services/filter-product.service';
import { ListProductService } from './services/list-product.service';
import { Util } from './util/util';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    AddProductService,
    ListProductService,
    FilterProductsService,
    ProductRepository,
    Util,
  ],
})
export class AppModule {}
