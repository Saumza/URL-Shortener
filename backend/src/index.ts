import mongoose, { Error } from "mongoose";
import { app } from "./app.js";
import { connectDB } from "./db/dbConnect.js";
import dotenv from "dotenv"


dotenv.config({
    path: ".env"
})

connectDB().then(() => {
    mongoose.connection.on("error", () => {
        console.log("DataBase isn't connected")
    })
    app.listen(process.env.PORT, () => {
        console.log("Server is running on PORT:", process.env.PORT);
    })
}).catch((error: Error) => {
    console.log("DB Connection Failed:", error.cause);

})