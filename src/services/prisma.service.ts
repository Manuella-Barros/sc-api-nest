import { PrismaClient } from "@prisma/client";
import {HttpException, Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import { z } from "zod";
import {InvalidIDException} from "../exceptions/invalidID.exception";
import {ProductBodyType} from "../schemas/productSchema";
import {CategorySchemaType} from "../schemas/categorySchema";
import {TCategory} from "../types/types";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit{
    constructor() {
        super();
    }
    onModuleInit() {
        this.$connect();
    }

    onModuleDestroy() {
        this.$disconnect();
    }

    /****************************
     PRODUCTS
     ****************************/

    async createProduct(data: ProductBodyType){
        return await this.produto.create({data})
    }

    async getAllProducts(){
        return await this.produto.findMany({
            include: {
                category: {select:{name: true}}
            },
            orderBy: {
                updatedAt: "desc",
            }
        });
    }

    async getProductbyID(id: string){
        const product = await this.produto.findUnique({
            where: { id: id },
            include: {
                category: {select:{name: true}}
            }
        })

        if(product == null){ //n tem produto com esse id
            throw new InvalidIDException();
        }

        return product;
    }

    async getAllProductsbyCategory(categoriaId: string){
        return await this.produto.findMany({
            where: {categoryId: Number(categoriaId)},
            include:{
              category: {
                  select: {name: true}
              }
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }

    async searchProductByName(productName: string){
        return await this.produto.findMany({
            where: {
                name: {
                    contains: productName,
                }
            }
        })
    }

    async deleteProduct(id: string){
        try{
            await this.produto.delete({
                where: { id: id }
            })
        } catch(e){
            throw new InvalidIDException();
        }
    }

    async editProduct(id: string, data: ProductBodyType){
        try {
            const produto = await this.produto.update({
                where: { id: id },
                data: {
                    name: data.name,
                    categoryId: data.categoryId,
                    price: data.price,
                    imgURL: data.imgURL,
                    quantity: data.quantity,
                }
            })

            return produto;
        } catch (e){
            throw new HttpException("ta errado", 400)
        }
    }

    /****************************
     CATEGORIES
     ****************************/

    async createCategory(data: CategorySchemaType){
        return await this.categoria.create({data: data})
    }

    async getAllCategories(){
        return await this.categoria.findMany({
            select: {
                id: true,
                name: true
            }
        });
    }
}