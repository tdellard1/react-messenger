const mongoose = require('mongoose');
const crypto = require('crypto');
const { setPassword, validPassword, toAuthJSON } = require('./methods/index');
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        require: [true, 'An email is required']
    },
    name: {
        type: String,
        require: [true, 'A name is required']
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = setPassword;
userSchema.methods.validPassword = validPassword;
userSchema.methods.toAuthJSON = toAuthJSON;

module.exports = mongoose.model('User', userSchema);
