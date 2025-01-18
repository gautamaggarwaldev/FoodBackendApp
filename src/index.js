const express = require('express');
const cookieParser = require('cookie-parser');

const server = require('./config/serverConfig.js');
const connectDB = require('./config/dbConfig.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const authRouter = require('./routes/authRoute.js');
const { isLoggedIn } = require('./validation/authValidator.js');
const uploader = require('./middlewares/multerMiddleware.js');
const cloudinary = require('./config/cloudinaryConfig.js');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

//Routing middleware
//if your request start from /users then handle it with userRouter
app.use('/users', userRouter); // connects the router to the server
app.use('/carts', cartRouter); //route for fetched the cart
app.use('/auth', authRouter); // for LogIn
app.use('/products', productRouter); // for product creation

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Result from cloudinary ", result);
    await fs.unlink(req.file.path); //delete file from uploads folder
    return res.status(200).json({message: "OK"});
})

app.get('/ping', isLoggedIn ,(req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"})
});

app.listen(server.PORT, async() => {
    await connectDB();
    console.log(`Server is started at ${server.PORT}...`);

}); 

