import { Router } from "express";
import { products } from "../models/Products.js";
const router = Router();

router.get("/products", async (req, res) => {
    const productsAll = await products.find();
    res.send({
        status: "good",
        products: productsAll,
    })
    console.log(productsAll);
});
router.post("/products", async (req, res) => {
    const productData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        usage: req.body.usage,
        image: req.body.image,
    }
    products.create(productData, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: "There has been an error, try again after some time",
            });
        }
        return res.status(201).send({ ...data, message: "The products has been added successfully" });
    });

})
export { router as ProductsRoutes };