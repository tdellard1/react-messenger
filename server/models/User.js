const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    hash: String,
    salt: String
});

mongoose.model('User', UserSchema);
