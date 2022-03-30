import { Router } from "express";
import { users } from "../models/Users.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
const jwtSecret = "supple";
const router = Router();

router.post("/user/login", async (req, res) => {
    const data = await users.findOne({
        email: req.body.email,
    })
    if (!data) {
        return res.send({
            error: "user not found",
        });
    } else {
        const { _doc: userData } = data;
        bcrypt.compare(req.body.password, userData.password, async (err, isMatch) => {
            if (err) {
                res.send({
                    error: "error occured try again some other time",
                })
            } else {
                if (isMatch) {
                    return res.send({
                        status: "Authenticated",
                        token: userData.token,
                    })
                } else {
                    return res.status(404).send({
                        error: "username or password is wrong."
                    });
                }

            }
        })
    }
});

router.post("/user/signup", async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            phoneno: req.body.phoneno,
        }
        // const userToken = jwt.sign({})
        users.create(userData, (err, data) => {
            if (err) {
                return res.status(400).send({ error: "unable to create a user" });
            } else {
                const token = jwt.sign(data._id.toString(), jwtSecret);
                data.token = token;
                data.save();
            }
            return res.status(201).send(data);
        })
    })
});

const getAllProductsDetails = async (allOrders) => {
    const allOrderDetails = allOrders.map(async (order) => {
        return new Promise(async (resolve, reject) => {
            const productDetails = await getProductDetails(order.productId);
            resolve({
                ...order._doc,
                productDetails: productDetails,
            });
        })
    })
    return Promise.all(allOrderDetails).then((data) => {
        return data;
    });
}

const getProductDetails = async (productIds) => {
    const promiseArray = productIds.map((product) => {
        return new Promise((resolve, reject) => {
            products.findById(product.id).then((data) => {
                resolve({ ...data._doc, quantity: product.quantity });
            })
        });
    });
    return Promise.all(promiseArray).then((data) => {
        return data;
    })
}

router.get("/user/orders", async (req, res) => {
    try {
        const userId = jwt.verify(req.headers.authentication, jwtSecret);
        const userOrders = await orders.find({ userId: mongoose.Types.ObjectId(userId) });
        const userOrderDetailsNew = await getAllProductsDetails(userOrders);
        return res.send(userOrderDetailsNew);
    } catch (err) {
        return res.status(500).send({
            error: "There is some error, try some other time.",
        });
    }
})
export { router as UserRoutes };