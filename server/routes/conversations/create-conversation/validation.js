const getUserFromRequest = require('../../auth/auth-utils');
const User = require('../../../models/User');

module.exports = async function validateCreateConversation(request, response, next) {
    const { id } = await getUserFromRequest(request, User);
    const {recipientId} = request.body;

    if (id === recipientId) {
        response.status(400).send({error: "Must send message to a different user."});
    } else {
        next();
    }
}
