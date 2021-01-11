const router = require('express').Router();
const Message = require('../../models/Message');
const User = require('../../models/User');

router.post("/", async function (req, res) {
    const existingUser = await User.findOne({email: "cartelkeys@gmail.com"});
    const message = new Message({
        sender: existingUser,
        content: "Hello There",
        conversation: {}
    });

    message.save().then(() => {
        return res.status(201).send({message: "Hello World!"});
    });
});

module.exports = router;
