const crypto = require('crypto');

module.exports = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256');
}
