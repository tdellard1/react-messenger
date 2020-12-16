const User = require('../../models/User');

const sendError = (response, statusCode, errorMessage) => {
    response.status(statusCode).send({error: errorMessage})
}

module.exports = {
    registerUser: async function (req, res) {
        const {username, name, email, password} = req.body;

        // validate request
        if (!name || !email || !password) {
            return sendError(res, 400, 'Missing Required Field')
        }

        // validate existing User
        const existingUser = await User.findOne({email});
        if (existingUser !== null) {
            return sendError(res, 409, 'Account for email already exists');
        }
        
        const newUser = new User({ username, name, email });

        newUser.setPassword(password);
        newUser.save().then(() => {
            return res.status(201).send({user: newUser.toAuthJSON()});
        });
    },
}
