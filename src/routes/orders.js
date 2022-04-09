import { Router } from "express";
import mongoose from "mongoose";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
import jwt from "jsonwebtoken";
import { customizedOrder } from "../models/CustomizedOrders.js";
const router = Router();

const getTotalAmount = async (productsOrdered) => {
    const promiseArray = productsOrdered.map((product) => {
        return new Promise((resolve, reject) => {
            products.findById(product.productId).then((data) => {
                resolve(data.price);
            })
        });
    });
    return Promise.all(promiseArray).then((data) => {
        return data.reduce((prev, curr) => prev + curr, 0);
    })
}

router.post("/order/regular", async (req, res) => {
    if (!req.headers.authentication) {
        return res.status(403).send({
            error: "You need to login to place an order",
        });
    }
    const regularProducts = req.body;
    const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
    try {
        if (regularProducts) {
            const orderData = {
                productIds: regularProducts.map((product, index) => {
                    // console.log(product.quantity, product.productId);
                    return {
                        quantity: product.quantity,
                        id: mongoose.Types.ObjectId(product.productId)
                    }
                }),
                userId: mongoose.Types.ObjectId(userId),
                totalAmount: await getTotalAmount(regularProducts),
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
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "cannot place the order at this time , please try again later.",
        });
    }
});

router.post("/order/customized", async (req, res) => {
    if (!req.headers.authentication) {
        return res.status(403).send({
            error: "You need to login to place an order",
        });
    }
    const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
    // console.log(req.body);
    const customizedOrderData = req.body.map((product) => {
        return {
            base: product.base,
            scrub: product.scrub,
            type: product.type,
            fragrance: product.fragrance,
            essentialOil: product.essentialOil,
            totalAmount: product.quantity * 200,
            quantity: product.quantity,
        }
    });
    const finalData = {
        userId: mongoose.Types.ObjectId(userId),
        products: customizedOrderData,
    }
    customizedOrder.create(finalData, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: "There was some problem, try again after some time.",

            })
        } else {
            console.log(data._doc);
            return res.status(201).send({
                message: "The order is placed successfully",
            });
        }
    })
});

export { router as OrdersRoutes };