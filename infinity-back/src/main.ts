import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoHelper from './repository/mongo-helper';

mongoHelper
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/products')
  .then(async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(8080);
  })
  .catch(console.error);
