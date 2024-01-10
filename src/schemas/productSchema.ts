import {z} from "zod";

export const ProductSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    imgURL: z.string().url(),
    categoryId: z.coerce.number()
}).strict()

export type ProductBodyType = z.infer<typeof ProductSchema>;