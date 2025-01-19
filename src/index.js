const express = require('express');
const cookieParser = require('cookie-parser');

const server = require('./config/serverConfig.js');
const connectDB = require('./config/dbConfig.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const authRouter = require('./routes/authRoute.js');
const productRouter = require('./routes/productRoute.js');
const orderRouter = require('./routes/orderRoute.js');

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
app.use('/orders', orderRouter); // for orders



app.get('/ping' ,(req, res) => {
    return res.json({message: "pong"})
});

app.listen(server.PORT, async() => {
    await connectDB();
    console.log(`Server is started at ${server.PORT}...`);

}); 

