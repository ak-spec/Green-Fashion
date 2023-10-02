const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Pls provide a username."],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Pls provide an email."],
        unique: true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Pls provide valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: 6,
    }
});

userSchema.methods.createJWT = function () {
    const token = jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: "2 days"})
    return token;
}

userSchema.methods.comparePasswords = async function(password) {
    const isValidPassowrd = await bcrypt.compare(password, this.password);
    return isValidPassowrd;
}

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 3);

})

module.exports = new mongoose.model("User", userSchema);












