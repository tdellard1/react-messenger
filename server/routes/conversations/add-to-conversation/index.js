const User = require('../../../models/User');
const Message = require('../../../models/Message');
const Conversation = require('../../../models/Conversation');
const getUserFromRequest = require('../../auth/auth-utils');

module.exports = async function (request, response) {
    const {conversationId} = request.params;
    const {content} = request.body;
    const messageSender = await getUserFromRequest(request, User);
    const timeStamp = Math.floor(Date.now() / 1000);

    const message = new Message({
        sender: messageSender,
        content: content,
        timeStamp: timeStamp
    });

    await Conversation.findOneAndUpdate({
        "_id": conversationId
    }, {
        $push: {messages: message},
        lastMessage: message
    }, {
        new: true
    }).exec().then(conversation => {
        return response.status(201).send({conversation});
    });
}
