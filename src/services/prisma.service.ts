import { PrismaClient } from "@prisma/client";
import {HttpException, Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import { z } from "zod";
import {InvalidIDException} from "../exceptions/invalidID.exception";

export const ProductSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    category: z.string(),
    imgURL: z.string()
})

export type ProductBodyType = z.infer<typeof ProductSchema>;

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

    async createProduct(data: ProductBodyType){
        await this.produto.create({data})
    }

    async getAllProducts(){
        return await this.produto.findMany({
            orderBy: {
                updatedAt: "desc",
            }
        });
    }

    async getProductbyID(id: string){
        const product = await this.produto.findUnique({
            where: { id: id }
        })

        if(product == null){ //n tem produto com esse id
            throw new InvalidIDException();
        }

        return product;
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
                    category: data.category,
                    price: data.price,
                    imgURL: data.imgURL,
                    quantity: data.quantity,
                    //updatedAt: Date.now().toString()
                }
            })

            return produto;
        } catch (e){
            throw new HttpException("ta errado", 400)
        }
    }
}