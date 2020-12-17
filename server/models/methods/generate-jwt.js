const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: user._id,
        username: user.username,
        exp: exp.getTime() / 1000,
    }, 'SECRET');
};
