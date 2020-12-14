const mongoose = require('mongoose');
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = function connectToMongoDB() {
    return mongoose.connect(process.env.MONGO_URL + process.env.DATABASE_NAME, connectionOptions)
        .then(() => { console.log('Mongoose connected to Database')});
}
