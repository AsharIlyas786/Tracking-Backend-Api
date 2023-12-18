import { Request, Response, NextFunction } from 'express';

const asyncHandler = (asyncHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await asyncHandler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};



/* const asnycHandler = (asnycHandler)=>{
    return async(req:express.Request, res : express.Response , next : express.NextFunction)=>{
        try {
            await asnycHandler(req,res,next)
        } catch (error) {
            next(error)
        }

    }

} */


/* const handler = (fn)=>{
    (req: Request,res : Response,next:any)=>{
        Promise.resolve(fn(req,res,next))
        .catch((err)=>{next(err)})
    }
} */

export default asyncHandler;