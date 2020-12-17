const crypto = require('crypto');

module.exports = (password, salt, userHash) => {
    const verifyHash = crypto
        .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
        .toString('hex');
    return userHash === verifyHash;
};
