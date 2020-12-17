const setPassword = require('./set-password');
const generateJWT = require('./generate-jwt');
const validPassword = require('./validate-password');

module.exports = {
    setPassword,
    validPassword,
    toAuthJSON: function() {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
            token: generateJWT(this)
        }
    }
};
