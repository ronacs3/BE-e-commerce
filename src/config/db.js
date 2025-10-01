import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://quanghoangminh12345:Quanghaingaq@cluster0.ylfuc5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
}
