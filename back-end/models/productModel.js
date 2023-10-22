const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values:[
                "Formals Tops",
                "Formals Bottoms",
                "Casuals Tops",
                "Casuals Bottoms",
                "Denims",
                "Traditional Wear",
                "Children's Wear",
                "Accessories",
                "Dresses",
                "General"
            ],
            message: "{VALUE} is not supported."
        }
    },
    description: {
        type: String,
        required: [true, "Pls provide description of the item you are listing.eg: jeans or tops"],
    },
    size: {
        type: String,
        required: [true, "Password is required."],
        enum: {
            values: ["XS", "S", "M", "L", "XL", "XXL"],
             message: "{VALUE} is not supported."
            },
    },
    gender: {
        type: String,
        enum: {
            values: ["M", "F", "Unisex"],
            message: "{VALUE} is not supported"
        },
        required: [true, "Pls provide gender."]
    },
    image: {
        type: String,
        required: [true, "Pls upload the url of the image of the clothing item"],
    },
    address: {
        type: String,
        required: [true, "Pls include the place of collection."],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Pls provide an owner"]
    }
}, {timestamps: true});


module.exports = new mongoose.model("Product", productSchema);