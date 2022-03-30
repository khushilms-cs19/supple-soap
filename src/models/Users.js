import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: false,
        default: "",
    },
    cart: {
        type: Object,
        required: false,
        default: [],
    }
});

export const users = mongoose.model("users", UsersSchema);