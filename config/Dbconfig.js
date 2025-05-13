import mongoose from "mongoose";
import donenv from "dotenv"
donenv.config()

const Mongodburl = process.env.DBURL;

export async function Connectmongodb() {
    await mongoose.connect(Mongodburl , )
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection failed", error));
}
