const socketEvents = require('./socket-controller');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

let connection = null;

class Socket {
    constructor() {}

    async authenticate(socket) {
        const {token} = socket.handshake.auth;
        const {id} = jwt.decode(token, "SECRET");

        const user = await User.findOne({_id: id}).exec();
        return {
            isValidUser: !!user,
            id: id
        };
    }

    connect(server) {
        const io = require('socket.io')(server, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET','POST']
            }
        });

        io.on('connection', async (socket) => {
            const {isValidUser, id} = await this.authenticate(socket);
            if (isValidUser) {
                socket.join(id);
                socketEvents.forEach(event => event(socket));
            } else {
                // disconnect socket
            }
        });
    }

    static init(server) {
        if (!connection) {
            connection = new Socket();
            connection.connect(server);
        }
    }

    static getConnection() {
        if (!connection) {
            throw new Error("No active connection.")
        }
        return connection;
    }
}

module.exports = {
    connect: Socket.init,
    connection: Socket.getConnection
};
