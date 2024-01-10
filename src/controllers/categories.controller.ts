import {Body, Controller, Get, Post, UsePipes} from "@nestjs/common";
import {PrismaService} from "../services/prisma.service";
import {categorySchema, CategorySchemaType} from "../schemas/categorySchema";
import {ZodValidationPipe} from "../pipes/zodValidation.pipe";

@Controller("categories")
export class CategoriesController {
    constructor(private prismaService: PrismaService) {
    }
    @Post()
    @UsePipes(new ZodValidationPipe(categorySchema))
    createCategory(@Body() body: CategorySchemaType){
        this.prismaService.createCategory(body)
    }

    @Get()
    getAllCategories(){
        return this.prismaService.getAllCategories();
    }
}