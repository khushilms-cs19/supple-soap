import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
});
export const admin = mongoose.model("admin", AdminSchema);