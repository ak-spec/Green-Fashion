const { StatusCodes } = require("http-status-codes");
const errors = require("../errors");
const User = require("../models/userModel");

const register = async (req, res) => {
    const user = await User.create({...req.body});
    return res.status(StatusCodes.CREATED).json({user});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new errors.BadRequestError("Pls provide email or password.");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new errors.UnauthenticatedError("Invalid credentials!");
    }
    isPasswordValid = await user.comparePasswords(password);
    if(!isPasswordValid){
        throw new errors.UnauthenticatedError("Invalid credentials!");
    }
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({LoggedInUser: {username: user.username}, token});
}


module.exports = {
    register,
    login
}