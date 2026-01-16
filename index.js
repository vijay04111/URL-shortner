//index.js file
const express = require("express");
const {
  connectToMongoDB
} = require('./connect');
const urlRoute = require('./routes/url')
const userRoute=require('./routes/userRouter')
const URL = require('./models/url')
let ejs=require('ejs')
let path=require('path')
let cookieParser =require('cookie-parser')

const app = express();
const PORT = 8001;
let staticRoute=require('./routes/staticRouter');
const { checkAuth,restrictTo } = require("./middlewares/authMiddleware");

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log(`Mongodb connected successfully.`)).catch((err) => console.log(`mongodb connection error : `, err))

// in which form we pass the data (here in the json form we pass the data)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());


app.set("view engine","ejs")
app.set("views",path.resolve('./views'));

app.use(checkAuth);
app.use('/url',urlRoute)
app.use('/user',userRoute)
app.use('/',staticRoute)

app.listen(PORT, () => console.log(`Server Running At http://localhost:${PORT}`))