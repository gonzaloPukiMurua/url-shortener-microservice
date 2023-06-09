const mongoose = require('mongoose');
const urlSchema = {
    original_url : String,
    short_url : String
};

module.exports = mongoose.model('urlModel', urlSchema);