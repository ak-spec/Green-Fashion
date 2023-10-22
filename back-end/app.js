const express = require("express");
require("express-async-errors");
const connectDB = require("./db/connect")
const fileUpload = require("express-fileupload");
require("dotenv").config();
cors = require("cors");

//setting up cloudinary config(API to host user product imgs on cloud)
//May need to implement this in the fonrt-end
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET
});

//importing all my middlewares
const errorHandlerMiddleWare = require("./middleware/errorHandler");
const notFoundMiddleWare = require("./middleware/notFound");
const authMiddleWare = require("./middleware/auth");

//importing all my routers
const authRouter = require("./routes/authRoute");
const productsRouter = require("./routes/productRoute");
const listingRouter = require("./routes/listingRoute");

const app = express();
app.use(cors());

// filupload is middleware for handling file uploads.Uploaded
// files can be accesses using req.files.(name given in the name attribute of input tag)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp_images",
    limits: {fileSize: 1024 * 1024},
}))
//parses data passed by client as json
app.use(express.json());


//my routes
app.get("/", (req, res) => {
    res.send("<h1>Welcome to paradise...</h1>");
})
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authMiddleWare, productsRouter);
app.use("/api/v1/listings", listingRouter);

//middlewares
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);


const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`DB connected and Server is listening on port: ${port}`);
        });
    }catch(err){
        console.log(err)
    }

}

start();


