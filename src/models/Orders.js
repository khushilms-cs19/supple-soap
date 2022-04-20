import mongoose from "mongoose";
const OrdersSchema = new mongoose.Schema({
    productIds: {
        type: mongoose.Schema.Types.Array,
        required: true,
        ref: "products",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    status: {
        type: String,
        required: true,
        default: "order_placed"
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
export const orders = mongoose.model("orders", OrdersSchema);