const express = require('express');
const router = express.Router();
const URL = require('../models/url');

// Home page
router.get('/', async (req, res) => {
  const allUrls = await URL.find({});
  res.render('home', { allUrls });
});

router.get('/form',(req,res)=>{
  return res.render('signup')
})


router.get('/login',(req,res)=>{
  return res.render('login')
})






module.exports = router;
