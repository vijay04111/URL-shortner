let express = require('express');
const connectionDB = require('./connection/url');
let app=express()
let urlRoutes=require('./routes/url')
let staticRouter =require('./routes/static')
let path = require('path')

connectionDB('mongodb://127.0.0.1:27017/url-shortner')
  .then(() => console.log("Connect with Mongo DB"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url',urlRoutes );
app.use(staticRouter);



app.listen(2100,()=>{
    console.log("Server is runing on 2100");
    
})