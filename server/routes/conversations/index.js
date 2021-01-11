const router = require('express').Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

router.post("/", async function (request, response) {
    const sender = await getUserFromRequest(request, User);
    const {recipientIds, content} = request.body;
    const timeStamp = Math.floor(Date.now() / 1000);

    const participants = await User.find({
        _id: {$in: [sender._id, ...recipientIds]}
    }).exec();

    const message = new Message({
        sender, content, timeStamp
    });

    const conversation = await Conversation.findOne({
        "participants": {$all: participants}
    }).exec();

    if (conversation && conversation._id) {
        await Conversation.findOneAndUpdate({
            "_id": conversation._id
        }, {$push: {messages: message}})
            .exec((err, res) => {
                return response.status(201).send({res: res});
            });
    } else {
        const newConversion = new Conversation({
            participants: participants, messages: [message]
        });

        newConversion.save().then(conversation => {
            return response.status(201).send({conversation});
        });
    }
});

router.get("/:userId", async function (request, response) {
    const {userId} = request.params;
    const user = await User.findOne({_id: userId}).exec();

    const allConversations = await Conversation.find({
        participants: {$in: user}
    }).exec();

    return response.status(200).send({
        conversations: allConversations,
        size: allConversations.length
    });
});

router.post("/:conversationId", async function (request, response) {
    const {conversationId} = request.params;
    const {recipientIds, content} = request.body;
    const sender = await getUserFromRequest(request, User);
    const timeStamp = Math.floor(Date.now() / 1000);

    const message = new Message({
        sender, content, timeStamp
    });


    if (conversationId) {
        await Conversation.findOneAndUpdate({
            "_id": conversationId
        }, {$push: {messages: message}}).exec();
    } else {
        await Conversation.findOneAndUpdate({
            "participants._id": {$in: [sender._id, ...recipientIds]}
        }, {$push: {messages: message}}).exec();




        const recipients = await User.find({
            _id: {$in: recipientIds}
        }).exec();

        const participants = [sender, ...recipients];
        const newConversion = new Conversation({
            participants: participants, message: message
        });

        newConversion.save().then(conversion => {
            return response.status(201).send({status: "finished"});
        })
    }

    return response.status(201).send({status: "finished"});


});

async function getUserFromRequest(request, Model) {
    const token = request.headers.authorization.split(" ")[1];
    const userObject = jwt.decode(token, "SECRET");
    const {id} = userObject;
    return Model.findOne({_id: id}).exec();

}

module.exports = router;
