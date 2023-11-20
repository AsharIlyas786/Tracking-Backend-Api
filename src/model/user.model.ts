import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        username : {
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
            required : [true, 'Password is required..!'],
        },  
        refreshToken : {
            type: String,
            required : true
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

userSchema.methods.isPasswordCorrect = async function (password: String) {

  return await bcrypt.compare(password, this.password) // will return true or false
   
}

userSchema.methods.generateAccessToeken = async function () {
   return await jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
    
}

userSchema.methods.generateRefreshToeken = async function () {

    return await jwt.sign({ // refresh roken mei payload kam se kam hota hy , bas _id
        _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
    
}

export  const User = mongoose.model("User", userSchema);