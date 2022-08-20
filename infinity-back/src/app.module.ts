import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repository/product';
import { AddProductService } from './services/add-product.service';
import { Util } from './util/util';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [AddProductService, ProductRepository, Util],
})
export class AppModule {}
