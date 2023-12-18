import { Request, Response } from 'express';
import { Users } from '../model/user.model'
import asyncwrapper from '../utils/asyncHanlder'
import errorHandler from '../utils/error.handler'
import { ApiResponse } from '../utils/ApiResponse';
import { Types, Document } from 'mongoose';
import AuthenticatedRequest from '../middleware/auth.req';

/* const createUser = asyncwrapper(async (req: express.Request , res: express.Response)=>{  
    const createUsers = await Users.create(req.body);
    res.sendStatus(200).json({createUser})
});


const getAllUsers = asyncwrapper(async (req: express.Request , res: express.Response)=>{
    const userslist = await Users.find({});
    res.sendStatus(200).json({getAllUsers})

}); */

const generateAccessAndRefreshTokens = async (userId: Types.ObjectId) => {
    try {
        const user = await Users.findById(userId)

        if (!user) {
            throw new errorHandler(404, 'User not found'); // or handle the absence of user in some way
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();


        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        throw new errorHandler(500, "something went wrong while generating access and refresh toekn..!!")
    }

}

const registerUser = asyncwrapper(async (req: Request, res: Response) => {
    try {

        // 1. get user details from frontend
        // 2. validation - not empty
        // 3. check if user already exists : username , email
        // 4. create user object - create entry in DB
        // 5. remove password and refresh  toekn field from response
        // 6. check user creation
        // 7. return response.

        /* res.status(200).json({
            message: "testing api.. ok"
        }) */

        const { userName, email, password, fullName } = req.body;
        console.log({ "userName ": userName });
        //  res.status(200).json(data.email);

        if (
            [email, fullName, password, userName].some((fields) =>
                fields?.trim() === "")
        ) {
            throw new errorHandler(400, "All fields are required..!!")

        }

        const existedUser = await Users.findOne({
            $or: [{ userName: userName }, { email: email }]
        });

        if (existedUser) {
            throw new errorHandler(409, "This userName or email address already exists in the database..!")
        }

        const user = await Users.create({
            fullName: fullName,
            email: email,
            password: password,
            userName: userName
        })

        const createdUser = await Users.findById(user._id).select(
            "-password -refreshToken" // avoid those fields to select and ignore them in response
        )
        if (!createdUser) {
            throw new errorHandler(500, "Something went wrong when registering the user..!")
        }

        res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Succesfully..!!")
        )
    } catch (error) {

    }

})

const loginUser = asyncwrapper(async (req: Request, res: Response) => {


    // TODO
    //req body ---> data
    // username or email for login submit
    // find the user or email
    // check Exiteduser
    //Password check
    // access & refreshToken generate
    //send token in cookies
    //response


    const { userName, email, password } = req.body
    if (!userName && !email) {
        throw new errorHandler(400, "username or password is required..!!")
    }

    const existedUser = await Users.findOne({
        $or: [{ userName: userName }, { email: email }]
    });

    if (!existedUser) {
        throw new errorHandler(404, "User does not exist..!!")
    }

    const isPasswordValid = await existedUser.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new errorHandler(401, "Incorrect password..!!")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existedUser._id)

    const loggedInUser = await Users.findById(existedUser._id)
        .select("-password -refreshToken")

    // sending cookies with data 

    const options = {
        httpOnly: true, // this cookies only be modified by server not from frontend.. thatshy we use options here for security 
        secure: true
    }

    const responsejson = new ApiResponse(200,
        { user: loggedInUser, accessToken, refreshToken },
        "User login successfully..!!!"
    )

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(responsejson)



})



const logoutUser = asyncwrapper(async (req: AuthenticatedRequest, res: Response) => {
    await Users.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true, // this cookies only be modified by server not from frontend.. thatshy we use options here for security 
        secure: true
    }
    const apiResponse = new ApiResponse(200, {}, "User logged out successfully.!!");
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(apiResponse);
})

export {
    registerUser,
    loginUser,
    logoutUser
}