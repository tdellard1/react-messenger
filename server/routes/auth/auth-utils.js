const jwt = require('jsonwebtoken');

module.exports =
    async function getUserFromRequest(request, Model) {
        const token = request.headers.authorization.split(" ")[1];
        const userObject = jwt.decode(token, "SECRET");
        const {id} = userObject;
        return Model.findOne({_id: id}).exec();
    }
