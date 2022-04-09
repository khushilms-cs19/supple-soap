import { Router } from "express";
import { users } from "../models/Users.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
import { customizedOrder } from "../models/CustomizedOrders.js";
const router = Router();

router.post("/user/login", async (req, res) => {
    const data = await users.findOne({
        email: req.body.email,
    })
    if (!data) {
        return res.status(401).send({
            error: "user not found",
        });
    } else {
        const { _doc: userData } = data;
        bcrypt.compare(req.body.password, userData.password, async (err, isMatch) => {
            if (err) {
                res.status(500).send({
                    error: "error occured try again some other time",
                })
            } else {
                if (isMatch) {
                    return res.status(202).send({
                        ...userData
                    })
                } else {
                    return res.status(401).send({
                        error: "Username or password is wrong."
                    });
                }

            }
        })
    }
});

router.get("/user/data", async (req, res) => {
    try {
        const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
        users.findById(userId).then((data) => {
            console.log(data);
            res.status(200).send({
                ...data._doc,
            });
        }).catch((err) => {
            console.log(err);
            res.status(401).send({
                error: "There was some error, please try again some other time.",
            });
        })
    } catch (err) {
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    }
})
router.put(("/user/cart/update"), async (req, res) => {
    console.log(req.body);
    try {
        const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
        users.findByIdAndUpdate(userId, {
            cart: req.body
        }).then(() => {
            const userData = users.findById(userId).then((data) => {
                res.status(201).send({
                    ...data._doc,
                })
            })
        })
    } catch (err) {
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    }
})
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
                return res.status(409).send({ error: "unable to create a user" });
            } else {
                const token = jwt.sign(data._id.toString(), process.env.JWTSECRET);
                data.token = token;
                data.save();
            }
            return res.status(201).send(data);
        })
    })
});

const getAllProductsDetails = async (allOrders) => {
    // console.log(allOrders);
    const allOrderDetails = allOrders.map(async (order) => {
        return new Promise(async (resolve, reject) => {
            const productDetails = await getProductDetails(order.productIds);
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

const getUserOrders = async (userId) => {
    const promise = new Promise((resolve, reject) => {
        orders.find({ userId: mongoose.Types.ObjectId(userId) }).then((data) => {
            resolve(data);
        })
    })
    return await promise;
}

const getUserCustomizedOrders = async (userId) => {
    const promise = new Promise((resolve, reject) => {
        customizedOrder.find({ userId: mongoose.Types.ObjectId(userId) }).then((data) => {
            resolve(data);
        });
    })
    return await promise;
}

router.get("/user/orders", async (req, res) => {
    try {
        const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
        const userOrders = await getUserOrders(userId);
        // console.log("here");
        console.log(userOrders);
        const userOrderDetailsNew = await getAllProductsDetails(userOrders);
        const userCustomizedOrderData = await getUserCustomizedOrders(userId);
        // console.log(userOrderDetailsNew);
        return res.send({
            regularProducts: userOrderDetailsNew,
            customizedProducts: userCustomizedOrderData,
        });
    } catch (err) {
        return res.status(500).send({
            error: "There is some error, try some other time.",
        });
    }
})
export { router as UserRoutes };