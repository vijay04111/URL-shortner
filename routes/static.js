const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { loginRestricaton } = require('../middleware/authMiddleware');

// Home page (Dashboard)
router.get('/', loginRestricaton,async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  const allUrls = await URL.find({
    createdBy: req.user._id   // 👈 USER-WISE FILTER
  });

  res.render('home', { allUrls });
});

router.get('/form', (req, res) => {
  return res.render('signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
