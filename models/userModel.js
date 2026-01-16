// models folder - userModel.js file
let mongoose=require('mongoose');
  let userSchema=new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
         type:String,
        required:true
      },
      role:{
        type:String,
        required:true,
        default:'normal'
      }
  })

  let User=mongoose.model('user',userSchema);

  module.exports=User;
