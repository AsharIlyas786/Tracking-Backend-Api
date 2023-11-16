import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB =async () => {
    try {
       const connectInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log(`\n MongoDb is connected..!! DB HOST: ${connectInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1) // Node process se exit liya hai isi lize 1 use kiya hai , iske or b method or purpose hai kindly google it
    }
}

export default connectDB;