import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    usage: {
        type: String,
        required: true,
    },
    netweight: {
        type: Number,
        required: false,
        default: 150,
    },
    orderCount: {
        type: Number,
        required: false,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    }
});

export const products = mongoose.model("products", ProductSchema);