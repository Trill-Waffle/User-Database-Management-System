import logger from "../logger.js";
export async function errorMiddleWare(err,req,res,next){

    if(res.headerSent === true){
        return next(err);
    }else{
        logger.error(`Error: ${err.message}`);
        res.status(err.statusCode || 500).json({
            error: err.message || "internal BookStore Sever Error"
        });
    }
}