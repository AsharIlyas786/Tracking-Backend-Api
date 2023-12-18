import mongoose, { Document, Types , Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import errorHandler from "../utils/error.handler";


interface UserDocument extends Document{
  userName: string;
  email: string;
  fullName: string;
  password: string;
  refreshToken?: string | null;
  task?: Types.ObjectId;
  exercise?: Types.ObjectId;
  weight?: Types.ObjectId;

  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;



  
}

const userSchema = new Schema<UserDocument>(
    {
        userName : {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim : true,
            index : true, // using for searching in database for enable for optimizing 
        },
        email : {
            type: String,
            required : true,
            unique: true, 
            lowercase: true,
            trim : true,
        },
        fullName : {
            type: String,
            required : true,
            trim : true,
            index: true
        },      
        password : {
            type: String,
            required : [true, "Password is required..!"],
        },  
        refreshToken : {
            type: String
        },  
        task: {
            type: Schema.Types.ObjectId,
            ref: "task"
        },
         exercise: {
            type: Schema.Types.ObjectId,
            ref: "exercise"
        },
        weight: {
            type: Schema.Types.ObjectId,
            ref: "weight"
        }, 
    
    },
    {
        timestamps:true // createdAt and updatedAt will get timestamp from here in second object
    }
    
);



userSchema.pre("save", async function (next : any) { // if we use arrow function here so w'll not have access to this. fields name 
    if (!this.isModified("password")) {
        return next();
    }
   this.password = await bcrypt.hash(this.password, 10);
    next();
    
})

userSchema.methods.isPasswordCorrect = async function (password: string) {

  return await bcrypt.compare(password, this.password) // will return true or false
   
}


userSchema.methods.generateAccessToken = async function () {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'app-secret';

   return await jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username
    },
    accessTokenSecret,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY || '1d'
    })

}

userSchema.methods.generateRefreshToken = async function () {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'app-secret-refresh';

    return await jwt.sign({ // refresh roken mei payload kam se kam hota hy , bas _id
        _id : this._id
    },
    refreshTokenSecret,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY || '10d'
    })
}

export const Users = mongoose.model<UserDocument>("Users", userSchema);