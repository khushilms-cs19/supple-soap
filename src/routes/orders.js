import { Router } from "express";
import mongoose from "mongoose";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
const router = Router();

const getTotalAmount = async (productIds) => {
    const promiseArray = productIds.map((product) => {
        return new Promise((resolve, reject) => {
            products.findById(product.id).then((data) => {
                resolve(data.price);
            })
        });
    })
    return Promise.all(promiseArray).then((data) => {
        return data.reduce((prev, curr) => prev + curr, 0);
    })
}

router.post("/order", async (req, res) => {
    try {
        const orderData = {
            productId: req.body.productId.map((product, index) => {
                return {
                    quantity: product.quantity,
                    id: mongoose.Types.ObjectId(product.id)
                }
            }),
            userId: mongoose.Types.ObjectId(req.body.userId),
            totalAmount: await getTotalAmount(req.body.productId),
        }
        orders.create(orderData, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    error: "cannot place the order at this time , please try again later.",
                });
            }
            return res.status(201).send({
                ...data._doc,
                message: "Order Placed successfully",
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "cannot place the order at this time , please try again later.",
        });
    }
});

export { router as OrdersRoutes };