const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const errors = require("../errors");

const uploadProductImage = async(req, res) => {
    if(!req.files){
        throw new errors.BadRequestError("No file uploaded.");
    }
    if(!(req.files.image.mimetype.startsWith("image"))){
        throw new errors.BadRequestError("Pls upload an image file.");
    }

    const imgPath = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(imgPath, {
        use_filename: true, 
        folder:"file-upload-imgFolder",
    });

    fs.unlinkSync(imgPath);
    return res.status(StatusCodes.OK).json({ image: {src : result.secure_url} });
}

module.exports = uploadProductImage;










