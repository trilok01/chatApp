const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('New user Connected...');

    socket.on('disconnect', () => {
        console.log('A user Disconnected...');
    });

    socket.on('userMsg', (data) => {
        io.emit('msgForAll', data);
    });

    
});

server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});