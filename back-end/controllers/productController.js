const errors = require("../errors");
const Product = require("../models/productModel");
const {StatusCodes} = require("http-status-codes");

//authorization required for the below functions
const getProductsByUser = async (req, res) => {
    const userId = req.user.userId;
    const userProducts = await Product.find({owner: userId});
    res.status(StatusCodes.OK).json({userProducts, nbOfProducts: userProducts.length})
}

const createProduct = async (req, res) => {

    //TO DO: the image url must be obtained from the uploadController
    const userId = req.user.userId;
    const {name, description, size, gender, image, address} = req.body;
    if(!name || !description || !size || !gender || !image || !address){
        throw new errors.BadRequestError("Some details about the product is missing.");
    }
    const product = {...req.body, owner: userId};
    const createdProduct = await Product.create(product);

    return res.status(StatusCodes.CREATED).json({createdProduct});
}
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    const owner = req.user.userId;
    const deletedProduct = await Product.findByIdAndRemove({_id: productId, owner});
    if(!deletedProduct){
        throw new errors.NotFoundError(`No product with id: ${productId}`);
    }
    return res.status(StatusCodes.OK).json({deletedProduct});
}

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const owner = req.user.userId;
    const {description, address} = req.body;
    if(!description || !address){
        throw new errors.BadRequestError("address and decription is required.")
    }
    const updatedProduct  = await Product.findByIdAndUpdate(
        {_id: productId, owner}, 
        {description, address}, 
        {new: true, runValidators : true}
    );

    if(!updatedProduct){
        throw new errors.NotFoundError(`No product with id: ${productId}`);
    }
    return res.status(StatusCodes.OK).json({updatedProduct})
}

module.exports = {
    getProductsByUser,
    createProduct,
    deleteProduct,
    updateProduct
}