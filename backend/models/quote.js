const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const qouteSchema = new Schema ({

quote: {
    type: String,
    required: true
},
author: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Quote', qouteSchema);
