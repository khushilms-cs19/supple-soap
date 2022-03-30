import mongoose from "mongoose";
import "dotenv/config";
await mongoose.connect(process.env.MONGODBLINK).then(() => {
    console.log("connection is successful");
}).catch((err) => {
    console.log("Connection to the db failed");
})
