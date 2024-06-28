"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    socket.on('client-ready', () => {
        socket.broadcast.emit('get-canvas-state');
    });
    socket.on('canvas-state', (state) => {
        console.log('received canvas state');
        socket.broadcast.emit('canvas-state-from-server', state);
    });
    socket.on('draw-line', ({ prevPoint, currentPoint, color, size }) => {
        socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color, size });
    });
    socket.on('clear', () => io.emit('clear'));
});
server.listen(3001, () => {
    console.log('✔️ Server listening on port 3001');
});
