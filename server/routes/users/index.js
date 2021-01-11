const router = require('express').Router();
const User = require('../../models/User');

router.get("/", async function (req, res) {
    const users = await User.find({});
    res.status(200).send({users})
});

module.exports = router;
