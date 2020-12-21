const User = require('../../models/User');
const { validationResult } = require('express-validator');

module.exports = {
    registerUser: async function (req, res) {
        console.log('request: ', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({error: errors.array({onlyFirstError: true})});
        }

        const {username, name, email, password} = req.body;

        // validate existing User
        const existingUser = await User.findOne({email});
        if (existingUser !== null) {
            return res.status(409).send({error: 'Account for email already exists'});
        }

        const user = new User({ username, name, email });

        user.setPassword(password);
        user.save().then(() => {
            return res.status(201).send({user: user.toAuthJSON()});
        });
    },
    loginUser: async function(req, res) {
        const {email, password} = req.body;

        User.findOne({email})
            .then(user => {
                if (user && user.validPassword(password, user.salt, user.hash)) {
                    return res.status(200).send({user: user.toAuthJSON()});
                } else {
                    return res.status(400).send({error: 'Issue logging in'});
                }
            });

    }
}
