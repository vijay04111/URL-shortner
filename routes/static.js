const express = require('express');
const router = express.Router();
const URL = require('../models/url');

// Home page
router.get('/', async (req, res) => {
  const allUrls = await URL.find({});
  res.render('home', { allUrls });
});




// Redirect
router.get('/:shortId', async (req, res) => {
  const entry = await URL.findOneAndUpdate(
    { shortId: req.params.shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) return res.status(404).send("URL not found");
  res.redirect(entry.redirectURL);
});

module.exports = router;
