// routes folder - url.js file

const express = require('express')
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetRedirectUrl
} = require('../controllers/url')
const { restrictTo } = require('../middlewares/authMiddleware');


//Router
const router = express.Router();

router.post(  '/',    restrictTo(['normal','admin']),
  handleGenerateNewShortURL
);

router.get( '/analytics/:shortId',   restrictTo(['admin']),   handleGetAnalytics );

router.get('/:shortId',handleGetRedirectUrl)

module.exports = router;