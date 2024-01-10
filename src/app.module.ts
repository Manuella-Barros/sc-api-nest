import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import {PrismaService} from "./services/prisma.service";
import {CategoriesController} from "./controllers/categories.controller";

@Module({
  imports: [],
  controllers: [ProductsController, CategoriesController],
  providers: [PrismaService],
})
export class AppModule {}
