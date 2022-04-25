import { Router } from "express";
import mongoose from "mongoose";
import { orders } from "../models/Orders.js";
import { products } from "../models/Products.js";
import jwt from "jsonwebtoken";
import { customizedOrder } from "../models/CustomizedOrders.js";
import transporter from "../db/mailer.js";
import { users } from "../models/Users.js";
import Razorpay from 'razorpay';
import shortid from "shortid";
const router = Router();
const instance = new Razorpay({
    key_id: process.env.RAZORKEYID,
    key_secret: process.env.RAZORKEYSECRET,
});


const getTotalAmount = async (productsOrdered) => {
    // console.log(productsOrdered)
    const promiseArray = productsOrdered.map((product) => {
        return new Promise((resolve, reject) => {
            products.findById(product.productId).then((data) => {
                resolve(data.price * product.quantity);
            })
        });
    });
    return Promise.all(promiseArray).then((data) => {
        return data.reduce((prev, curr) => prev + curr, 0);
    })
}
const formulateMail = (listProducts) => {
    // console.log(listProducts);
    let sumTotal = 0
    const mailarray = listProducts.regularProducts.map((product, index) => {
        const productPriceTotal = product.productData.price * product.quantity;
        sumTotal += productPriceTotal
        const maildata = `<tr>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${index + 1}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${product.productData.name}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${product.quantity}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${product.productData.price}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">₹${productPriceTotal}</td>
      </tr>`
        // return `<p>${index + 1}. ${product.productData.name} quantity: ${product.quantity}</p>`
        return maildata;
    });
    const finalEmail = `<h1>Your order has been placed.</h1>
    <h6>The details of the order is given below.</h6>
    <table style="border: 1px solid black; border-collapse: collapse;padding: 10px;">
    <tr>
    <th style="border: 1px solid black; border-collapse: collapse;padding: 10px;">SL No.</th>
    <th style="border: 1px solid black; border-collapse: collapse;padding: 10px;">Product Name</th>
    <th style="border: 1px solid black; border-collapse: collapse;padding: 10px;">Quantity</th>
    <th style="border: 1px solid black; border-collapse: collapse;padding: 10px;">Unit Price</th>
    <th style="border: 1px solid black; border-collapse: collapse;padding: 10px;">Total Price</th>
    </tr>
    ${mailarray?.join("")}
    ${listProducts.customizedProducts ? formulateMailCustomized(listProducts.customizedProducts, sumTotal, listProducts.regularProducts.length) : `
    <tr>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 2px solid black; border-collapse: collapse;padding: 10px;">₹${sumTotal}</td>
    </tr>
    </table>
    <div>
        <p>Contact us for any queries or requests.</p>
        <p>Thank you for ordering.</p>
    </div>
    `}
    `
    return finalEmail;
}
const formulateMailCustomized = (listProducts, sumTotal, mainIndex) => {
    const mailarray = listProducts.map((product, index) => {
        const productPriceTotal = product.totalAmount;
        sumTotal += productPriceTotal
        const maildata = `<tr>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${mainIndex + index + 1}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">Customized: ${capitalizeName(product.base)}, ${capitalizeName(product.scrub)}, ${capitalizeName(product.type)}, ${capitalizeName(product.fragrance)}, ${capitalizeName(product.essentialOil)}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${product.quantity}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">${200}</td>
        <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;">₹${productPriceTotal}</td>
      </tr>
      `
        // return `<p>${index + 1}. ${product.productData.name} quantity: ${product.quantity}</p>`
        return maildata;
    });

    const finalEmail = `
        ${mailarray?.join("")}
        <tr>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 1px solid black; border-collapse: collapse;padding: 10px;"></td>
    <td style="border: 2px solid black; border-collapse: collapse;padding: 10px;">₹${sumTotal}</td>
    </tr>
    </table>
    <div>
        <p>Contact us for any queries or requests.</p>
        <p>Thank you for ordering.</p>
    </div>
    `
    return finalEmail;
}
const capitalizeName = (name) => {
    return name.split(" ").map((n) => n[0].toUpperCase() + n.slice(1)).join(" ");
}

router.post("/order/razorpay-create-order", async (req, res) => {
    if (!req.headers.authentication) {
        return res.status(403).send({
            error: "You need to login first",
        });
    }
    const regularProducts = req.body.regularProducts;
    const customizedProducts = req.body.customizedProducts;
    let finalTotalAmount = 0;
    let regularProductsTotalAmount;
    if (regularProducts.length !== 0) {
        regularProductsTotalAmount = await getTotalAmount(regularProducts);
        finalTotalAmount += regularProductsTotalAmount;
    }
    if (customizedProducts.length !== 0) {
        let customizedProductsTotalAmount = 0;
        customizedProducts.map((product) => {
            customizedProductsTotalAmount += product.quantity * 200;
        });
        finalTotalAmount += customizedProductsTotalAmount;
    }
    const options = {
        // amount: 100,
        amount: finalTotalAmount * 100,
        currency: "INR",
        receipt: shortid.generate(),
    }
    instance.orders.create(options, (err, order) => {
        if (err) {
            res.status(500).send({
                message: "There was some error creating the order.",
            });
        } else {
            res.status(201).send({
                orderData: order,
            });
        }
    });
})
router.post("/order/regular", async (req, res) => {
    if (!req.headers.authentication) {
        return res.status(403).send({
            error: "You need to login to place an order",
        });
    }
    const regularProducts = req.body.regularProducts;
    const customizedProducts = req.body.customizedProducts;
    const razorpayDetails = req.body.razorpay;
    // console.log(razorpayDetails);
    let finalTotalAmount = 0;
    let regularProductsTotalAmount;
    let customizedOrderData;
    if (regularProducts.length !== 0) {
        regularProductsTotalAmount = await getTotalAmount(regularProducts);
        finalTotalAmount += regularProductsTotalAmount;
    }
    if (customizedProducts.length !== 0) {
        let customizedProductsTotalAmount = 0;
        customizedOrderData = customizedProducts.map((product) => {
            customizedProductsTotalAmount += product.quantity * 200;
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
        finalTotalAmount += customizedProductsTotalAmount;
    }
    const userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
    const userData = await users.findById(userId);
    // const options = {
    //     amount: finalTotalAmount,
    //     currency: "INR",
    // }
    // instance.orders.create(options, (err, order) => {
    //     console.log(order);
    //     res.send({ orderId: order.id });
    // })
    let regularOrderPlacedId = undefined;
    try {
        if (regularProducts.length !== 0) {
            const orderData = {
                productIds: regularProducts.map((product, index) => {
                    return {
                        quantity: product.quantity,
                        id: mongoose.Types.ObjectId(product.productId)
                    }
                }),
                userId: mongoose.Types.ObjectId(userId),
                totalAmount: regularProductsTotalAmount,
                razorpay_payment_id: razorpayDetails.paymentId,
                razorpay_order_id: razorpayDetails.orderId,
                razorpay_signature: razorpayDetails.signature,
            }

            orders.create(orderData, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        error: "cannot place the order at this time , please try again later.",
                    });
                }
                console.log("here order: ", data._doc._id);
                regularOrderPlacedId = data._doc._id;
                if (customizedProducts.length === 0) {
                    transporter.sendMail({
                        from: "taavadesingh420@gmail.com",
                        to: userData.email,
                        subject: "Supple Soap order confirmation.",
                        html: `${formulateMail({ regularProducts: regularProducts })}`
                    }, (err, info) => {
                        if (err) {
                            console.log("Error occured while sending email");
                            console.log(err);
                        } else {
                            // console.log(info);
                        }
                    })
                    return res.send({
                        message: "order was placed successfully",
                    })
                }
            });
        }
        if (customizedProducts.length !== 0) {
            // const customizedOrderData = customizedProducts.map((product) => {
            //     return {
            //         base: product.base,
            //         scrub: product.scrub,
            //         type: product.type,
            //         fragrance: product.fragrance,
            //         essentialOil: product.essentialOil,
            //         totalAmount: product.quantity * 200,
            //         quantity: product.quantity,
            //     }
            // });
            console.log(regularOrderPlacedId);
            const finalData = {
                userId: mongoose.Types.ObjectId(userId),
                products: customizedOrderData,
                associatedOrder: regularOrderPlacedId,
                razorpay_payment_id: razorpayDetails.paymentId,
                razorpay_order_id: razorpayDetails.orderId,
                razorpay_signature: razorpayDetails.signature,
            }
            customizedOrder.create(finalData, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        error: "There was some problem, try again after some time.",
                    })
                } else {
                    transporter.sendMail({
                        from: "taavadesingh420@gmail.com",
                        to: userData.email,
                        subject: "Supple Soap order confirmation.",
                        html: formulateMail({
                            regularProducts: regularProducts,
                            customizedProducts: customizedOrderData,
                        })
                    }, (err, info) => {
                        if (err) {
                            console.log("Error occured while sending email");
                            console.log(err);
                        } else {
                            // console.log(info);
                        }
                    })
                    return res.status(201).send({
                        message: "The order is placed successfully",
                    });
                }
            })
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
            // console.log(data._doc);
            return res.status(201).send({
                message: "The order is placed successfully",
            });
        }
    })
});

export { router as OrdersRoutes };