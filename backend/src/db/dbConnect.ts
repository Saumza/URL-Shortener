import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URI || "")
        console.log(connectInstance.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export { connectDB }