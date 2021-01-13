const Conversation = require('../../../models/Conversation');

module.exports = async function (request, response) {
    const {conversationId} = request.params;

    await Conversation.findOne({
        _id: conversationId
    }).exec().then(conversation => {
        return response.status(200).send({
            conversation: conversation
        });
    });
}
