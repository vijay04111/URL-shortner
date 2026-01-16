//routes folder - staticRouter.js file
const express = require('express');
const URL = require('../models/url');
const { restrictTo, checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/admin/urls',checkAuth,restrictTo(['admin']),async(req,res)=>{
  let allUrls=await URL.find({});
  return res.render('home',{urls:allUrls})
})


router.get('/',checkAuth, restrictTo(['normal', 'admin']), async (req, res) => {
    let urls;
    if (req.user.role === 'admin') {
      urls = await URL.find({});
    } else {
      urls = await URL.find({ createdBy: req.user._id });
    }
    return res.render('home', { urls });
  }
);



router.get('/signup', (req,res)=>{
  res.render('signup')
})
router.get('/login', (req,res)=>{
  res.render('login')
})

module.exports=router;