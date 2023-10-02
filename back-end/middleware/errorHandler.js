const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleWare = async (err, req, res, next) => {
    console.log(err);
    let customError = {
        msg: err.message || "Something went wrong pls try again.",
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR 
    }

    //Validation errors
    if(err.name === "ValidationError"){
        const errorArrays = Object.values(err.errors).map((obj) => {
            return obj.properties
        });
        customError.msg = {errors : errorArrays}
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    return res.status(customError.statusCode).json({errMsg: customError.msg})
}

module.exports = errorHandlerMiddleWare;