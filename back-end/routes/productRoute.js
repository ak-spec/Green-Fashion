const express = require("express");
const router = express.Router();
const { 
    getProductsByUser, 
    createProduct, 
    deleteProduct , 
    updateProduct

} = require("../controllers/productController");
const uploadProductImage = require("../controllers/productUploadController");


router.route("/").get(getProductsByUser).post(createProduct)
router.route("/:productId").delete(deleteProduct).patch(updateProduct)
router.route("/upload").post(uploadProductImage);

module.exports = router;






