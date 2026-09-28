import mongoose from "mongoose";
import dotenv from "dotenv"

import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config()
const connectDB = async () =>{
   try {
     await mongoose.connect(process.env.MONGO_URL!)
     console.log("MongoDB connected Successfully")
   } catch (error) {
    console.error("MongoDB connection Failed", error)

    process.exit(1)
   }
}

export default connectDB