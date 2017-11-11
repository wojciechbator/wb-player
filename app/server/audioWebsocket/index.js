const Socket = require('socket.io');
const process = require('process');

class AudioWebsocket {
    constructor(server) {
        this.timeout = null;
        this.socket = new Socket(server);
        this.socket.on('connection', (socket) => {
            console.log('User connected');
            this.emitUsage(this.socket);
            this.socket.on('disconnect', () => {
                console.log('user disconnected');
                clearTimeout(this.timeout);
            });
        });
    }

    emitUsage(socket) {
        socket.emit('cpu', process.cpuUsage());
        socket.emit('memory', process.memoryUsage());
        this.timeout = setTimeout(() => this.emitUsage(this.socket), 3000);
    }
}

module.exports = AudioWebsocket;