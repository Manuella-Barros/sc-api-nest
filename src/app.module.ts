import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import {PrismaService} from "./services/prisma.service";

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [PrismaService],
})
export class AppModule {}
