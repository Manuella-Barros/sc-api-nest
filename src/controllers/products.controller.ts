import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes} from '@nestjs/common';
import {PrismaService, ProductBodyType, ProductSchema} from "../services/prisma.service";
import {ZodValidationPipe} from "../pipes/zodValidation.pipe";

@Controller("products")
export class ProductsController {
  constructor(private prismaService: PrismaService) {}

  /****************************
              POST
  ****************************/
   @Post()
  @UsePipes(new ZodValidationPipe(ProductSchema))
  createProduct(@Body() body: ProductBodyType) {
    this.prismaService.createProduct(body);
  }

  /****************************
               GET
  ****************************/
  @Get("allProducts")
  getAllProducts(){
    return this.prismaService.getAllProducts();
  }

  @Get(":id")
  getProductbyID(@Param("id", new ParseUUIDPipe()) id: string){
      return this.prismaService.getProductbyID(id);
  }

  /****************************
             DELETE
  ****************************/
  @Delete(":id")
  deleteProduct(@Param("id", new ParseUUIDPipe()) id: string){
    return this.prismaService.deleteProduct(id);
  }

  /****************************
            PACTH
  ****************************/
  @Patch(":id")
  editProduct(
      @Body(new ZodValidationPipe(ProductSchema)) body: ProductBodyType,
      @Param("id", new ParseUUIDPipe()) id: string

  ){
    return this.prismaService.editProduct(id, body);
  }
}
