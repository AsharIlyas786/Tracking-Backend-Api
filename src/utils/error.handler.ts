
const errorHandlerMiddleware = (err,req,res,next)=>{

    return res.status(500).json({message: err})
}

module.exports = errorHandlerMiddleware


/*  class errorHandler extends Error{
    constructor(
        statusCode,
        message = "Something went wrong.",
        error= [],
        statck= ""
    ){
        super(message)
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = error;

        if (statck) {
            this.stack = statck
            
        }
        else{
            Error.captureStackTrace(this, this.constructer)
        }

    }
}  */