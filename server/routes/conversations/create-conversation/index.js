const User = require('../../../models/User');
const Message = require('../../../models/Message');
const Conversation = require('../../../models/Conversation');
const getUserFromRequest = require('../../auth/auth-utils');

module.exports = async function (request, response) {
    const messageSender = await getUserFromRequest(request, User);
    const {recipientId, content} = request.body;
    const timeStamp = Math.floor(Date.now() / 1000);

    const participants = await User.find({
        _id: {$in: [messageSender._id, recipientId]}
    }).exec();

    const message = new Message({
        sender: messageSender,
        content, timeStamp
    });

    const conversation = new Conversation({
        participants: participants,
        lastMessage: message,
        messages: [message]
    });

    await conversation.save().then(conversation => {
        return response.status(200).send({conversation});
    });
}
