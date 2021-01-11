const mongoose = require('mongoose');
const User = require('./User').schema;
const Message = require('./Message').schema;

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [User],
        required: true
    },
    messages: {
        type: [Message]
    }
});

conversationSchema.methods.needNewConversation = () => {
    return true;
}

module.exports = mongoose.model('Conversation', conversationSchema);
