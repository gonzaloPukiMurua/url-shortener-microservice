const mongoose = require('mongoose');
const urlSchema = {
    originalURL : String,
    shortURL : String
};

module.exports = mongoose.model('urlModer', urlSchema);