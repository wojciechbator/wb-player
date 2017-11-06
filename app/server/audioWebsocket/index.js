const Socket = require('socket.io');

class AudioWebsocket {
    constructor(server) {
        this.socket = new Socket(server);
        this.socket.on('connection', (socket) => {
            console.log('User connected'); 
            this.socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

module.exports = AudioWebsocket;