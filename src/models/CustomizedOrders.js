import { Schema, model } from "mongoose";
const CustomizedOrderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
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
    }
});
export const customizedOrder = model("customizedOrder", CustomizedOrderSchema);