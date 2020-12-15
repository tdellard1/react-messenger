const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URL + process.env.DATABASE_NAME;
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

async function connect() {
    try {
        await mongoose.connect(MONGO_URI, connectionOptions)
            .then(() => console.log('Mongoose connected successfully!'));
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;
