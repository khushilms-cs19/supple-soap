import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "taavadesingh420@gmail.com",
        pass: "Taavade1052",
    }
});

export default transporter;