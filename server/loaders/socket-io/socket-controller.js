const messageSent = (socket) => {
    socket.on('send-message', (conversation) => {
        socket.broadcast.to(conversation._id).emit('update-conversation', conversation);
    });
};

const joinConversationRooms = (socket) => {
    socket.on('join-rooms', (conversationIds) => {
       socket.join(conversationIds);
    });
};

const reloadConversations = (socket) => {
    socket.on('reload-conversations', (id) => {
        socket.to(id).emit('update-conversations');
    })
}

module.exports = [
    messageSent,
    reloadConversations,
    joinConversationRooms
]
