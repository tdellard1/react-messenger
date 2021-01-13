const router = require('express').Router();
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const User = require('../../models/User');

router.get("/:conversationId", async function (req, res) {
    const {conversationId} = req.params;

    const conversation = await Conversation.findOne({_id: conversationId}).exec();

    return res.status(200).send({conversation});
});

module.exports = router;
