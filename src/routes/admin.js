import { Router } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
import { users } from "../models/Users.js";
import { customizedOrder } from "../models/CustomizedOrders.js";
import { contactUs } from "../models/ContactUs.js";
import { admin } from "../models/Admin.js";
import bcrypt from "bcrypt";
const router = Router();

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
    });
}

const getUserDetails = async (userId) => {
    return await new Promise((resolve, reject) => {
        users.findById(userId).then((data) => {
            if (data) {
                resolve(data._doc);
            } else {
                reject({
                    error: "error",
                })
            }
        })
    });
}

const getRegularOrdersData = async (regularOrders) => {
    const promiseArray = regularOrders.map(async (order) => {
        return new Promise(async (resolve, reject) => {
            const productDetails = await getProductDetails(order._doc.productIds);
            const userDetails = await getUserDetails(order._doc.userId);
            resolve({
                ...order._doc,
                productDetails: productDetails,
                userDetails: userDetails,
            })
        })
    });
    return Promise.all(promiseArray).then((data) => {
        return data;
    })
}
const getCustomizedOrderData = async (customizedOrders) => {
    const promiseArray = customizedOrders.map(async (order) => {
        return new Promise(async (resolve, reject) => {
            const userDetails = await getUserDetails(order._doc.userId);
            resolve({
                ...order._doc,
                userDetails: userDetails,
            })
        })
    });
    return Promise.all(promiseArray).then((data) => {
        return data;
    })
}


const frameMessages = async (messages) => {
    const promiseArray = messages.map((mesg) => {
        return new Promise(async (resolve, reject) => {
            if (mesg.userId) {
                const userDetails = await users.findById(mesg.userId);
                resolve({
                    ...mesg._doc,
                    userDetails: userDetails,
                });
                return;
            }
            resolve({
                ...mesg._doc,
            })
        })
    })
    return Promise.all(promiseArray).then((data) => {
        return data;
    })
}
router.get("/admin/orders", async (req, res) => {
    if (!req.headers.adminauthentication) {
        res.send({
            message: "You need to be an admin to access this page.",
        });
        return;
    }
    const adminId = jwt.verify(req.headers.adminauthentication, process.env.JWTSECRET);
    admin.findById(adminId).then(async (data) => {
        if (data) {
            let regularOrders = await orders.find({
                status: { $ne: "delivered" }
            });
            regularOrders = await getRegularOrdersData(regularOrders);

            let customizedOrders = await customizedOrder.find({
                status: { $ne: "delivered" }
            });
            customizedOrders = await getCustomizedOrderData(customizedOrders);
            res.status(200).send({
                regularOrders,
                customizedOrders,
            })
        } else {
            res.status(500).send({
                error: "there was some error, try again after some time.",
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    })
});

router.get("/admin/customer-messages", async (req, res) => {
    if (!req.headers.adminauthentication) {
        res.send({
            message: "You need to be an admin to access this page.",
        });
        return;
    }
    const adminId = jwt.verify(req.headers.adminauthentication, process.env.JWTSECRET);
    admin.findById(adminId).then(async (data) => {
        if (data) {
            const messages = await contactUs.find({
                status: "unattended"
            });
            const finalData = await frameMessages(messages);
            res.status(201).send(finalData);
        } else {
            res.status(500).send({
                error: "there was some error, try again after some time.",
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    });
})

router.post("/admin/customer-messages/update", async (req, res) => {
    if (!req.headers.adminauthentication) {
        res.send({
            message: "You need to be an admin to access this page.",
        });
        return;
    }
    const adminId = jwt.verify(req.headers.adminauthentication, process.env.JWTSECRET);
    admin.findById(adminId).then(async (data) => {
        if (data) {
            const message = await contactUs.findById(req.body.messageId);
            message.status = req.body.status;
            message.save();
            return res.status(201).send({
                message: "The status is updated."
            });
        } else {
            res.status(500).send({
                error: "there was some error, try again after some time.",
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    })
});

router.post("/admin/orders/update", async (req, res) => {
    if (!req.headers.adminauthentication) {
        res.send({
            message: "You need to be an admin to access this page.",
        });
        return;
    }
    const adminId = jwt.verify(req.headers.adminauthentication, process.env.JWTSECRET);
    admin.findById(adminId).then(async (data) => {
        if (data) {
            const orderType = req.body.type;
            const orderId = req.body.orderId;
            const status = req.body.status;
            if (orderType === "supple") {
                const order = await orders.findById(orderId);
                order.status = status;
                order.save();
                return res.status(201).send({
                    message: "The status is updated."
                });
            } else {
                const custOrder = await customizedOrder.findById(orderId);
                custOrder.status = status;
                custOrder.save();
                return res.status(201).send({
                    message: "The status is updated",
                });
            }
        } else {
            res.status(500).send({
                error: "there was some error, try again after some time.",
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            error: "there was some error, try again after some time.",
        })
    })
});

router.post("/admin/login", async (req, res) => {
    const data = await admin.findOne({
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
})
router.post("/admin/signup", async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const userData = {
            email: req.body.email,
            password: hashedPassword,
        }
        // const userToken = jwt.sign({})
        admin.create(userData, (err, data) => {
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
export { router as AdminRoutes };