const ErrorHandler = require('./ErrorHandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err?.statusCode ?? 500;
    err.message = err?.message ?? 'Internal Server Error';
    
    if(err.code === 11000){
        message = `Duplicate key Error : ${Object.keys(err.keyValue)} `,
        err = new ErrorHandler(message,404)

    }

    if(err.name === 'TokenExpiredError'){
        message = "Invalid Token",
        err = new ErrorHandler(message,404);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        errorStack : err.stack
    })
}