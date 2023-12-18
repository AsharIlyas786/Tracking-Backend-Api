import asyncwrapper from '../utils/asyncHanlder'
import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse';
import { Users } from '../model/user.model'
import  AuthenticatedRequest  from './auth.req';
import errorHandler from '../utils/error.handler';


export const verifyJWT = asyncwrapper(async(req: AuthenticatedRequest, res: Response, next: NextFunction )=>{

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiResponse(401, "Unauthorized request.!!")
        }
    
         const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET || "app-secret")
    
         const user = await Users.findById(
            typeof decodedToken === 'object' ? decodedToken._id : decodedToken
          ).select("-password -refreshToken");

        if (!user) {
            throw new ApiResponse(401, "Invalid Access token.!!")
        
        }
    
        req.user = user;
        next()
        
    } catch (error) {
        throw new errorHandler(401, error.message || "Invalid access token.!!")

    }
})