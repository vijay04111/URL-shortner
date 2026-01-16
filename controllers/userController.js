//controllers folder - userController.js file

const User = require("../models/userModel");
const {v4 :uuidv4} =require('uuid')
const {setUser,getUser}=require('../service/auth')
async function handleUserSignUp(req,res)
{
    let {name,email,password}=req.body;
    await User.create(
      {
        name,
        email,
        password
      }
    )
    return res.redirect('/')

}

async function handleUserLogin(req,res)
{
const{email,password}=req.body;
let user=await User.findOne({
  email,
  password
}
)
if(!user)
{
  return res.render('login',{error:"User Not Found"})
}


const token=setUser(user);
 res.cookie("token",token);
//return res.json({token})

return res.redirect('/')
}




module.exports={
  handleUserSignUp,
  handleUserLogin
}