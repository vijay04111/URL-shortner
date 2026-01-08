const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const shortid = require('shortid');
const { loginRestricaton } = require('../middleware/authMiddleware');

router.post('/', loginRestricaton, async (req, res) => {
  const body = req.body;

  let genrateID = shortid.generate();

  await URL.create({
    shortId: genrateID,
    redirectURL: body.redirectURL,
    visitHistory: [],
    createdBy: req.user._id   // 👈 YE LINE ADD KAR
  });

  res.redirect('/');
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



router.delete('/:shortId', loginRestricaton, async (req, res) => {
  const result = await URL.findOneAndDelete({
    shortId: req.params.shortId,
    createdBy: req.user._id
  });

  if (!result) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  res.json({ msg: "Deleted" });
});


module.exports = router;
