let express = require('express')
let routes=express.Router()
let User= require('../models/user')
const {v4 : uuidv4} =require('uuid')
const { setUser } = require('../services/auth')

routes.post('/',async(req,res)=>{
   let {username , email , password}=req.body
    await User.create({
        username,
        email,
        password
    })
    return res.redirect('login')

})


routes.post('/login',async(req,res)=>{
  let {email,password} =  req.body
 let user= await User.findOne({
    email,
    password
  })
  if(!user)
  {
    return res.render('login')
}

let sessionId=uuidv4();
setUser(sessionId,user)
res.cookie('uid',sessionId)


  return res.redirect('/')
})

module.exports=routes