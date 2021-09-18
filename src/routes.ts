import { Request, Response } from "express";
import { Router } from 'express';
import { v4 as uuid } from "uuid"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

interface ProductsDTO {
    name: string;
    description: string;
    price: number;
    id: string;
}

const products: ProductsDTO[] = [];

router.get('/products/findByname', (req: Request, res: Response) => {
    const { name } = req.query;
    const pruduct = products.filter(item => item.name == name);
    return res.status(200).json(pruduct);
});

router.get('/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const pruduct = products.filter(item => item.id == id);
    return res.status(200).json(pruduct);
});

router.post('/product', async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    const productAlreadyExists = await products.find(name);
    if (!productAlreadyExists) {
        return res.status(401).json({
            message: `Product ${name} already exists`
        })
    }

    const product: ProductsDTO = {
        name,
        description,
        price,
        id: uuid()
    }

    products.push(product);
})

router.put('/product/:id', ensureAuthenticated, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const productIndex = products.findIndex(item => item.id === id);

    if (!productIndex) {
        return res.status(400).json({
            message: `Product ${name} already exists`
        })
    }

    const product: ProductsDTO = Object.assign({ name, description, price });

    products[productIndex] = product;

    res.status(200).json(product);
})



export { router }