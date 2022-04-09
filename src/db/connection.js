import mongoose from "mongoose";
import "dotenv/config";
console.log("here in connection file");
await mongoose.connect(process.env.MONGODBLINK).then(() => {
    console.log("connection is successful");
}).catch((err) => {
    console.log("Connection to the db failed");
})
// console.log("completed connection function");