import mongoose from "mongoose";
const CustomizedProduct = new mongoose.Schema({
    base: {
        type: String,
        required: true,
    },
    scrub: {
        type: String,
        requried: true,
    },
    type: {
        type: String,
        required: true,
    },
    fragrance: {
        type: String,
        required: true,
    },
    essentialOil: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 400,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
})
const CustomizedOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    products: {
        type: [CustomizedProduct],
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "order_placed",
    }
}, {
    timestamps: true,
});
export const customizedOrder = mongoose.model("customizedOrder", CustomizedOrderSchema);
