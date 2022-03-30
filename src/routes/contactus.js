import mongoose from "mongoose";
import { Router } from "express";
import { contactUs } from "../models/ContactUs.js";
import jwt from "jsonwebtoken";
const router = Router();
router.post("/contactus", async (req, res) => {
    const contactUsData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description,
    }
    if (req.headers.authentication) {
        contactUsData.userId = jwt.verify(req.headers.authentication, process.env.JWTSECRET);
    }
    contactUs.create(contactUsData, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                error: "There has been an error. Try again after some time.",
            });
        } else {
            return res.status(201).send({
                message: "The message was sent. We will contact you soon."
            })
        }
    })
});

export { router as ContactUsRoutes };