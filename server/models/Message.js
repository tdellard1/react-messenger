const mongoose = require('mongoose');
const User = require('./User').schema;

const messageSchema = new mongoose.Schema({
    sender: {
        type: User,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
