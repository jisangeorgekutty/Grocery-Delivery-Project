import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/freshdrop`);
        console.log(`MongoDB Connection Successfull ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error)
    }
}