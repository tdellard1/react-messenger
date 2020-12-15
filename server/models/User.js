const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        require: [true, "can't be blank"]
    },
    name: {
        type: String,
        require: [true, "can't be blank"]
    },
    hash: String,
    salt: String
});

userSchema.pre('save', function () {

})

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256');
};
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256');
    return this.hash === hash;
};
userSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp:exp.getTime() / 1000,
    }, 'SECRET');
};
userSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        name: this.name,
        token: this.generateJWT()
    }
}

// mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', userSchema);
