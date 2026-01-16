//models folder url.js file
const mongoose = require('mongoose');

//Schema

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timestamps: {
      type: Number
    }
  }],
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
}, {
  timestamps: true
})


const URL = mongoose.model('url', urlSchema)

module.exports = URL;