import { NextFunction } from "express"

const asnycHandler = (asnycHandler)=>{
    return async(req,res,next)=>{
        try {
            await asnycHandler(req,res,next)
        } catch (error) {
            next(error)
        }

    }

}


/* const handler = (fn)=>{
    (req: Request,res : Response,next:any)=>{
        Promise.resolve(fn(req,res,next))
        .catch((err)=>{next(err)})
    }
} */

export default asnycHandler;