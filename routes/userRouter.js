
// routes folder - userRouter.js file

let express=require('express');
const { handleUserSignUp, handleUserLogin } = require('../controllers/userController');
let userRouter=express.Router();

userRouter.post('/',handleUserSignUp)

userRouter.post('/login',handleUserLogin)

module.exports=userRouter;