import mongoose from "mongoose";
import dotenv from "dotenv";

const dbCon =async ()=>{
    try {
       await mongoose.connect(process.env.DB_URL);
        console.log("mongodb is connected");
    } catch (error) {
        console.log(error);
    }
}

export default dbCon;