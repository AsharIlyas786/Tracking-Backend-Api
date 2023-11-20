import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB =async () => {
    try {
       const connectInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log(`\n MongoDb is connected..!! DB HOST: ${connectInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1) // learned new way to exit from exisitng process , they have multiple exit codes, so kindly google it
    }
}

export default connectDB;