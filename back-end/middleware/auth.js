const jwt = require("jsonwebtoken");
const errors = require("../errors")
require("dotenv").config();

const authMiddleWare = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new errors.UnauthenticatedError("Authentication has failed.");
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {...payload};
        next();
    }catch(err){
        throw new errors.UnauthenticatedError("Authentication has failed.");
    }
}

module.exports = authMiddleWare;