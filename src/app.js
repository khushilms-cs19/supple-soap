import express from "express";
import cors from "cors";
import { ProductsRoutes } from "./routes/products.js";
import "./db/connection.js";
import { UserRoutes } from "./routes/users.js";
import { OrdersRoutes } from "./routes/orders.js";
import "dotenv/config";
import { ContactUsRoutes } from "./routes/contactus.js";
import { AdminRoutes } from "./routes/admin.js";
// const express = require("express");
// const cors = require("cors");
// const { ProductsRoutes } = require("./routes/products");
// require("./db/connection")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(cors({
//     origin: "*",
//     methods: [
//         "GET",
//         "POST",
//         "PUT",
//     ],
//     allowedHeaders: [
//         "Content-Type",
//         "Authentication",
//     ],
// }));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.send({ status: "good" });
});
app.use(ProductsRoutes);
app.use(UserRoutes);
app.use(OrdersRoutes);
app.use(ContactUsRoutes);
app.use(AdminRoutes);
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
});