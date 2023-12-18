
/* const errorHandlerMiddleware = (err,req,res,next)=>{

    return res.status(500).json({message: err})
}
 */
  class errorHandler extends Error{
    public statusCode: number;
    public data: null | any;
    public message: string;
    public success: boolean;
    public errors: any[];
    
    constructor(
        statusCode : number,
        message : string = "Something went wrong.",
        error : any[] = [],
        stack : string = ""
    ){
        super(message)
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = error;

        if (stack) {
            this.stack = stack
            
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}  

export default errorHandler
