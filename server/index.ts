import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	socket.on('init', () => {
		console.log('connect');
		socket.broadcast.emit('get-canvas-state');
	});

	socket.on('send-content', (args) => {
		console.log('received content', args);
	});

	socket.on('update-draw', ({ points }) => {
		socket.broadcast.emit('update-canvas', { points });
	});
});

httpServer.listen(3001, () => {
	console.log('Listening on port 3001');
});
