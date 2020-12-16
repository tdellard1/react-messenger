const crypto = require('crypto');

module.exports = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256');
    return this.hash === hash;
};
