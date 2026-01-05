const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const shortid = require('shortid')

router.post('/', async (req, res) => {
  const body = req.body;

   let genrateID= shortid.generate()
  await URL.create({
    shortId:genrateID,
    redirectURL:body.redirectURL,
    visitHistory: []
  });
  res.redirect('/');
});


router.delete('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  await URL.findOneAndDelete({ shortId });
  return res.json({ msg: "Data deleted" });
});


module.exports = router;
