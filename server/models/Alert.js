const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    mediaUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alert', alertSchema);