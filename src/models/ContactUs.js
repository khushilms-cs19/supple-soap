import mongoose from "mongoose";
const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
    },
    status: {
        type: String,
        default: "unattended",
    }
}, {
    timestamps: true,
});

export const contactUs = mongoose.model("contactUs", ContactUsSchema);