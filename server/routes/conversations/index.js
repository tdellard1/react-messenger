const router = require('express').Router();
const createConversation = require('./create-conversation');
const addToConversation = require('./add-to-conversation');
const getAllConversations = require('./get-all-conversations');
const getAllMessages = require('./get-all-messages');
const validateCreateConversation = require('../conversations/create-conversation/validation');

// Creates A New Conversation
// Conversations are started when the first participant sends a message.
router.post("/", validateCreateConversation, createConversation);

//Gets All Conversations For One User
router.get("/:userId", getAllConversations);

// Adds One Message To Existing Conversation
router.post("/:conversationId", addToConversation);

// Get All Messages From A Conversation
router.get("/:conversationId/messages", getAllMessages);

module.exports = router;
