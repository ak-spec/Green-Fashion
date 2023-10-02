const Product = require("../models/productModel");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
    const listedProducts = await Product.find({})
    return res.status(StatusCodes.OK).json({listedProducts})
}

module.exports = {getAllProducts};