const User = require('../../../models/User');
const Conversation = require('../../../models/Conversation');

module.exports = async function (request, response) {
    const {userId} = request.params;
    const user = await User.findOne({_id: userId}).exec();

    const allConversations = await Conversation.find({
        participants: {$in: user}
    }).select("participants lastMessage").exec();

    return response.status(200).send({
        conversations: allConversations,
        size: allConversations.length
    });
}
