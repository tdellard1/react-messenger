const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const unauthorized = (response, statusCode = 401, errorMessage = 'You are unauthorized to access this resource') => {
    return response.status(statusCode).send({error: errorMessage})
}

module.exports = async function(request, response, next) {
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.split(" ")[0] === "Bearer") {
        token = request.headers.authorization.split(" ")[1]
    } else {
        return unauthorized(response);
    }

    const userObject = jwt.decode(token, "SECRET");

    if (userObject && userObject.id && userObject.exp) {
        const {id, exp} = userObject;
        const user = await User.findOne({_id: id}).exec();
        if (user) {
            const now = new Date().getTime() / 1000;

            if (exp - now > 0) {
                next();
            } else {
                return unauthorized(response, 440, 'Session expired');
            }
        } else {
            return unauthorized(response);
        }
    } else {
        return unauthorized(response);
    }
}
