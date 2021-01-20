const socketEvents = require('./socket-controller');

let connection = null;

class Socket {
    constructor() {
    }

    connect(server) {
        const io = require('socket.io')(server, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET','POST']
            }
        });

        io.on('connection', async (socket) => {
            socketEvents.forEach(event => event(socket));
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
