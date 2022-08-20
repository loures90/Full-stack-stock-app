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
import { Util } from 'src/util/util';
import { AddProductModel } from '../domain/usecases/add-product';
import { AddProductService } from '../services/add-product.service';

@Controller('product')
export class ProductController {
  constructor(
    private addProductService: AddProductService,
    private util: Util,
  ) {}

  @Post()
  async add(@Body() data: AddProductModel, @Res() res: Response) {
    try {
      const requiredParams = ['name', 'quantity', 'bar_code', 'price'];
      this.util.requiredParamValidator(data, requiredParams);

      const product = await this.addProductService.add(data);
      res.status(HttpStatus.CREATED).send(product);
    } catch (error) {
      this.util.handleError(error);
    }
  }

  @Get()
  findAll(@Query() query: any) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: any) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
